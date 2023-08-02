package com.refill.aidiagnosis.service;

import com.refill.aidiagnosis.repository.AiDiagnosisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AiDiagnosisService {

    private final AiDiagnosisRepository aiDiagnosisRepository;
}
