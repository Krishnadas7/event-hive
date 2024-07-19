import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { filterUsers } from '../../api/adminApi';
import { formatData } from './chartData';




const BarChartComponent = () => {
  const [filter, setFilter] = useState('monthly');
  const [data, setData] = useState([]);

 
  useEffect(()=>{
    const fetchData = async () =>{
        const res = await filterUsers()
        // console.log('data from filters======',res?.data.data);
        if(res?.data.data){
        const { yearlyData, monthlyData, weeklyData } = res?.data?.data
        switch (filter) {
          case 'monthly':
            setData(formatData(monthlyData, 'monthly'));
            break;
          case 'weekly':
            setData(formatData(weeklyData, 'weekly'));
            break;
          case 'yearly':
            setData(formatData(yearlyData, 'yearly'));
            break;
          default:
            setData(formatData(monthlyData, 'monthly'));
        }
      }
    }
    fetchData()
  },[filter])
  console.log('data from filters',data);
  return (
    <div className='w-full '>
      <div className=' w-full gap-5' style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button className='bg-blue-500 px-3 rounded-md text-white py-1' onClick={() => setFilter('monthly')}>Monthly</button>
        <button className='bg-blue-500 px-3 rounded-md text-white py-1' onClick={() => setFilter('weekly')}>Weekly</button>
        <button className='bg-blue-500 px-3 rounded-md text-white py-1' onClick={() => setFilter('yearly')}>Yearly</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis tickCount={100} domain={[0, 'dataMax']} />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#2d4ad2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

