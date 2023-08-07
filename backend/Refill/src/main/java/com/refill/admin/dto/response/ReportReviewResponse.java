package com.refill.admin.dto.response;

import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import com.refill.report.entity.Report;
import com.refill.review.dto.response.ReviewResponse;
import com.refill.review.entity.Review;
import javax.validation.constraints.NotNull;

public record ReportReviewResponse (
    @NotNull Long reportId,
    @NotNull ReviewResponse reviewResponse,
    @NotNull Role reporterType, // 신고한 사람의 유형: MEMBER, HOSPITAL (의사는 실제 로그인하는 회원이 아님)
    @NotNull Long reporterId,
    @NotNull String reporterName,
    @NotNull String content
    ){
    public ReportReviewResponse(Report report, UserInfo userInfo, Review review) {
        this(
            report.getId(),
            new ReviewResponse(review),
            report.getReporterRole(),
            report.getReporterId(),
            userInfo.getName(),
            report.getContent()
        );
    }
}
