import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for yearly, monthly, and weekly revenue
const yearlyData = [
  { name: 'Group A', revenue: 1500 },
  { name: 'Group B', revenue: 1200 },
  { name: 'Group C', revenue: 1300 },
];

const monthlyData = [
  { name: 'Group A', revenue: 400 },
  { name: 'Group B', revenue: 300 },
  { name: 'Group C', revenue: 300 },
  { name: 'Group D', revenue: 200 },
  { name: 'Group E', revenue: 278 },
  { name: 'Group F', revenue: 189 },
];

const weeklyData = [
  { name: 'Group A', revenue: 100 },
  { name: 'Group B', revenue: 80 },
  { name: 'Group C', revenue: 90 },
  { name: 'Group D', revenue: 70 },
  { name: 'Group E', revenue: 50 },
];

const RevenueChart: React.FC = () => {
  const [chartData, setChartData] = useState(yearlyData); // Initial data is yearly

  const handleYearlyClick = () => {
    setChartData(yearlyData);
  };

  const handleMonthlyClick = () => {
    setChartData(monthlyData);
  };

  const handleWeeklyClick = () => {
    setChartData(weeklyData);
  };

  return (
    <div className="w-full">
      <div className="w-full gap-3 flex justify-end max-sm:justify-start mt-7 max-sm:ml-5 items-end mb-4">
        <button className='bg-blue-500 text-white rounded-md py-2 px-4 ' onClick={handleYearlyClick}>Yearly</button>
        <button className='bg-blue-500 text-white rounded-md py-2 px-4 ' onClick={handleMonthlyClick}>Monthly</button>
        <button className='bg-blue-500 text-white rounded-md py-2 px-4 '  onClick={handleWeeklyClick}>Weekly</button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            dataKey="revenue" // Use 'revenue' as the data key
            startAngle={180}
            endAngle={0}
            data={chartData} // Use chartData state to dynamically switch data
            cx="50%" // Center X position of the pie chart
            cy="70%" // Center Y position of the pie chart
            outerRadius={100} // Outer radius of the pie
            fill="#8884d8" // Default fill color for pie segments
            label // Enable labels inside pie segments
          />
          <Tooltip /> {/* Enable tooltip to show data on hover */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
