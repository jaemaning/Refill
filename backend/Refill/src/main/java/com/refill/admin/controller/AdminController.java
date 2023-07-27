package com.refill.admin.controller;

import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.admin.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/hospitals")
    public ResponseEntity<List<WaitingHospitalResponse>> showWaitingHospitalList() {


        return ResponseEntity.ok().body(null);
    }
}
