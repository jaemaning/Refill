import React from "react";

// AiDiagnosisListResponse
type aiDiagnosisData = {
    id: number;
    diagnosisDate: string;
    hairLossScore: number;
    certainty: number;
    diagnosisImage: string;
  };

interface AiDiaListProps {
    aiListItem: aiDiagnosisData
}

const AiDiaListItem: React.FC<AiDiaListProps> = ({aiListItem}) => {
    return (
        <div className="ai-list-item w-fit">
            {aiListItem.id}
        </div>
    )
}
export default AiDiaListItem