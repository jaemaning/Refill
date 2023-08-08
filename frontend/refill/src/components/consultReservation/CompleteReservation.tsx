import React from "react"
import CheckIcon from '@mui/icons-material/Check';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CloseIcon from '@mui/icons-material/Close';

const CompleteReservation: React.FC = () => {
    return (
        <div className="h-96 w-52">
            <div>
                <p><CheckIcon /> 정상적으로 예약이 접수되었습니다. <CloseIcon /> </p>
            </div>
            <div>
                <LocalHospitalIcon />
                <div>신청자 000</div>
                <div>상담 일시 2023.07.18(화) PM 5:30</div>
                <div>상담 병원 젬마 모발 이식 센터</div>
                <div>담당 의사 김싸피 교수님</div>
                <hr />
                <ul>
                    <li>상담 일정에 불참시향후 상담 예약이 어려울 수 있습니다.</li>
                    <li>부득이하게 해당 상담이 어려울 경우 즉시 해당 병원에 직접 전화하여 취소하시기 바랍니다.</li>
                    <li>상담 완료 후 방문 진료가 필요할 경우 해당 병원과의 직접 연락을 통해 방문 일정을 예약 잡으시기 바랍니다.</li>
                </ul>
                <button>확인</button>
            </div>

        </div>
    )
}
export default CompleteReservation