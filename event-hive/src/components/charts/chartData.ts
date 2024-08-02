import { EventStatus } from "../../types/schema";

export interface AggregatedData {
  _id: {
    year: number;
    month?: number;
    week?: number;
  };
  count: number;
}

export interface FormattedData {
  name: string;
  pv: number;
}
export const transformEventStatusData = (data: EventStatus[]): EventStatus[] => {
    return data?.map((item, index) => ({
      name: index === 0 ? 'Open' : 'Closed', // Assuming the order is live and closed
      value: item.value,
    }));
  };
  const monthNames:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const formatMonthName = (monthNumber: number) => monthNames[monthNumber - 1];
  
  export const formatData = (data: AggregatedData[], type: string): FormattedData[] => {
    switch (type) {
      case 'yearly':
        return data.map((d) => ({ name: `${d._id.year}`, pv: d.count }));
      case 'monthly':
        return data.map((d) => ({ name: `${formatMonthName(d._id.month!)}/${d._id.year}`, pv: d.count }));
      case 'weekly':
        return data.map((d) => ({ name: `W${d._id.week}/${d._id.year}`, pv: d.count }));
      default:
        return [];
    }
  };
  
   