import { useEffect, useState } from "react";
import { MdOutlineViewDay } from "react-icons/md";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { todaySales, totalSales, filterSalesReport } from "../../../api/adminApi";
import { format } from 'date-fns';
import { ISalesReport } from "../../../types/schema";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TABLE_HEAD = ["Booking ID", "User Name", "Event Name", "Company Name", "Booking Date", "Payment Status", "Payment Amount", "Ticket Type"];

const SalesReport: React.FC = () => {
  const [salesReport, setSalesReport] = useState<ISalesReport[]>([]);
  const [todayAmount, setTodayAmount] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await todaySales();
      if (res?.data.success) {
        setTodayAmount(res.data.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDat = async () => {
      const res = await totalSales();
      if (res?.data.success) {
        setTotalSalesAmount(res?.data.data);
      }
    };
    fetchDat();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await filterSalesReport(pagination);
      if (res?.data.success) {
        setSalesReport(res.data.data);
      }
    };
    fetchData();
  }, [pagination]);

  const increment = () => {
    if (salesReport.length > 0) {
      setPagination((data) => data + 1);
    }
  };

  const decrement = () => {
    if (pagination > 0) {
      setPagination((data) => data - 1);
    }
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const table = document.getElementById('sales-report-table');

    if (table) {
      const canvas = await html2canvas(table);
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      doc.save('sales_report.pdf');
    }
  };

  return (
    <>
      <div className="h-full mt-3 ml-3 mr-3 rounded-lg bg-gray-200 shadow-md p-4">
        <div className="flex gap-5 justify-evenly max-sm:flex-col">
          <div className="bg-blue-500 gap-7 w-full rounded-md flex py-3 px-5">
            <div className="bg-white flex px-3 py-3 items-center justify-center rounded-md">
              <MdOutlineViewDay className="text-blue-500" size={40} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl">{todayAmount}</span>
              <span className="text-sm text-gray-200">Today Sales</span>
            </div>
          </div>
          <div className="bg-blue-500 w-full gap-5 rounded-md flex py-3 px-5">
            <div className="bg-white flex px-3 py-3 items-center justify-center rounded-md">
              <MdDoNotDisturbOnTotalSilence className="text-blue-500" size={40} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl">{totalSalesAmount}</span>
              <span className="text-sm text-gray-200">Total Sales</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full mt-3 ml-3 mr-3 w-full rounded-lg bg-gray-200 shadow-md p-4">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="w-full flex items-center justify-center">
            <h2 className="text-xl font-semibold text-blue-gray-700">SALES REPORT</h2>
          </div>
          <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 w-[200px] py-2 rounded-md hover:bg-blue-600">
            Download PDF
          </button>
        </div>
        <div className="overflow-auto">
          <table id="sales-report-table" className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border bg-blue-400 border-blue-gray-200 bg-blue-gray-50 p-2">
                    <span className="text-sm text-blue-gray-500 text-white font-medium">{head}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesReport?.map((data, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{index + 1}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{data.user_name}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{data.event_name}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{data.company_name}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{format(new Date(data.booking_date), 'MMM dd, yyyy')}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{data.payment_status}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">Rs.{data.payment_amount}</span>
                  </td>
                  <td className="p-2 border-b border-blue-gray-200">
                    <span className="text-sm text-blue-gray-700">{data.ticket_type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-blue-gray-200 p-2">
          <button onClick={decrement} className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
            Previous
          </button>
          <div className="border border-blue-500 px-10 mt-2 rounded-md py-2">
            <span className="font-bold">{pagination + 1}</span>
          </div>
          <button onClick={increment} className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
