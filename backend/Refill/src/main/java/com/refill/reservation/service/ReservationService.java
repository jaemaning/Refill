package com.refill.reservation.service;

import com.refill.member.entity.Member;
import com.refill.member.service.MemberService;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.reservation.ReservationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MemberService memberService;

    @Transactional(readOnly = true)
    public List<ReservationListResponse> findAllByMember(String loginId) {

        Member member = memberService.findByLoginId(loginId);

        return reservationRepository.findAllByMember(member)
                                    .stream()
                                    .map(ReservationListResponse::new)
                                    .toList();
    }
}
