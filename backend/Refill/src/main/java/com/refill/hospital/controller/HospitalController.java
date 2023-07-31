package com.refill.hospital.controller;

import com.refill.global.entity.UserInfo;
import com.refill.hospital.dto.response.HospitalResponse;
import com.refill.hospital.dto.response.HospitalSearchByLocationResponse;
import com.refill.hospital.service.HospitalService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        @AuthenticationPrincipal UserInfo userInfo,
        @RequestParam BigDecimal latitude,
        @RequestParam BigDecimal longitude,
        @RequestParam Integer zoomLevel) {
        List<HospitalSearchByLocationResponse> searchHospitalResponses = hospitalService.searchByLocation(
            latitude, longitude, zoomLevel);
        log.info("searchHospitalResponses: {}", searchHospitalResponses);
        return ResponseEntity.ok()
                             .body(searchHospitalResponses);
    }

    /* 병원명, 주소 등 키워드로 검색 */
    @GetMapping("/search/keyword")
    public ResponseEntity<List<HospitalResponse>> searchByKeyword(
        @RequestParam String hospitalName,
        @RequestParam String address) {
        List<HospitalResponse> hospitalResponses = hospitalService.searchByKeyword(hospitalName, address);
        return ResponseEntity.ok().body(hospitalResponses);
    }


}
