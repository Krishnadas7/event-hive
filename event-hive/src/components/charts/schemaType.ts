// schema.ts
export interface EventStatus {
    value: number; // Adjust the type if necessary
  }
  
  export interface YearlyData {
    _id: { year: number };
    count: number;
  }
  
  export interface MonthlyData {
    _id: { month: number; year: number };
    count: number;
  }
  
  export interface WeeklyData {
    _id: { week: number; year: number };
    count: number;
  }
  
  export type Data = YearlyData | MonthlyData | WeeklyData;
  