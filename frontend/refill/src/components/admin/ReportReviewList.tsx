import * as React from 'react';
import axios from 'axios';
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ReviewResponse {
    reviewId: number;
    score: number;
    content: string;
    memberId: number;
    nickname: string;
    doctorId: number;
    doctorName: string;
    hospitalId: number;
    hospitalName: string;
    updateDate: string; 
    category: string;
  }
  
  enum Role {
    MEMBER,
    HOSPITAL
  }
  
  interface ReportReviewResponse {
    reportId: number;
    reviewResponse: ReviewResponse;
    reporterType: Role;
    reporterId: number;
    reporterName: string;
    content: string;
  }

const ReportReviewList: React.FC = () => {
  const token: string = useSelector((state: RootState) => state.login.token);
  const islogin: boolean = useSelector((state: RootState) => state.login.islogin);
  const navigate = useNavigate();

  const [reports, setReports] = React.useState<ReportReviewResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchReports = async () => {
    try {
      if (islogin) {
        const response = await axios.get("api/v1/admin/reviews", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        setReports(response.data.content);  // 여기를 수정합니다.
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
    <table style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th>Report ID</th>
          <th>Reporter Type</th>
          <th>Reporter ID</th>
          <th>Reporter Name</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {reports.map(report => (
          <tr key={report.reportId}>
            <td>{report.reportId}</td>
            <td>{report.reporterType}</td>
            <td>{report.reporterId}</td>
            <td>{report.reporterName}</td>
            <td>{report.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportReviewList;
