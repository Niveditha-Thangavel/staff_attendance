import { TopBar } from "@/components/TopBar";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KpiCard } from "@/components/KpiCard";
import { Users, TrendingUp, Clock } from "lucide-react";
import { QueryState } from "@/components/QueryState";
import { useDepartments } from "@/hooks/use-api";

export default function DepartmentPage() {
  const deptQuery = useDepartments();
  const departments = deptQuery.data ?? [];

  return (
    <>
      <TopBar title="Department Insights" subtitle="Department overview" />
      <QueryState isLoading={deptQuery.isLoading} error={deptQuery.error as Error | null} onRetry={() => deptQuery.refetch()}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiCard title="Avg Attendance Rate" value={departments.length ? Math.round(departments.reduce((s, d) => s + d.rate, 0) / departments.length) : 0} suffix="%" icon={TrendingUp} colorClass="text-primary" delay={0} />
            <KpiCard title="Departments" value={departments.length} icon={Users} delay={1} />
            <KpiCard title="Avg Late/Month" value={2} icon={Clock} colorClass="text-warning" delay={2} />
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="kpi-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">All Departments Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departments}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(215, 14%, 46%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)", fontSize: "12px" }} />
                <Bar dataKey="rate" fill="hsl(173, 58%, 39%)" radius={[4, 4, 0, 0]} animationDuration={800} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </QueryState>
    </>
  );
}
