package com.refill.review.controller;

import com.refill.review.dto.request.ReviewCreateRequest;
import com.refill.review.dto.request.ReviewModifyRequest;
import com.refill.review.dto.response.ReviewResponse;
import com.refill.review.service.ReviewService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    /* 리뷰 전체 조회 */
    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviews() {
        log.debug("여기까지들어왔음");
        List<ReviewResponse> reviews = reviewService.getReviews();
        return ResponseEntity.ok()
                             .body(reviews);
    }

    /* 리뷰 단건 조회 */
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long reviewId) {
        log.debug("여기까지들어왔음");
        ReviewResponse reviewResponse = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok()
                             .body(reviewResponse);
    }

    /* 리뷰 생성 */
    @PostMapping
    public ResponseEntity<String> createReview(
        @RequestBody ReviewCreateRequest reviewCreateRequest) {
        log.debug("여기까지들어왔음");
        reviewService.createReview(reviewCreateRequest);
        return ResponseEntity.ok().build();
    }

    /* 리뷰 수정 - 작성자만 가능 */
    @PutMapping("/{reviewId}")
    public ResponseEntity<String> modifyReview(
        @PathVariable Long reviewId,
        @RequestBody ReviewModifyRequest reviewModifyRequest,
        @AuthenticationPrincipal LoginInfo loginInfo)
    {
        log.debug("여기까지들어왔음");
        reviewService.modifyReview(reviewId, reviewModifyRequest, loginInfo.loginId());
        return ResponseEntity.noContent()
                             .build();
    }

    /* 리뷰 삭제 - 작성자와 관리자 가능 */
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReviewById(@PathVariable Long reviewId, @AuthenticationPrincipal LoginInfo loginInfo){
        log.debug("여기까지들어왔음");
        reviewService.deleteReviewById(reviewId, loginInfo);
        return ResponseEntity.noContent()
                             .build();
    }
}
