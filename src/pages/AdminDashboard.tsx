import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Clock, UserMinus, CalendarClock, Search, Filter, MoreHorizontal } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QueryState } from "@/components/QueryState";
import { useDashboardSummary, useWeeklyData, useAttendanceDistribution, useDepartments, useStaff } from "@/hooks/use-api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

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

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const summaryQuery = useDashboardSummary();
  const weeklyQuery = useWeeklyData();
  const distributionQuery = useAttendanceDistribution();
  const deptQuery = useDepartments();
  const staffQuery = useStaff();

  const summary = summaryQuery.data;
  const staff = staffQuery.data ?? [];

  const filtered = staff.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || s.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const departments = [...new Set(staff.map((s) => s.department))];

  const isLoading = summaryQuery.isLoading || weeklyQuery.isLoading || distributionQuery.isLoading || deptQuery.isLoading || staffQuery.isLoading;
  const error = summaryQuery.error || weeklyQuery.error || distributionQuery.error || deptQuery.error || staffQuery.error;

  return (
    <>
      <TopBar title="Dashboard" subtitle="Staff attendance overview" />
      <QueryState
        isLoading={isLoading}
        error={error as Error | null}
        onRetry={() => {
          summaryQuery.refetch();
          weeklyQuery.refetch();
          distributionQuery.refetch();
          deptQuery.refetch();
          staffQuery.refetch();
        }}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard title="Total Staff" value={summary?.totalStaff ?? 0} icon={Users} delay={0} />
            <KpiCard title="Present Today" value={summary?.presentToday ?? 0} icon={UserCheck} trend={summary ? { value: Math.abs(summary.presentTrend), positive: summary.presentTrend >= 0 } : undefined} colorClass="text-success" delay={1} />
            <KpiCard title="Late Arrivals" value={summary?.lateArrivals ?? 0} icon={Clock} trend={summary ? { value: Math.abs(summary.lateTrend), positive: summary.lateTrend <= 0 } : undefined} colorClass="text-warning" delay={2} />
            <KpiCard title="Half Day" value={summary?.halfDay ?? 0} icon={CalendarClock} colorClass="text-info" delay={3} />
            <KpiCard title="Absent" value={summary?.absent ?? 0} icon={UserMinus} trend={summary ? { value: Math.abs(summary.absentTrend), positive: summary.absentTrend <= 0 } : undefined} colorClass="text-destructive" delay={4} />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="kpi-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Attendance Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={distributionQuery.data ?? []} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" animationBegin={300} animationDuration={800}>
                    {(distributionQuery.data ?? []).map((entry, i) => (
                      <Cell key={i} fill={entry.fill} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="kpi-card lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyQuery.data ?? []} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)", fontSize: "12px" }} />
                  <Bar dataKey="present" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} animationDuration={800} />
                  <Bar dataKey="late" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} animationDuration={800} />
                  <Bar dataKey="absent" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Department Comparison */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="kpi-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">Department Attendance Rate</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {(deptQuery.data ?? []).map((dept, i) => (
                <div key={dept.name} className="text-center space-y-2">
                  <div className="relative mx-auto w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(210, 16%, 93%)" strokeWidth="3" />
                      <motion.path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(173, 58%, 39%)" strokeWidth="3" strokeDasharray={`${dept.rate}, 100`} initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: `${dept.rate}, 100` }} transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: "easeOut" }} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{dept.rate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{dept.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Attendance Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="kpi-card !p-0 overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Live Attendance</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-8 w-full sm:w-48 text-xs bg-secondary/50" />
                </div>
                <Select value={deptFilter} onValueChange={setDeptFilter}>
                  <SelectTrigger className="h-8 w-36 text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                    <TableHead className="text-xs font-semibold">Staff ID</TableHead>
                    <TableHead className="text-xs font-semibold">Name</TableHead>
                    <TableHead className="text-xs font-semibold">Department</TableHead>
                    <TableHead className="text-xs font-semibold">Punch In</TableHead>
                    <TableHead className="text-xs font-semibold">Punch Out</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s, i) => (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-xs font-mono text-muted-foreground">{s.id}</TableCell>
                      <TableCell className="text-sm font-medium">{s.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.department}</TableCell>
                      <TableCell className="text-xs font-mono">{s.punchIn || "—"}</TableCell>
                      <TableCell className="text-xs font-mono">{s.punchOut || "—"}</TableCell>
                      <TableCell>{statusBadge(s.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </QueryState>
    </>
  );
}
