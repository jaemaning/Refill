package com.refill.member.controller;

import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.member.dto.request.MemberPasswordUpdateRequest;
import com.refill.member.dto.response.MemberInfoResponse;
import com.refill.member.service.MemberService;
import com.refill.security.util.LoginInfo;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/mypage")
    public ResponseEntity<MemberInfoResponse> getMemberInfo(@AuthenticationPrincipal LoginInfo loginInfo) {

        log.debug("'{}' member request mypage", loginInfo.loginId());
        MemberInfoResponse memberInfoResponse = memberService.getMemberByLoginId(loginInfo.loginId());

        return ResponseEntity.ok().body(memberInfoResponse);
    }

    @PutMapping("/mypage")
    public ResponseEntity<String> modifyMemberInfo(@AuthenticationPrincipal LoginInfo loginInfo, @RequestPart("memberInfoUpdateRequest") @Valid final MemberInfoUpdateRequest memberInfoUpdateRequest, @RequestPart(value = "profileImg", required = false) MultipartFile profileImg){

        log.debug("'{}' member request information update", loginInfo.loginId());
        memberService.modifyMember(loginInfo.loginId(), memberInfoUpdateRequest, profileImg);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/mypage/password")
    public ResponseEntity<String> modifyMemberPassword(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody MemberPasswordUpdateRequest memberPasswordUpdateRequest) {

        log.debug("'{}' member request password update", loginInfo.loginId());
        memberService.modifyPassword(loginInfo.loginId(), memberPasswordUpdateRequest);

        return ResponseEntity.noContent().build();
    }


}
