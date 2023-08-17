package com.refill.hospital.service;

import static com.refill.hospital.util.DistanceCalculator.calculateDistance;

import com.refill.doctor.dto.request.DoctorJoinRequest;
import com.refill.doctor.dto.request.DoctorUpdateRequest;
import com.refill.doctor.dto.response.DoctorResponse;
import com.refill.doctor.entity.Doctor;
import com.refill.doctor.entity.EducationBackground;
import com.refill.doctor.entity.MajorArea;
import com.refill.doctor.repository.EducationBackgroundRepository;
import com.refill.doctor.repository.MajorAreaRepository;
import com.refill.doctor.service.DoctorService;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.hospital.dto.request.HospitalInfoUpdateRequest;
import com.refill.hospital.dto.request.HospitalLocationRequest;
import com.refill.hospital.dto.response.HospitalDetailResponse;
import com.refill.hospital.dto.response.HospitalResponse;
import com.refill.hospital.dto.response.HospitalSearchByLocationResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.exception.HospitalException;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import com.refill.review.dto.response.ReviewResponse;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Slf4j
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final AmazonS3Service amazonS3Service;
    private final DoctorService doctorService;
    private final EducationBackgroundRepository educationBackgroundRepository;
    private final MajorAreaRepository majorAreaRepository;


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
    public List<HospitalSearchByLocationResponse> searchByLocation(
        HospitalLocationRequest request) {
        List<Hospital> nearByHospitals = findNearByHospitals(request);
        return mapHospitalsToResponses(nearByHospitals, request);
    }

    private List<Hospital> findNearByHospitals(HospitalLocationRequest request) {
        return hospitalRepository.findNearByHospitals(request.sLat(), request.sLng(),
            request.eLat(), request.eLng());
    }

    private List<HospitalSearchByLocationResponse> mapHospitalsToResponses(List<Hospital> hospitals,
        HospitalLocationRequest request) {
        return hospitals.stream()
                        .map(hospital -> createResponse(hospital, request))
                        .collect(Collectors.toList());
    }

    private HospitalSearchByLocationResponse createResponse(Hospital hospital,
        HospitalLocationRequest request) {
        double distance = calculateDistance(request.curLat(), request.curLng(),
            hospital.getLatitude(), hospital.getLongitude());
        return new HospitalSearchByLocationResponse(hospital, distance);
    }


    @Transactional
    public List<HospitalResponse> searchByKeyword(String hospitalName, String address) {

        if (StringUtils.hasText(hospitalName) && StringUtils.hasText(address)) {
            return hospitalRepository.findByNameContainingAndAddressContaining(hospitalName,
                                         address)
                                     .stream()
                                     .map(HospitalResponse::new)
                                     .collect(Collectors.toList());
        } else if (StringUtils.hasText(hospitalName)) {
            return hospitalRepository.findByNameContaining(hospitalName)
                                     .stream()
                                     .map(HospitalResponse::new)
                                     .collect(Collectors.toList());
        } else if (StringUtils.hasText(address)) {
            return hospitalRepository.findByAddressContaining(address)
                                     .stream()
                                     .map(HospitalResponse::new)
                                     .collect(Collectors.toList());
        } else {
            throw new HospitalException(ErrorCode.INVALID_LOCATION_REQUEST);
        }
    }

    //@Cacheable(value = "hospitalInfo", key = "#id")
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
        log.error("{}", hospital.getId());
        log.error("{}", hospitalId);
        if (!hospital.getId()
                     .equals(hospitalId)) {
            throw new MemberException(ErrorCode.ACCESS_DENIED);
        }
        return hospital;
    }

    @CacheEvict(value = "UserCacheStore", key = "#loginId")
    @Transactional
    public void modifyHospitalInfo(Long hospitalId, String loginId,
        HospitalInfoUpdateRequest hospitalInfoUpdateRequest, MultipartFile profileImg,
        MultipartFile bannerImg, MultipartFile registrationImg) {

        Hospital hospital = checkAccessHospital(loginId, hospitalId);
        hospital.update(hospitalInfoUpdateRequest);

        processImage(profileImg, hospital.getHospitalProfileImg(), hospital::updateProfileAddress);
        processImage(bannerImg, hospital.getHospitalBannerImg(), hospital::updateBannerAddress);
        processImage(registrationImg, hospital.getRegistrationImg(),
            hospital::updateRegistrationImg);
    }

    private void processImage(MultipartFile newImage, String existingImageAddress, Consumer<String> addressUpdater) {
        if (Objects.nonNull(newImage)) {
            deleteExistingFile(existingImageAddress);
            uploadFileAndUpdateAddress(newImage, addressUpdater);
        }
    }

    private void deleteExistingFile(String fileAddress) {
        if (Objects.nonNull(fileAddress)) {
            amazonS3Service.deleteFile(fileAddress);
        }
    }

    private void uploadFileAndUpdateAddress(MultipartFile file, Consumer<String> addressUpdater) {
        if (Objects.nonNull(file) && !file.isEmpty()) {
            String address = amazonS3Service.uploadFile(file);
            addressUpdater.accept(address);
        }
    }

    @Transactional
    public void deleteDoctorById(String loginId, Long hospitalId, Long doctorId) {
        checkAccessHospital(loginId, hospitalId);
        doctorService.deleteById(doctorId);
    }

    @Transactional
    public void modifyHospitalDoctor(String loginId, Long hospitalId, Long doctorId,
        DoctorUpdateRequest doctorUpdateRequest, MultipartFile profileImg) {
        checkAccessHospital(loginId, hospitalId);
        Doctor doctor = doctorService.findById(doctorId);
        doctor.update(doctorUpdateRequest);
        processImage(profileImg, doctor.getProfileImg(), doctor::updateProfileAddress);
    }

    @Transactional
    public void registHospitalDoctor(String loginId, Long hospitalId,
        DoctorJoinRequest doctorJoinRequest, MultipartFile profileImg, MultipartFile licenseImg) {
        Hospital hospital = checkAccessHospital(loginId, hospitalId);

        Doctor doctor = Doctor.from(doctorJoinRequest, hospital);
        uploadFileAndUpdateAddress(profileImg, doctor::registProfileAddress);
        uploadFileAndUpdateAddress(licenseImg, doctor::registLicenseAddress);

        doctorService.save(doctor);
        registEducationBackground(doctorJoinRequest, doctor);
        registMajor(doctorJoinRequest, doctor);
    }

    private void registEducationBackground(DoctorJoinRequest doctorJoinRequest, Doctor doctor) {
        doctorJoinRequest.educationBackgrounds()
                         .stream()
                         .map(content -> new EducationBackground(doctor, content))
                         .forEach(educationBackgroundRepository::save);
    }

    private void registMajor(DoctorJoinRequest doctorJoinRequest, Doctor doctor) {
        doctorJoinRequest.majorAreas()
                         .stream()
                         .map(major -> new MajorArea(doctor, major))
                         .forEach(majorAreaRepository::save);
    }


    @Transactional(readOnly = true)
    public List<HospitalResponse> findAllHospitals() {
        return this.findAll()
                   .stream()
                   .map(hospital -> new HospitalResponse(hospital))
                   .collect(Collectors.toList());
    }

    @Cacheable(value = "hospitalInfo", key = "#hospitalId")
    @Transactional(readOnly = true)
    public Hospital findByIdUsingCache(Long hospitalId) {
        return findById(hospitalId);
    }

    public List<DoctorResponse> getDoctorByHospital(Hospital hospital) {

        return hospital.getDoctors()
                       .stream()
                       .map(DoctorResponse::new)
                       .collect(Collectors.toList());
    }

    public List<ReviewResponse> getReviewByHospital(Hospital hospital) {

        return hospital.getReviews()
                       .stream()
                       .map(ReviewResponse::new)
                       .collect(Collectors.toList());
    }
}
