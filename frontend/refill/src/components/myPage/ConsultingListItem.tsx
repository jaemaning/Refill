import React from "react";

type consultData = {
    consultingId: number;
    hospitalName: string;
    doctorName: string;
    startDateTime: string;
  };

interface ConsultingProps {
    consListItem: consultData
}

const ConsultingListItem: React.FC<ConsultingProps> = ({consListItem}) => {
    return (
        <div className="ai-list-item flex">

        </div>
    )
}
export default ConsultingListItem