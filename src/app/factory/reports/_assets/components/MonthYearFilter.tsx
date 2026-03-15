// components/shared/MonthYearFilter.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthYearFilterProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  yearRange?: number;
  className?: string;
}

// Get current date for default values
export const currentDate = new Date();
export const currentYear = currentDate.getFullYear().toString();

export const currentMonth = (currentDate.getMonth() + 1)
  .toString()
  .padStart(2, "0");

// Generate year options based on range
const generateYearOptions = (range: number = 2) => {
  const years: string[] = [];
  const currentYearNum = parseInt(currentYear);
  for (let i = currentYearNum - range; i <= currentYearNum + range; i++) {
    years.push(i.toString());
  }
  return years;
};

const availableMonths = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export function MonthYearFilter({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  yearRange = 2,
  className = "",
}: MonthYearFilterProps) {
  const availableYears = generateYearOptions(yearRange);

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {/* Month filter */}
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {availableMonths.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year filter */}
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
