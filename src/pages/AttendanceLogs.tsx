import { TopBar } from "@/components/TopBar";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QueryState } from "@/components/QueryState";
import { useAttendanceLogs } from "@/hooks/use-api";
import { useState } from "react";

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

export default function AttendanceLogs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const logsQuery = useAttendanceLogs({ status: statusFilter, search });
  const logs = logsQuery.data ?? [];

  return (
    <>
      <TopBar title="Attendance Logs" subtitle="Complete attendance records" />
      <QueryState isLoading={logsQuery.isLoading} error={logsQuery.error as Error | null} onRetry={() => logsQuery.refetch()}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64 bg-card" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <Filter className="h-3.5 w-3.5 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="kpi-card !p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="text-xs font-semibold">Staff ID</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Department</TableHead>
                  <TableHead className="text-xs font-semibold">Punch In</TableHead>
                  <TableHead className="text-xs font-semibold">Punch Out</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((s, i) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <TableCell className="text-xs font-mono text-muted-foreground">{s.id}</TableCell>
                    <TableCell className="text-sm font-medium">{s.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{s.department}</TableCell>
                    <TableCell className="text-xs font-mono">{s.punchIn || "—"}</TableCell>
                    <TableCell className="text-xs font-mono">{s.punchOut || "—"}</TableCell>
                    <TableCell>{statusBadge(s.status)}</TableCell>
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
