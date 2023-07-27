package com.refill.admin.controller;

import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.admin.service.AdminService;
import com.refill.global.entity.Message;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

        log.debug("admin request waitingHospitalList");
        List<WaitingHospitalResponse> waitingHospitalList = adminService.findHospitalsByWaiting();

        return ResponseEntity.ok().body(waitingHospitalList);
    }

    @GetMapping("/hospitals/accept/{id}")
    public ResponseEntity<String> acceptHospital(@PathVariable("id") Long hospitalId) {

        adminService.acceptHospital(hospitalId);

        return ResponseEntity.ok().body(Message.ACCEPT_HOSPITAL.getMessage());
    }

    @GetMapping("/hospitals/rejcet/{id}")
    public ResponseEntity<String> rejectHospital(@PathVariable("id") Long hospitalId) {

        adminService.rejectHospital(hospitalId);

        return ResponseEntity.ok().body(Message.REJECT_HOSPITAL.getMessage());
    }
}
