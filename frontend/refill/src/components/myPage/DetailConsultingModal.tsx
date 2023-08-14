import React from "react";
import "styles/Modal.css"

/*
public record ConsultingDetailResponse(
    // 진료과, 담당의사, 일자
//    String content,
    String doctorName,
    LocalDateTime startDateTime,

    // member 주소, 이름, 생년월일, 성별?, 나이
    String memberAddress,
    String memberName,
    LocalDate birthDay,
    // 성별, 나이 추가

    // 상담 소견
    String detailConsultingInfo,

    // 병원 이름, 주소, 전화번호
    String hospitalName,
    String hospitalAddress,
    String tel
    // 전화번호
)
*/
type detailConsulting = {
    content: string
    doctorName: string
    startDateTime: string
    memberAddress: string
    memberName: string
    birthDay: string
    // 상담소견
    detailConsultingInfo: string
    hospitalName: string
    hospitalAddress: string
    tel: string
}
interface DetailConsultingModalProps {
    consDetail: detailConsulting | null
}

const DetailConsultingModal: React.FC<DetailConsultingModalProps> = ({consDetail}) => {
    return (
        <div className="modal-overlay">
            <div>

            </div>
        </div>
    )
}
export default DetailConsultingModal