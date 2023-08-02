package com.refill.hospital.service;

import static com.refill.hospital.util.DistanceCalculator.calculateDistance;

import com.refill.doctor.dto.request.DoctorUpdateRequest;
import com.refill.doctor.entity.Doctor;
import com.refill.doctor.service.DoctorService;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.hospital.dto.request.HospitalInfoUpdateRequest;
import com.refill.hospital.dto.response.HospitalDetailResponse;
import com.refill.hospital.dto.response.HospitalResponse;
import com.refill.hospital.dto.response.HospitalSearchByLocationResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final AmazonS3Service amazonS3Service;
    private final DoctorService doctorService;

    @Transactional(readOnly = true)
    public boolean existsByLoginId(String loginId) {
        return hospitalRepository.existsByLoginId(loginId);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return hospitalRepository.existsByEmail(email);
    }

    @Transactional
    public Long save(Hospital hospital) {
        return hospitalRepository.save(hospital)
                                 .getId();
    }

    @Transactional(readOnly = true)
    public Hospital findByLoginId(String loginId) {
        return hospitalRepository.findByLoginId(loginId)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Hospital findByEmail(String email) {
        return hospitalRepository.findByEmail(email)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Hospital findByLoginIdAndEmail(String loginId, String email) {
        return hospitalRepository.findByLoginIdAndEmail(loginId, email)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Hospital> findAll() {
        return hospitalRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Hospital findById(Long id) {
        return hospitalRepository.findById(id)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));

    }

    @Transactional
    public void delete(Long id) {
        Hospital hospital = findById(id);
        hospitalRepository.delete(hospital);
    }

    @Transactional
    public List<HospitalSearchByLocationResponse> searchByLocation(BigDecimal latitude,
        BigDecimal longitude, Integer zoomLevel) {
        Double radius = zoomLevelToRadius(zoomLevel);
        return hospitalRepository.findNearByHospitals(latitude, longitude, radius)
                                 .stream()
                                 .map(nearByHospital -> new HospitalSearchByLocationResponse(
                                     nearByHospital, calculateDistance(latitude, longitude,
                                     nearByHospital.getLatitude(), nearByHospital.getLongitude())))
                                 .collect(Collectors.toList());
    }

    @Transactional
    public List<HospitalResponse> searchByKeyword(String hospitalName, String address) {
        List<Hospital> containingHospital = hospitalRepository.findByNameContainingOrAddressContaining(
            hospitalName, address);
        return containingHospital.stream()
                                 .map(hospital -> new HospitalResponse(hospital))
                                 .collect(Collectors.toList());
    }

    @Transactional
    public HospitalDetailResponse getHospitalDetail(Long id) {
        return new HospitalDetailResponse(findById(id));
    }

    private Double zoomLevelToRadius(Integer zoomLevel) {
        /* todo: zoomLevel을 적절하게 Radius로 바꾸는 로직 */
        return 5.0;
    }
    private Hospital checkAccessHospital(String loginId, Long hospitalId) {
        Hospital hospital = findByLoginId(loginId);
        if (!hospital.getId()
                     .equals(hospitalId)) {
            throw new MemberException(ErrorCode.ACCESSE_DENIED);
        }
        return hospital;
    }

    @Transactional
    public void modifyHospitalInfo(Long hospitalId, String loginId,
        HospitalInfoUpdateRequest hospitalInfoUpdateRequest, MultipartFile profileImg,
        MultipartFile bannerImg, MultipartFile registrationImg) {

        Hospital hospital = checkAccessHospital(loginId, hospitalId);
        hospital.update(hospitalInfoUpdateRequest);
        if (profileImg != null) {
            String profileAddress = amazonS3Service.uploadFile(profileImg);
            hospital.updateProfileAddress(profileAddress);
        }
        if (bannerImg != null) {
            String bannerAddress = amazonS3Service.uploadFile(bannerImg);
            hospital.updateBannerAddress(bannerAddress);
        }
        if (registrationImg != null) {
            String registrationAddress = amazonS3Service.uploadFile(registrationImg);
            hospital.updateRegistrationImg(registrationAddress);
        }
    }


    @Transactional
    public void deleteDoctorById(String loginId, Long hospitalId, Long doctorId) {
        Hospital hospital = checkAccessHospital(loginId, hospitalId);
        doctorService.deleteById(doctorId);
    }

    @Transactional
    public void modifyHospitalDoctor(String loginId, Long hospitalId, Long doctorId,
        DoctorUpdateRequest doctorUpdateRequest, MultipartFile profileImg) {
        Hospital hospital = checkAccessHospital(loginId, hospitalId);
        Doctor doctor = doctorService.findById(doctorId);
        doctor.update(doctorUpdateRequest);
        if(profileImg != null){
            String profileAddress = amazonS3Service.uploadFile(profileImg);
            doctor.updateProfileAddress(profileAddress);
        }

    }
}
