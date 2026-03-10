import { motion } from "framer-motion";
import { User, Calendar, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function StaffExperienceSection() {
  return (
    <section id="staff-experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3"
            >
              Staff Dashboard
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
              Empowering every{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(190,60%,50%)]">
                staff member
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Staff get their own personalized dashboard to track attendance, view monthly statistics, and monitor punctuality — all without seeing other individuals' data.
            </p>
            <div className="space-y-4">
              {[
                { icon: Calendar, text: "View personal attendance history" },
                { icon: TrendingUp, text: "Track monthly trends and consistency" },
                { icon: Clock, text: "Monitor punctuality and late arrivals" },
                { icon: CheckCircle, text: "Access department-level insights" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <motion.div
                    className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Staff dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative rounded-2xl border border-border bg-card shadow-lg p-6 space-y-4">
              {/* Profile header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Computer Science Department</p>
                </div>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Present", value: "22", total: "/24 days" },
                  { label: "Late", value: "2", total: "this month" },
                  { label: "Score", value: "94%", total: "consistency" },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-xl bg-muted/50 border border-border p-3 text-center"
                  >
                    <p className="text-lg font-bold text-foreground">{kpi.value}</p>
                    <p className="text-[10px] text-muted-foreground">{kpi.total}</p>
                  </motion.div>
                ))}
              </div>

              {/* Attendance trend */}
              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground mb-3">Monthly Attendance</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[90, 95, 88, 100, 92, 100, 96, 100, 85, 100, 92, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-t ${h === 100 ? "bg-success/50" : h >= 90 ? "bg-primary/50" : "bg-warning/50"}`}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.05, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
