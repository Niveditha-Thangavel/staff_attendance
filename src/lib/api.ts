// ============================
// API Configuration & Client
// ============================

export const API_BASE_URL = "http://localhost:8000";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "Unknown error");
    throw new ApiError(res.status, `API ${res.status}: ${body}`);
  }

  return res.json();
}

// ============================
// Types (matching backend contract)
// ============================

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

export interface DashboardSummary {
  totalStaff: number;
  presentToday: number;
  presentTrend: number;
  lateArrivals: number;
  lateTrend: number;
  halfDay: number;
  absent: number;
  absentTrend: number;
}

export interface WeeklyDataPoint {
  day: string;
  present: number;
  late: number;
  absent: number;
}

export interface AttendanceDistributionItem {
  name: string;
  value: number;
  fill: string;
}

export interface DepartmentRate {
  name: string;
  rate: number;
}

export interface Alert {
  id: string;
  staffId: string;
  staffName: string;
  type: "missed-punch-in" | "missed-punch-out" | "half-day-eligible";
  message: string;
  time: string;
  resolved: boolean;
}

export interface MonthlyAttendanceDay {
  date: string;
  status: "present" | "late" | "half-day" | "absent";
  punchIn?: string | null;
  punchOut?: string | null;
}

export interface PersonalMonthlyDataPoint {
  week: string;
  attendance: number;
}

export interface PersonalDashboard {
  daysPresent: number;
  totalWorkingDays: number;
  lateArrivals: number;
  halfDays: number;
  attendancePercent: number;
  attendanceTrend: number;
  monthlyData: PersonalMonthlyDataPoint[];
}

export interface Settings {
  workStart: string;
  workEnd: string;
  lateThreshold: string;
  halfDayCutoff: string;
  emailNotif: boolean;
  pushNotif: boolean;
  missedPunchAlert: boolean;
  lateAlert: boolean;
  weeklyReport: boolean;
  timezone: string;
  theme: string;
}

// ============================
// API Endpoints
// ============================

export const api = {
  // --- Dashboard ---
  getDashboardSummary: () =>
    request<DashboardSummary>("/api/dashboard/summary"),

  getWeeklyData: () =>
    request<WeeklyDataPoint[]>("/api/dashboard/weekly"),

  getAttendanceDistribution: () =>
    request<AttendanceDistributionItem[]>("/api/dashboard/distribution"),

  getDepartments: () =>
    request<DepartmentRate[]>("/api/departments"),

  // --- Staff ---
  getStaff: () =>
    request<StaffMember[]>("/api/staff"),

  addStaff: (staff: Omit<StaffMember, "punchIn" | "punchOut" | "status" | "active">) =>
    request<StaffMember>("/api/staff", {
      method: "POST",
      body: JSON.stringify(staff),
    }),

  removeStaff: (id: string) =>
    request<void>(`/api/staff/${id}`, { method: "DELETE" }),

  // --- Attendance Logs ---
  getAttendanceLogs: (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.status && params.status !== "all") query.set("status", params.status);
    if (params?.search) query.set("search", params.search);
    const qs = query.toString();
    return request<StaffMember[]>(`/api/attendance${qs ? `?${qs}` : ""}`);
  },

  // --- Alerts ---
  getAlerts: () =>
    request<Alert[]>("/api/alerts"),

  resolveAlert: (id: string) =>
    request<Alert>(`/api/alerts/${id}/resolve`, { method: "PATCH" }),

  sendReminder: (alertId: string) =>
    request<void>(`/api/alerts/${alertId}/remind`, { method: "POST" }),

  // --- Personal / Staff Dashboard ---
  getPersonalDashboard: () =>
    request<PersonalDashboard>("/api/me/dashboard"),

  getPersonalAttendance: () =>
    request<MonthlyAttendanceDay[]>("/api/me/attendance"),

  // --- Settings ---
  getSettings: () =>
    request<Settings>("/api/settings"),

  updateSettings: (settings: Settings) =>
    request<Settings>("/api/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
};
