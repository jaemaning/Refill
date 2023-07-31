package com.refill.hospital.controller;

import com.refill.global.entity.UserInfo;
import com.refill.hospital.dto.response.SearchHospitalResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

        return ResponseEntity.ok().body("hello");
    }

    /* 현 지도에서 검색, 위도/경도 */
    @GetMapping("/search")
    public ResponseEntity<List<SearchHospitalResponse>> searchByLocation(
        @AuthenticationPrincipal UserInfo userInfo,
        @RequestParam BigDecimal latitude,
        @RequestParam BigDecimal longitude,
        @RequestParam Integer zoomLevel){
        List<SearchHospitalResponse> searchHospitalResponses =  hospitalService.searchByLocation(latitude, longitude, zoomLevel);
        log.info("searchHospitalResponses: {}", searchHospitalResponses);
        return ResponseEntity.ok().body(searchHospitalResponses);
    }

    /* 병원명, 주소 등 키워드로 검색 */
    @GetMapping("/search/{}")
    public ResponseEntity<?> searchByKeyword() {
        return null;
    }

    /* 병원 id로 조회 */
    @GetMapping("/{hospitalId}")
    public ResponseEntity<?> findByHospitalId(@PathVariable Long hospitalId) {
        Hospital hospitalResponse = hospitalService.findById(hospitalId);
        return null;
    }



}
