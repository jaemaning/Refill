package com.refill.review.service;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.service.DoctorService;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.report.service.ReportService;
import com.refill.review.dto.request.ReviewCreateRequest;
import com.refill.review.dto.request.ReviewModifyRequest;
import com.refill.review.dto.response.ReviewResponse;
import com.refill.review.entity.Review;
import com.refill.review.exception.ReviewException;
import com.refill.review.repository.ReviewRepository;
import com.refill.security.util.LoginInfo;
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
    private final ReportService reportService;

    @Transactional(readOnly = true)
    public Review findById(Long id){
        return reviewRepository.findById(id)
                        .orElseThrow(()-> new ReviewException(ErrorCode.REVIEW_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviews() {
        List<ReviewResponse> repositoryAll = reviewRepository.findAll()
                                                             .stream()
                                                             .map(ReviewResponse::new)
                                                             .collect(Collectors.toList());
        return repositoryAll;
    }

    @Transactional(readOnly = true)
    public ReviewResponse getReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(()->new ReviewException(ErrorCode.ACCESS_DENIED));
        ReviewResponse reviewResponse = new ReviewResponse(review);
        return reviewResponse;
    }

    @Transactional
    public void createReview(ReviewCreateRequest reviewCreateRequest) {
        Hospital hospital = hospitalService.findById(reviewCreateRequest.hospitalId());
        Doctor doctor = doctorService.findById(reviewCreateRequest.doctorId());
        Member member = memberService.findById(reviewCreateRequest.memberId());
        Integer score = reviewCreateRequest.score();
        String content = reviewCreateRequest.content();
        String category = reviewCreateRequest.category();
        Review review = Review.from(hospital, doctor, member, score, content, category);
        reviewRepository.save(review);
    }

    @Transactional
    public void modifyReview(Long reviewId, ReviewModifyRequest reviewModifyRequest, String loginId) {
        //검증
        Review review = verifyMemberAccess(loginId, reviewId);
        review.update(reviewModifyRequest);
    }
    @Transactional
    public void deleteReviewById(Long reviewId, LoginInfo loginInfo) {
        Review review = verifyAdminOrMemberAccess(reviewId, loginInfo);
        reviewRepository.delete(review);
    }

    private Review verifyMemberAccess(String loginId, Long reviewId) {
        Review review = findById(reviewId);
        validateAccess(loginId, review);
        return review;
    }

    private Review verifyAdminOrMemberAccess(Long reviewId, LoginInfo loginInfo) {
        Review review = findById(reviewId);
        if (!loginInfo.role().equals(Role.ROLE_ADMIN)) {
            validateAccess(loginInfo.loginId(), review);
        }
        return review;
    }

    private void validateAccess(String loginId, Review review) {
        if (!loginId.equals(review.getMember().getLoginId())) {
            throw new MemberException(ErrorCode.ACCESS_DENIED);
        }
    }

    @Transactional
    public void reportReview(Long reviewId, String content, LoginInfo loginInfo) {
        reportService.reportReview(reviewId, content, loginInfo);
    }
}
