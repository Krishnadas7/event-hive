import { EventStatus } from "../../types/schema";

export const transformEventStatusData = (data: EventStatus[]): EventStatus[] => {
    return data?.map((item, index) => ({
      name: index === 0 ? 'Open' : 'Closed', // Assuming the order is live and closed
      value: item.value,
    }));
  };
  const monthNames:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const formatMonthName = (monthNumber: number) => monthNames[monthNumber - 1];
  
  export const formatData = (data:any, type:string) => {
    switch (type) {
      case 'yearly':
        return data?.map((d:any) => ({ name: d._id.year, pv: d.count }));
      case 'monthly':
        return data?.map((d:any) => ({ name: `${formatMonthName(d._id.month)}/${d._id.year}`, pv: d.count }));
      case 'weekly':
        return data?.map((d:any) => ({ name: `W${d._id.week}/${d._id.year}`, pv: d.count }));
      default:
        return [];
    }
  };
  
   