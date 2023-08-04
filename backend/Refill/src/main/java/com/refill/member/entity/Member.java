package com.refill.member.entity;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.reservation.entity.Reservation;
import com.refill.review.entity.Review;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@SuperBuilder
@DynamicUpdate
@Entity
public class Member extends UserInfo {

    @Column(nullable = false)
    private LocalDate birthDay;

    @Column
    private String profileImg;

    @Column(nullable = false)
    private String nickname;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<AiDiagnosis> aiDiagnosisList;

    @OneToMany(mappedBy = "member")
    List<Review> reviews;

    @OneToMany(mappedBy = "member")
    private List<Reservation> reservationList;

    public static Member from(MemberJoinRequest memberJoinRequest) {
        return Member.builder()
                     .loginId(memberJoinRequest.loginId())
                     .loginPassword(memberJoinRequest.loginPassword())
                     .nickname(memberJoinRequest.nickname())
                     .address(memberJoinRequest.address())
                     .tel(memberJoinRequest.tel())
                     .birthDay(memberJoinRequest.birthDay())
                     .email(memberJoinRequest.email())
                     .name(memberJoinRequest.name())
                     .role(Role.ROLE_MEMBER)
                     .aiDiagnosisList(new ArrayList<>())
                     .reviews(new ArrayList<>())
                     .reservationList(new ArrayList<>())
                     .build();

    }

    public void updateFileAddress(String address) {
        this.profileImg = address;
    }

    public void addReservation(Reservation reservation) {
        this.reservationList.add(reservation);
    }

    public void addAiDiagnosis(AiDiagnosis aiDiagnosis) {
        this.getAiDiagnosisList()
            .add(aiDiagnosis);
    }

    public void update(MemberInfoUpdateRequest memberInfoUpdateRequest) {
        super.updateMember(memberInfoUpdateRequest);
        this.birthDay = memberInfoUpdateRequest.birthDay();
        this.nickname = memberInfoUpdateRequest.nickname();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority(getRole().name()));
    }

    @Override
    public String getPassword() {
        return getLoginPassword();
    }

    @Override
    public String getUsername() {
        return getLoginId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


}
