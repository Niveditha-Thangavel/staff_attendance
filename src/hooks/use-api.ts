import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Settings, StaffMember } from "@/lib/api";

// ============================
// Dashboard hooks
// ============================

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: api.getDashboardSummary,
  });
}

export function useWeeklyData() {
  return useQuery({
    queryKey: ["dashboard", "weekly"],
    queryFn: api.getWeeklyData,
  });
}

export function useAttendanceDistribution() {
  return useQuery({
    queryKey: ["dashboard", "distribution"],
    queryFn: api.getAttendanceDistribution,
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: api.getDepartments,
  });
}

// ============================
// Staff hooks
// ============================

export function useStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: api.getStaff,
  });
}

export function useAddStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (staff: Omit<StaffMember, "punchIn" | "punchOut" | "status" | "active">) =>
      api.addStaff(staff),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

export function useRemoveStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.removeStaff(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

// ============================
// Attendance hooks
// ============================

export function useAttendanceLogs(params?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: ["attendance", params],
    queryFn: () => api.getAttendanceLogs(params),
  });
}

// ============================
// Alert hooks
// ============================

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: api.getAlerts,
  });
}

export function useResolveAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.resolveAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}

export function useSendReminder() {
  return useMutation({
    mutationFn: (alertId: string) => api.sendReminder(alertId),
  });
}

// ============================
// Personal dashboard hooks
// ============================

export function usePersonalDashboard() {
  return useQuery({
    queryKey: ["me", "dashboard"],
    queryFn: api.getPersonalDashboard,
  });
}

export function usePersonalAttendance() {
  return useQuery({
    queryKey: ["me", "attendance"],
    queryFn: api.getPersonalAttendance,
  });
}

// ============================
// Settings hooks
// ============================

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: api.getSettings,
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: Settings) => api.updateSettings(settings),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}
