package com.refill.consulting.service;

import static com.refill.global.entity.Role.ROLE_MEMBER;

import com.refill.consulting.dto.request.ConsultingCloseRequest;
import com.refill.consulting.dto.response.ConnectionTokenResponse;
import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.entity.Consulting;
import com.refill.consulting.exception.ConsultingException;
import com.refill.consulting.repository.ConsultingRepository;
import com.refill.doctor.entity.Doctor;
import com.refill.global.exception.ErrorCode;
import com.refill.member.entity.Member;
import com.refill.report.service.ReportService;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.repository.ReservationRepository;
import com.refill.security.util.LoginInfo;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
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
        log.info("################## {} ########## {} ############", OPENVIDU_URL, OPENVIDU_SECRET);
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        log.info("##################### {} #################", openvidu);
    }

    private final ReservationRepository reservationRepository;
    private final ConsultingRepository consultingRepository;
    private final ReportService reportService;

    private final int BEFORE_CONSULTING_TIME = 15;


    @Scheduled(cron = "0 */3 8-23 * * ?")
    public void createSession() throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("################## {} ########## {} ############", OPENVIDU_URL, OPENVIDU_SECRET);
        LocalDateTime now = LocalDateTime.now();
        // 조건문 추가

        log.info("'{}' == time", now);
        List<Reservation> reservationList = reservationRepository.findReservationReady(now.minusMinutes(50),now.plusMinutes(50));
        log.info("{} makes consulting", reservationList);
        log.info("{} => reservationList" , reservationList);
        log.info("{} => reservationList.size()" , reservationList.size());


        // 돌아가면서 세션 생성 및 토큰 저장 .
        for (Reservation reservation : reservationList) {
            log.info("iter come in");
            Member member = reservation.getMember();
            Doctor doctor = reservation.getDoctor();

            log.info("'{}',  '{}' made", member, doctor);

            // 세션 생성
            Map<String, Object> params = new HashMap<>();
            String customSessionId = "session" + reservation.getId().toString();
            params.put("customSessionId", customSessionId);

            log.info("{} => customSessionId", customSessionId);

//            SessionProperties properties = SessionProperties.fromJson(params).build();

            SessionProperties properties = new SessionProperties.Builder().build();

            log.info("==============================");
            log.info("before CreateSession");
            Session session = openvidu.createSession(properties);
//            Session session = openvidu.createSession();
            log.info("==============================");
            log.info(" getSessionId");
            String sessionId = session.getSessionId();
            log.info("after CreateSession");
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

    @Transactional(readOnly = true)
    public ConnectionTokenResponse getConnectionToken(Long reservationId, LoginInfo loginInfo){
        Consulting consulting = consultingRepository.findConsultingByReservationId(reservationId);

        Long consultingId = 0L;
        String sessionId = "";
        String token = "";
        String screenShareToken = "";

        if(consulting == null) {
            return new ConnectionTokenResponse(consultingId, sessionId, token, screenShareToken);
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
            return new ConnectionTokenResponse(consultingId, sessionId, token, screenShareToken);
        }
    }

    @Transactional
    public void leaveSession(ConsultingCloseRequest consultingCloseRequest, LoginInfo loginInfo) {

        if(loginInfo.role().equals(ROLE_MEMBER)) {
            throw new ConsultingException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        Consulting consulting = consultingRepository.findConsultingBySessionId(consultingCloseRequest.sessionId());

        if (consulting == null) {
            throw new ConsultingException(ErrorCode.SESSION_FAIL);
        }

        consulting.closeSession();

        consulting.updateConsultingInfo(consultingCloseRequest.consultingDetailInfo());
    }

    @Transactional(readOnly = true)
    public List<ConsultingListResponse> getConsultingList(long memberId) {
        List<Consulting> consultingList = consultingRepository.findConsultingsByMember(memberId);

        List<ConsultingListResponse> consultingListResponseList = new ArrayList<>();

        for (Consulting consulting : consultingList) {
            consultingListResponseList.add(new ConsultingListResponse(consulting));
        }

        return consultingListResponseList;
    }

    @Transactional(readOnly = true)
    public ConsultingDetailResponse getConsultingDetailInfo(Long consultingId) {

        Consulting consulting = consultingRepository.findConsultingById(consultingId);

        return new ConsultingDetailResponse(consulting);
    }

    public Consulting findById(Long consultingId){
        return consultingRepository.findById(consultingId)
                                   .orElseThrow(() -> new ConsultingException(ErrorCode.SESSION_FAIL));
    }

    @Transactional
    public void reportConsulting(Long consultingId, String content, LoginInfo loginInfo) {
        findById(consultingId);
        reportService.reportConsulting(consultingId, content, loginInfo);
    }

}
