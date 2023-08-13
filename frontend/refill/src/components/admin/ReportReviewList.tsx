import * as React from "react";
import axios from "axios";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReportReviewResponse } from "./adminTypes";
import ReportDetailModal from "./ReportDetailModal";

const ReportReviewList: React.FC = () => {
  const token: string = useSelector((state: RootState) => state.login.token);
  const islogin: boolean = useSelector(
    (state: RootState) => state.login.islogin,
  );
  const navigate = useNavigate();

  const [reports, setReports] = React.useState<ReportReviewResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedReport, setSelectedReport] =
    React.useState<ReportReviewResponse | null>(null);

  const handleOpenModal = (report: ReportReviewResponse) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const fetchReports = async () => {
    try {
      if (islogin) {
        const response = await axios.get("api/v1/admin/reviews", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data.content); // 여기를 수정합니다.
      } else {
        navigate("/");
        alert("접근 권한이 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching report reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">리뷰 신고 목록</h2>

      {reports.map((report) => (
        <div
          key={report.reportId}
          className="flex items-center justify-between mb-4 p-4 border-t border-b"
        >
          <div className="ml-4">
            <div className="font-medium">{report.reporterName}</div>
            <div className="text-sm text-gray-600">{report.content}</div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenModal(report)}
              className="text-blue-500 border rounded p-2 hover:bg-blue-100"
            >
              상세
            </button>
          </div>
        </div>
      ))}

      {selectedReport && (
        <ReportDetailModal report={selectedReport} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ReportReviewList;
