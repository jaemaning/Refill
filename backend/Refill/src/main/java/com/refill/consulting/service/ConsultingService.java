package com.refill.consulting.service;

import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.entity.Consulting;
import com.refill.consulting.repository.ConsultingRepository;
import com.refill.doctor.entity.Doctor;
import com.refill.member.entity.Member;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.repository.ReservationRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    private final int BEFORE_CONSULTING_TIME = 15;

//    @Scheduled(cron = "0 15,45 8-18 * * ?")
    public void createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        LocalDateTime now = LocalDateTime.now().plusMinutes(BEFORE_CONSULTING_TIME);
        // 조건문 추가
        List<Reservation> reservationList = reservationRepository.findAll();

        // 돌아가면서 세션 생성 및 토큰 저장
        for (Reservation reservation : reservationList) {
            Member member = reservation.getMember();
            Doctor doctor = reservation.getDoctor();
            Long reservationId = reservation.getId();

            Session session = openvidu.createSession();
            String sessionId = session.getSessionId();
            String doctorToken = session.createConnection().getToken();
            String memberToken = session.createConnection().getToken();

            Consulting consulting = Consulting.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .sessionId(sessionId)
                                              .memberToken(memberToken)
                                              .doctorToken(doctorToken)
                                              .reservation(reservation)
                                              .build();

            consultingRepository.save(consulting);
        }
    }

    @Transactional(readOnly = true)
    public List<String> getDoctorConnectionToken(Long doctorId, Long reservationId) {
        Consulting consulting = consultingRepository.findConsultingByDoctorAndReservation(doctorId, reservationId);

        List<String> connectionInfo = new ArrayList<>();
        connectionInfo.add(consulting.getDoctorToken());
        connectionInfo.add(consulting.getSessionId());

        return connectionInfo; //  DTO로 만들 다시 만들 것
    }

    @Transactional(readOnly = true)
    public List<String> getMemberConnectionToken(Long memberId, Long reservationId) {
        Consulting consulting = consultingRepository.findConsultingByMemberAndReservation(memberId,
            reservationId);

        List<String> connectionInfo = new ArrayList<>();
        connectionInfo.add(consulting.getMemberToken());
        connectionInfo.add(consulting.getSessionId());

        return connectionInfo; //  DTO로 만들 다시 만들 것
    }

    @Transactional
    public void leaveSession(String sessionId, String consultingDetailInfo) {
        Consulting consulting = consultingRepository.findConsultingBySessionId(sessionId);

        consulting.updateConsultingInfo(consultingDetailInfo);
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

        log.info("===================");
        return new ConsultingDetailResponse(consulting);
    }
}
