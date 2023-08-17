package com.refill.consulting.service;

import static com.refill.global.entity.Role.ROLE_ADMIN;
import static com.refill.global.entity.Role.ROLE_MEMBER;

import com.refill.consulting.dto.request.ConsultingCloseRequest;
import com.refill.consulting.dto.response.ConnectionTokenResponse;
import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.entity.Consulting;
import com.refill.consulting.exception.ConsultingException;
import com.refill.consulting.repository.ConsultingRepository;
import com.refill.doctor.entity.Doctor;
import com.refill.doctor.repository.DoctorRepository;
import com.refill.doctor.service.DoctorService;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.repository.MemberRepository;
import com.refill.report.entity.Report;
import com.refill.report.service.ReportService;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.exception.ReservationException;
import com.refill.reservation.repository.ReservationRepository;
import com.refill.review.entity.Review;
import com.refill.review.exception.ReviewException;
import com.refill.security.util.LoginInfo;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@EnableScheduling
@Slf4j
public class ConsultingService {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    private final ReservationRepository reservationRepository;
    private final ConsultingRepository consultingRepository;
    private final ReportService reportService;
    private final MemberRepository memberRepository;

    private final int BEFORE_CONSULTING_TIME = 15;


    /* 상담 세션 생성 */
//    @Scheduled(cron = "0 59 8-23 * * ?")
    public void createSession() throws OpenViduJavaClientException, OpenViduHttpException {

        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime now = LocalDateTime.now().plusMinutes(BEFORE_CONSULTING_TIME);
        // 조건문 추가

        List<Reservation> reservationList = reservationRepository.findReservationReady(now.minusMinutes(10),now.plusMinutes(10));
        log.info("'{}' == time", now);
        log.info("{} => reservationList.size()" , reservationList.size());


        // 돌아가면서 세션 생성 및 토큰 저장 .
        for (Reservation reservation : reservationList) {
            Member member = reservation.getMember();
            Doctor doctor = reservation.getDoctor();

            // 세션 생성
            SessionProperties properties = new SessionProperties.Builder().build();

            Session session = openvidu.createSession(properties);
            String sessionId = session.getSessionId();
            log.info("Sessoin Created");
            log.info("==============================");

            // connection 생성
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data")
                .build();

            String doctorToken = session.createConnection(connectionProperties).getToken();
            String screenShareToken = session.createConnection(connectionProperties).getToken();
            String memberToken = session.createConnection(connectionProperties).getToken();

            Consulting consulting = Consulting.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .sessionId(sessionId)
                                              .memberToken(memberToken)
                                              .doctorToken(doctorToken)
                                              .screenShareToken(screenShareToken)
                                              .reservation(reservation)
                                              .build();

            consultingRepository.save(consulting);
        }
    }

    /* 상담 세션 정보 반환 */
    @Transactional(readOnly = true)
    public ConnectionTokenResponse getConnectionToken(Long reservationId, LoginInfo loginInfo){
        Consulting consulting = consultingRepository.findConsultingByReservationId(reservationId);

        Long consultingId = 0L;
        Long hospitalId = 0L;
        Long doctorId = 0L;
        Long memberId = 0L;
        String sessionId = "";
        String token = "";
        String screenShareToken = "";
        String hospitalName = "";

        if(consulting == null) {
            return new ConnectionTokenResponse(consultingId, hospitalId, doctorId, memberId, sessionId, token, screenShareToken,hospitalName);
        }
        else {
            sessionId = consulting.getSessionId();
            consultingId = consulting.getId();
            if(loginInfo.role() == ROLE_MEMBER){
                token = consulting.getMemberToken();
            }
            else {
                token = consulting.getDoctorToken();
                screenShareToken = consulting.getScreenShareToken();
            }
            hospitalName = consulting.getDoctor().getHospital().getName();
            hospitalId = consulting.getDoctor().getHospital().getId();
            doctorId = consulting.getDoctor().getId();
            memberId = consulting.getMember().getId();
            return new ConnectionTokenResponse(consultingId, hospitalId, doctorId, memberId, sessionId, token, screenShareToken,hospitalName);
        }
    }

    /* 상담 나가기 */
    @Transactional
    public void leaveSession(ConsultingCloseRequest consultingCloseRequest, LoginInfo loginInfo) {

        log.info("{} = consultingCloseRequest.sessionId", consultingCloseRequest.sessionId());
        Consulting consulting = consultingRepository.findConsultingBySessionId(consultingCloseRequest.sessionId());
        if (consulting == null) {
            throw new ConsultingException(ErrorCode.SESSION_FAIL);
        }

        /* 세션 아이디, 토큰 비우기 */
        consulting.closeSession();
        /*  상담 소견 저장" */
        consulting.updateConsultingInfo(consultingCloseRequest.consultingDetailInfo());
    }

    /* 상담 내역 반환 */
    @Transactional(readOnly = true)
    public List<ConsultingListResponse> getConsultingList(Long memberId) {

        log.info("###### {} ######" , memberId);

        List<Consulting> consultingList = consultingRepository.findConsultingsByMember(memberId);

        List<ConsultingListResponse> consultingListResponseList = new ArrayList<>();

        for (Consulting consulting : consultingList) {
            consultingListResponseList.add(new ConsultingListResponse(consulting));
        }

        return consultingListResponseList;
    }

    /* 상담 상세 정보 반환 */
    @Transactional(readOnly = true)
    public ConsultingDetailResponse getConsultingDetailInfo(Long consultingId) {

        Consulting consulting = consultingRepository.findConsultingById(consultingId);

        return new ConsultingDetailResponse(consulting);
    }

    /* 상담 신고 하기 */
    @Transactional
    public void reportConsulting(Long consultingId, String content, LoginInfo loginInfo) {
        findById(consultingId);
        reportService.reportConsulting(consultingId, content, loginInfo);
    }

    /* 상단 신고 반환 */
    public List<Report> getConsultingReportList(LoginInfo loginInfo) {

        if(loginInfo.role() != ROLE_ADMIN){
            throw new ConsultingException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
        return reportService.getReportConsultings();
    }

    public Consulting findById(Long consultingId){
        return consultingRepository.findById(consultingId)
                                   .orElseThrow(() -> new ConsultingException(ErrorCode.SESSION_FAIL));
    }

    /* 상담 세션 예약시 생성 */
    public void createSessionNow(String memberLoginId, Reservation reservation) {
        SessionProperties properties = new SessionProperties.Builder().build();

        Session session = null;
        try {
            session = openvidu.createSession(properties);

            String sessionId = session.getSessionId();

            ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data")
                .build();

            String doctorToken = session.createConnection(connectionProperties).getToken();
            String screenShareToken = session.createConnection(connectionProperties).getToken();
            String memberToken = session.createConnection(connectionProperties).getToken();

            Member member = memberRepository.findByLoginId(memberLoginId).orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
            Doctor doctor = reservation.getDoctor();

            Consulting consulting = Consulting.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .sessionId(sessionId)
                                              .memberToken(memberToken)
                                              .doctorToken(doctorToken)
                                              .screenShareToken(screenShareToken)
                                              .reservation(reservation)
                                              .build();
            consultingRepository.save(consulting);
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }
}