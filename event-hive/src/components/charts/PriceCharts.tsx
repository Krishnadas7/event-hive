import { useEffect,useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { piechartData } from '../../api/adminApi';
import { EventStatus } from '../../types/schema';
import { transformEventStatusData } from './chartData';

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}



const COLORS = ['#00C49F','#0088FE'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }:LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PriceChart = () => {
  const [data, setData] = useState<EventStatus[]>([]);
  useEffect(()=>{
    const fetchData = async () =>{
      const res =await piechartData()
      if(res?.success){
        const transformedData = transformEventStatusData(res?.data);
      setData(transformedData);
      }
      
    }
    fetchData()
  },[])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={143} // Increase outer radius for bigger chart
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip /> {/* Show tooltip on hover */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
