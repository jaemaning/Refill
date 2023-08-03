package com.refill.review.service;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.service.DoctorService;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.entity.Member;
import com.refill.member.service.MemberService;
import com.refill.review.dto.request.ReviewCreateRequest;
import com.refill.review.dto.request.ReviewModifyRequest;
import com.refill.review.dto.response.ReviewResponse;
import com.refill.review.entity.Review;
import com.refill.review.exception.ReviewException;
import com.refill.review.repository.ReviewRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final HospitalService hospitalService;
    private final DoctorService doctorService;
    private final MemberService memberService;

    @Transactional
    public List<ReviewResponse> getReviews() {
        List<ReviewResponse> repositoryAll = reviewRepository.findAll()
                                                             .stream()
                                                             .map(review -> new ReviewResponse(review))
                                                             .collect(Collectors.toList());
        return repositoryAll;
    }

    @Transactional
    public ReviewResponse getReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(()->new ReviewException(ErrorCode.INVALID_REVIEW_ID));
        ReviewResponse reviewResponse = new ReviewResponse(review);
        return reviewResponse;
    }

    @Transactional
    public void createReview(ReviewCreateRequest reviewCreateRequest) {
        Hospital hospital = hospitalService.findById(reviewCreateRequest.hospitalId());
        Doctor doctor = doctorService.findById(reviewCreateRequest.doctorId());
        Member member = memberService.findById(reviewCreateRequest.memberId());
        Review review = Review.from(member, doctor, hospital);


        Review review = Review.from(reviewCreateRequest);
    }

    @Transactional
    public void modifyReview(Long reviewId, ReviewModifyRequest reviewModifyRequest, String loginId) {

    }

    @Transactional
    public void deleteReviewById(Long reviewId, Role role) {

    }
}
