import { useEffect, useState } from "react";
import { completeReport } from "../../../api/adminApi";
import { ReportData } from "../../../types/schema";

function Report() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportData[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await completeReport();
      console.log('report data', res?.data[0].reports);
      if (res?.success) {
        setReports(res?.data[0].reports);
        setFilteredReports(res?.data[0].reports);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = reports?.filter(report => 
      report.userEmail.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredReports(result);
  }, [filter, reports]);

  return (
    <div className="h-full mt-3 ml-3 mr-3 rounded-lg bg-gray-200 shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">User Reports</h2>
      <input 
        type="text"
        placeholder="Filter by user email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border border-blue-500 rounded-md w-full outline-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-blue-500">{report?.userEmail}</h3>
            <p className="text-gray-700 mt-2 line-clamp-2">{report?.report}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
