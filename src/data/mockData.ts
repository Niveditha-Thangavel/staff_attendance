export interface StaffMember {
  id: string;
  name: string;
  department: string;
  phone: string;
  punchIn: string | null;
  punchOut: string | null;
  status: "present" | "late" | "half-day" | "absent";
  active: boolean;
}

export const mockStaff: StaffMember[] = [
  { id: "STF001", name: "Sarah Johnson", department: "Mathematics", phone: "+1 555-0101", punchIn: "08:45", punchOut: "16:30", status: "present", active: true },
  { id: "STF002", name: "Michael Chen", department: "Physics", phone: "+1 555-0102", punchIn: "09:15", punchOut: "16:45", status: "late", active: true },
  { id: "STF003", name: "Emily Rodriguez", department: "Chemistry", phone: "+1 555-0103", punchIn: "08:50", punchOut: null, status: "present", active: true },
  { id: "STF004", name: "David Kim", department: "English", phone: "+1 555-0104", punchIn: null, punchOut: null, status: "absent", active: true },
  { id: "STF005", name: "Lisa Patel", department: "Mathematics", phone: "+1 555-0105", punchIn: "08:30", punchOut: "12:30", status: "half-day", active: true },
  { id: "STF006", name: "James Wilson", department: "History", phone: "+1 555-0106", punchIn: "08:55", punchOut: "16:35", status: "present", active: true },
  { id: "STF007", name: "Ana Martinez", department: "Biology", phone: "+1 555-0107", punchIn: "09:05", punchOut: null, status: "late", active: true },
  { id: "STF008", name: "Robert Taylor", department: "Physics", phone: "+1 555-0108", punchIn: "08:40", punchOut: "16:20", status: "present", active: true },
  { id: "STF009", name: "Priya Sharma", department: "Chemistry", phone: "+1 555-0109", punchIn: null, punchOut: null, status: "absent", active: false },
  { id: "STF010", name: "Thomas Brown", department: "English", phone: "+1 555-0110", punchIn: "08:35", punchOut: "16:40", status: "present", active: true },
  { id: "STF011", name: "Jessica Lee", department: "Mathematics", phone: "+1 555-0111", punchIn: "09:20", punchOut: null, status: "late", active: true },
  { id: "STF012", name: "William Davis", department: "History", phone: "+1 555-0112", punchIn: "08:48", punchOut: "16:25", status: "present", active: true },
];

export const weeklyData = [
  { day: "Mon", present: 42, late: 5, absent: 3 },
  { day: "Tue", present: 44, late: 3, absent: 3 },
  { day: "Wed", present: 40, late: 6, absent: 4 },
  { day: "Thu", present: 43, late: 4, absent: 3 },
  { day: "Fri", present: 38, late: 7, absent: 5 },
];

export const departmentData = [
  { name: "Mathematics", rate: 94 },
  { name: "Physics", rate: 88 },
  { name: "Chemistry", rate: 91 },
  { name: "English", rate: 85 },
  { name: "History", rate: 92 },
  { name: "Biology", rate: 89 },
];

export const attendanceDistribution = [
  { name: "Present", value: 35, fill: "hsl(152, 60%, 42%)" },
  { name: "Late", value: 8, fill: "hsl(38, 92%, 50%)" },
  { name: "Half Day", value: 3, fill: "hsl(213, 94%, 55%)" },
  { name: "Absent", value: 4, fill: "hsl(0, 72%, 51%)" },
];

export interface Alert {
  id: string;
  staffId: string;
  staffName: string;
  type: "missed-punch-in" | "missed-punch-out" | "half-day-eligible";
  message: string;
  time: string;
  resolved: boolean;
}

export const mockAlerts: Alert[] = [
  { id: "A1", staffId: "STF004", staffName: "David Kim", type: "missed-punch-in", message: "Has not punched in today", time: "09:30 AM", resolved: false },
  { id: "A2", staffId: "STF005", staffName: "Lisa Patel", type: "half-day-eligible", message: "Punched out at 12:30 — eligible for half-day", time: "12:35 PM", resolved: false },
  { id: "A3", staffId: "STF011", staffName: "Jessica Lee", type: "missed-punch-out", message: "Late arrival, no punch-out recorded yet", time: "03:00 PM", resolved: false },
  { id: "A4", staffId: "STF009", staffName: "Priya Sharma", type: "missed-punch-in", message: "Has not punched in today", time: "09:30 AM", resolved: true },
];

export const monthlyAttendance = [
  { date: "Mar 1", status: "present" as const },
  { date: "Mar 2", status: "present" as const },
  { date: "Mar 3", status: "late" as const },
  { date: "Mar 4", status: "present" as const },
  { date: "Mar 5", status: "absent" as const },
  { date: "Mar 6", status: "present" as const },
  { date: "Mar 7", status: "present" as const },
  { date: "Mar 8", status: "half-day" as const },
  { date: "Mar 9", status: "present" as const },
  { date: "Mar 10", status: "late" as const },
];

export const personalMonthlyData = [
  { week: "Week 1", attendance: 100 },
  { week: "Week 2", attendance: 80 },
  { week: "Week 3", attendance: 100 },
  { week: "Week 4", attendance: 90 },
];
