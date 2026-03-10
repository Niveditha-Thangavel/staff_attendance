import { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  colorClass?: string;
  delay?: number;
}

export function KpiCard({ title, value, suffix, prefix, icon: Icon, trend, colorClass = "text-primary", delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="kpi-card group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-3xl font-bold tracking-tight", colorClass)}>
            <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
          </p>
          {trend && (
            <p className={cn("text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
              {trend.positive ? "↑" : "↓"} {trend.value}% from yesterday
            </p>
          )}
        </div>
        <div className={cn("rounded-xl p-3 bg-accent/60 transition-colors duration-300 group-hover:bg-accent", colorClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
