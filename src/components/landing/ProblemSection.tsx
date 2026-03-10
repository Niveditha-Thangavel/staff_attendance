import { motion } from "framer-motion";
import { AlertTriangle, Clock, DollarSign, Building2 } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Forgotten Punches",
    desc: "Staff regularly forget to mark attendance, creating gaps in records and administrative headaches.",
    stat: "32%",
    statLabel: "of staff miss punches weekly",
  },
  {
    icon: DollarSign,
    title: "Salary Deductions",
    desc: "Missed attendance entries lead to unfair salary deductions, affecting staff morale and trust.",
    stat: "₹15K",
    statLabel: "avg. monthly loss per institution",
  },
  {
    icon: Building2,
    title: "Department Silos",
    desc: "Monitoring attendance across multiple departments is chaotic without centralized visibility.",
    stat: "5+",
    statLabel: "departments to track manually",
  },
  {
    icon: Clock,
    title: "Manual Tracking",
    desc: "Paper registers and spreadsheets waste hours of administrative time every single day.",
    stat: "2hrs",
    statLabel: "daily admin time wasted",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/[0.03] to-transparent pointer-events-none" />
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
            className="inline-block text-xs font-semibold text-destructive/80 uppercase tracking-widest mb-3"
          >
            The Problem
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Attendance management is{" "}
            <span className="text-destructive/70">broken</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            Institutions lose time, money, and trust due to outdated attendance systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-destructive/15 bg-destructive/[0.03] p-6 hover:border-destructive/25 transition-all duration-300 cursor-default overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/15 transition-colors"
                    whileHover={{ rotate: -10, scale: 1.1 }}
                  >
                    <problem.icon className="h-5 w-5 text-destructive/70" />
                  </motion.div>
                  <div className="text-right">
                    <motion.p
                      className="text-2xl font-bold text-foreground/80"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    >
                      {problem.stat}
                    </motion.p>
                    <p className="text-[10px] text-muted-foreground">{problem.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
