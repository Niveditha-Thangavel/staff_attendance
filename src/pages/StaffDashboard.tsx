import { motion } from "framer-motion";
import { UserCheck, Clock, CalendarClock, TrendingUp } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QueryState } from "@/components/QueryState";
import { usePersonalDashboard, usePersonalAttendance, useDepartments } from "@/hooks/use-api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const statusBadge = (status: string) => {
  const map: Record<string, { variant: "success" | "warning" | "info" | "destructive"; label: string }> = {
    present: { variant: "success", label: "Present" },
    late: { variant: "warning", label: "Late" },
    "half-day": { variant: "info", label: "Half Day" },
    absent: { variant: "destructive", label: "Absent" },
  };
  const s = map[status] || map.absent;
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

export default function StaffDashboard() {
  const dashQuery = usePersonalDashboard();
  const attendanceQuery = usePersonalAttendance();
  const deptQuery = useDepartments();

  const dash = dashQuery.data;
  const attendance = attendanceQuery.data ?? [];
  const departments = deptQuery.data ?? [];

  const isLoading = dashQuery.isLoading || attendanceQuery.isLoading || deptQuery.isLoading;
  const error = dashQuery.error || attendanceQuery.error || deptQuery.error;

  return (
    <>
      <TopBar title="My Dashboard" subtitle="Your attendance overview" />
      <QueryState
        isLoading={isLoading}
        error={error as Error | null}
        onRetry={() => { dashQuery.refetch(); attendanceQuery.refetch(); deptQuery.refetch(); }}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Days Present" value={dash?.daysPresent ?? 0} suffix={`/${dash?.totalWorkingDays ?? 22}`} icon={UserCheck} colorClass="text-success" delay={0} />
            <KpiCard title="Late Arrivals" value={dash?.lateArrivals ?? 0} icon={Clock} colorClass="text-warning" delay={1} />
            <KpiCard title="Half Days" value={dash?.halfDays ?? 0} icon={CalendarClock} colorClass="text-info" delay={2} />
            <KpiCard title="Attendance %" value={dash?.attendancePercent ?? 0} suffix="%" icon={TrendingUp} trend={dash ? { value: Math.abs(dash.attendanceTrend), positive: dash.attendanceTrend >= 0 } : undefined} delay={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="kpi-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Attendance Progress</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dash?.monthlyData ?? []}>
                  <defs>
                    <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="attendance" stroke="hsl(173, 58%, 39%)" fill="url(#attendanceGrad)" strokeWidth={2} animationDuration={800} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="kpi-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Department Comparison</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={departments} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)", fontSize: "12px" }} />
                  <Bar dataKey="rate" fill="hsl(173, 58%, 39%)" radius={[0, 4, 4, 0]} animationDuration={800} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="kpi-card !p-0 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Recent Attendance History</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Punch In</TableHead>
                  <TableHead className="text-xs font-semibold">Punch Out</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((day, i) => (
                  <motion.tr key={day.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <TableCell className="text-sm font-medium">{day.date}</TableCell>
                    <TableCell className="text-xs font-mono">{day.punchIn || "—"}</TableCell>
                    <TableCell className="text-xs font-mono">{day.punchOut || "—"}</TableCell>
                    <TableCell>{statusBadge(day.status)}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </QueryState>
    </>
  );
}
