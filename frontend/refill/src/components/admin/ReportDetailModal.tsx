import React from 'react';
import { ReportReviewResponse } from './adminTypes';

interface ReportDetailModalProps {
  report: ReportReviewResponse;
  onClose: () => void;
}

const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg z-10">
        <button className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-xl rounded-full w-8 h-8 flex items-center justify-center" onClick={onClose}>×</button>
        
        {/* 모달의 내용: 리뷰 신고 상세 정보 */}
        <h2 className="text-xl font-bold">신고 ID: {report.reportId}</h2>
        <p>Reporter Type: {report.reporterType}</p>
        <p>Reporter ID: {report.reporterId}</p>
        <p>Reporter Name: {report.reporterName}</p>
        <p>Content: {report.content}</p>
      </div>
    </div>
  );
};

export default ReportDetailModal;
