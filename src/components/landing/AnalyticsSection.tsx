import { motion } from "framer-motion";

const departments = [
  { name: "Computer Science", rate: 96, color: "bg-primary" },
  { name: "Mathematics", rate: 91, color: "bg-[hsl(213,94%,55%)]" },
  { name: "Physics", rate: 88, color: "bg-success" },
  { name: "Chemistry", rate: 94, color: "bg-warning" },
  { name: "Biology", rate: 85, color: "bg-[hsl(280,60%,55%)]" },
];

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(213,94%,55%)]/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Analytics
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Data-driven decisions
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            Beautiful, animated analytics that make attendance data easy to understand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card shadow-sm p-6"
          >
            <p className="text-sm font-medium text-foreground/70 mb-6">Department Attendance Rate</p>
            <div className="space-y-4">
              {departments.map((dept, i) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{dept.name}</span>
                    <motion.span
                      className="text-foreground font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {dept.rate}%
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${dept.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dept.rate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly trend chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card shadow-sm p-6"
          >
            <p className="text-sm font-medium text-foreground/70 mb-6">Weekly Attendance Trend</p>
            <div className="flex items-end gap-3 h-48">
              {[
                { day: "Mon", val: 92 },
                { day: "Tue", val: 88 },
                { day: "Wed", val: 95 },
                { day: "Thu", val: 90 },
                { day: "Fri", val: 82 },
                { day: "Sat", val: 45 },
              ].map((bar, i) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-t-lg bg-primary/40 hover:bg-primary/60 transition-colors relative group cursor-default"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${bar.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  >
                    <motion.span
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {bar.val}%
                    </motion.span>
                  </motion.div>
                  <span className="text-[10px] text-muted-foreground">{bar.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Distribution donut mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card shadow-sm p-6"
          >
            <p className="text-sm font-medium text-foreground/70 mb-6">Attendance Distribution</p>
            <div className="flex items-center justify-center">
              <div className="relative">
                <motion.svg
                  width="160" height="160" viewBox="0 0 160 160"
                  initial={{ rotate: -90 }}
                  whileInView={{ rotate: -90 }}
                  viewport={{ once: true }}
                >
                  <circle cx="80" cy="80" r="60" fill="none" stroke="hsl(var(--muted))" strokeWidth="20" />
                  <motion.circle
                    cx="80" cy="80" r="60" fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="20"
                    strokeDasharray={`${0.75 * 377} ${0.25 * 377}`}
                    initial={{ strokeDashoffset: 377 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  />
                  <motion.circle
                    cx="80" cy="80" r="60" fill="none"
                    stroke="hsl(var(--warning))"
                    strokeWidth="20"
                    strokeDasharray={`${0.15 * 377} ${0.85 * 377}`}
                    strokeDashoffset={`${-0.75 * 377}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  <motion.circle
                    cx="80" cy="80" r="60" fill="none"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="20"
                    strokeDasharray={`${0.10 * 377} ${0.90 * 377}`}
                    strokeDashoffset={`${-0.90 * 377}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  />
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      91%
                    </motion.p>
                    <p className="text-[10px] text-muted-foreground">Overall</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              {[
                { label: "Present", color: "bg-success" },
                { label: "Late", color: "bg-warning" },
                { label: "Absent", color: "bg-destructive" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-[10px] text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card shadow-sm p-6 flex flex-col justify-center"
          >
            <p className="text-sm font-medium text-foreground/70 mb-6">Platform Statistics</p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "50K+", label: "Records Tracked" },
                { value: "<1s", label: "Response Time" },
                { value: "24/7", label: "Monitoring" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  className="text-center cursor-default"
                >
                  <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
