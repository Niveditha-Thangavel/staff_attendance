import { TopBar } from "@/components/TopBar";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <>
      <TopBar title="Reports" subtitle="Generate and view attendance reports" />
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="kpi-card flex flex-col items-center justify-center py-20 text-center"
        >
          <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Reports Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Generate detailed attendance reports by department, date range, and individual staff members. Export to PDF or CSV.
          </p>
        </motion.div>
      </div>
    </>
  );
}
