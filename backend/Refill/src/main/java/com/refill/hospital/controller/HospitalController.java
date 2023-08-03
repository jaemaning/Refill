package com.refill.hospital.controller;

import com.refill.doctor.dto.request.DoctorJoinRequest;
import com.refill.doctor.dto.request.DoctorUpdateRequest;
import com.refill.hospital.dto.request.HospitalInfoUpdateRequest;
import com.refill.hospital.dto.response.HospitalDetailResponse;
import com.refill.hospital.dto.response.HospitalResponse;
import com.refill.hospital.dto.response.HospitalSearchByLocationResponse;
import com.refill.hospital.service.HospitalService;
import com.refill.security.util.LoginInfo;
import java.math.BigDecimal;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api/v1/hospital")
@RestController
@Slf4j
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping("/")
    public ResponseEntity<String> sayHello() {

        return ResponseEntity.ok()
                             .body("hello");
    }

    /* 현 지도에서 검색, 위도/경도 */
    @GetMapping("/search/location")
    public ResponseEntity<List<HospitalSearchByLocationResponse>> searchByLocation(
        @RequestParam(name = "lat") BigDecimal latitude,
        @RequestParam(name = "lng") BigDecimal longitude,
        @RequestParam(name = "z") Integer zoomLevel)
    {
        log.debug("{}, {}, {}", latitude, longitude, zoomLevel);
        List<HospitalSearchByLocationResponse> searchHospitalResponses = hospitalService.searchByLocation(
            latitude, longitude, zoomLevel);
        log.debug("searchHospitalResponses: {}", searchHospitalResponses);
        return ResponseEntity.ok()
                             .body(searchHospitalResponses);
    }

    /* 병원명, 주소 등 키워드로 검색 */
    @GetMapping("/search/keyword")
    public ResponseEntity<List<HospitalResponse>> searchByKeyword(
        @RequestParam(name = "name", required = false) String hospitalName,
        @RequestParam(name = "addr", required = false) String address)
    {
        log.debug("hospitalName: {}, address: {} ", hospitalName, address);
        List<HospitalResponse> hospitalResponses = hospitalService.searchByKeyword(hospitalName,
            address);
        return ResponseEntity.ok()
                             .body(hospitalResponses);
    }

    /* 병원 상세 조회 */
    @GetMapping("/{hospitalId}")
    public ResponseEntity<HospitalDetailResponse> getHospitalDetail(@PathVariable Long hospitalId)
    {
        log.debug("hospitalId: {}", hospitalId);
        HospitalDetailResponse hospitalDetailResponse = hospitalService.getHospitalDetail(
            hospitalId);
        return ResponseEntity.ok()
                             .body(hospitalDetailResponse);
    }

    /* 병원 정보 수정 */
    @PutMapping("/{hospitalId}")
    public ResponseEntity<String> modifyHospitalInfo(
        @AuthenticationPrincipal LoginInfo loginInfo,
        @PathVariable Long hospitalId,
        @RequestPart("hospitalInfoUpdateRequest") @Valid final HospitalInfoUpdateRequest hospitalInfoUpdateRequest,
        @RequestPart(required = false) MultipartFile profileImg,
        @RequestPart(required = false) MultipartFile bannerImg,
        @RequestPart @Valid final MultipartFile registrationImg)
    {
        log.debug("loginId: {}, ",loginInfo.loginId(), "hospitalId :{}, ", hospitalId, "hospitalInfoRequest: {}", hospitalInfoUpdateRequest);
        hospitalService.modifyHospitalInfo(hospitalId, loginInfo.loginId(), hospitalInfoUpdateRequest, profileImg,
            bannerImg, registrationImg);
        return ResponseEntity.ok()
                             .build();
    }
    
    /* 의사 등록 */
    @PostMapping("/{hospitalId}/doctor")
    public ResponseEntity<String> registerHospitalDoctor(
        @AuthenticationPrincipal LoginInfo loginInfo,
        @PathVariable Long hospitalId,
        @RequestPart("doctorJoinRequest") @Valid final DoctorJoinRequest doctorJoinRequest,
        @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
        @RequestPart(value = "licenseImg") MultipartFile licenseImg
    ){
        log.debug("doctorJoinRequest: {}", doctorJoinRequest);
        hospitalService.registHospitalDoctor(loginInfo.loginId(), hospitalId, doctorJoinRequest, profileImg, licenseImg);
        return ResponseEntity.ok().build();
    }
    

    /* 의사 정보 수정 */
    @PutMapping("/{hospitalId}/doctor/{doctorId}")
    public ResponseEntity<String> modifyHospitalDoctor(
        @AuthenticationPrincipal LoginInfo loginInfo,
        @PathVariable Long hospitalId,
        @PathVariable Long doctorId,
        @RequestPart DoctorUpdateRequest doctorUpdateRequest,
        @RequestPart(name = "profileImg") MultipartFile profileImg
    ) {
        log.debug("doctorUpdateRequest: {}", doctorUpdateRequest);
        hospitalService.modifyHospitalDoctor(loginInfo.loginId(), hospitalId, doctorId, doctorUpdateRequest, profileImg);
        return ResponseEntity.ok()
                             .build();
    }

    /* 의사 정보 삭제 */
    @DeleteMapping("/{hospitalId}/doctor/{doctorId}")
    public ResponseEntity<String> deleteHospitalDoctor(
        @AuthenticationPrincipal LoginInfo loginInfo,
        @PathVariable Long hospitalId,
        @PathVariable Long doctorId)
    {
        log.debug("hospital: {}, doctorId: {}", hospitalId, doctorId);
        hospitalService.deleteDoctorById(loginInfo.loginId(), hospitalId, doctorId);
        return ResponseEntity.ok()
                             .build();
    }
}
