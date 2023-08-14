package com.refill.member.service;

import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.member.dto.request.MemberPasswordUpdateRequest;
import com.refill.member.dto.response.MemberInfoResponse;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.repository.MemberRepository;
import com.refill.security.util.JwtProvider;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final AmazonS3Service amazonS3Service;

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Value("${jwt.token.secret}")
    private String secretKey;

    @Transactional
    public Long save(Member member) {
        return memberRepository.save(member)
                               .getId();
    }

    @Transactional(readOnly = true)
    public boolean existsByLoginId(String loginId) {
        return memberRepository.existsByLoginId(loginId);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Member findByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId)
                               .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                               .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Member findByLoginIdAndEmail(String loginId, String email) {

        return memberRepository.findByLoginIdAndEmail(loginId, email)
                               .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse getMemberByLoginId(String loginId) {

        Member member = findByLoginId(loginId);

        return new MemberInfoResponse(member);
    }
    @Transactional
    public void modifyMember(String loginId, MemberInfoUpdateRequest memberInfoUpdateRequest, MultipartFile profileImg) {

        Member member = findByLoginId(loginId);
        member.update(memberInfoUpdateRequest);

        // 기존에 등록 된 사진이 없고 새로 등록 시킬 때
        if(Objects.isNull(member.getProfileImg()) && Objects.nonNull(profileImg)) {
            String profileAddress = amazonS3Service.uploadFile(profileImg);
            member.updateFileAddress(profileAddress);
            return;
        }
        // 기존에 등록 된 사진이 있고 수정할 때
        if(Objects.nonNull(member.getProfileImg()) && Objects.nonNull(profileImg)) {
            String profileAddress = member.getAddress();
            amazonS3Service.deleteFile(profileAddress);

            String newProfileAddress = amazonS3Service.uploadFile(profileImg);
            member.updateFileAddress(newProfileAddress);
        }

    }

    @Transactional
    public void modifyPassword(String loginId, MemberPasswordUpdateRequest memberPasswordUpdateRequest) {

        Member member = findByLoginId(loginId);
        if(!passwordEncoder.matches(memberPasswordUpdateRequest.oldPassword(), member.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD);
        }

        member.encodePassword(passwordEncoder.encode(memberPasswordUpdateRequest.newPassword()));

    }

    @Transactional(readOnly = true)
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId)
                               .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    public void delete(Long id) {
        Member member = findById(id);
        memberRepository.delete(member);
    }
}
