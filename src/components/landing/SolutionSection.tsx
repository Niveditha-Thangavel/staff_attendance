import { motion } from "framer-motion";
import { Clock, Bell, BarChart3, Shield, Users, Zap, Layers, Eye } from "lucide-react";

const features = [
  { icon: Clock, title: "Real-Time Tracking", desc: "Monitor punch-in and punch-out times instantly across your entire institution." },
  { icon: Bell, title: "Smart Alerts", desc: "Automated notifications for missed punches, late arrivals, and half-day eligibility." },
  { icon: BarChart3, title: "Rich Analytics", desc: "Beautiful charts and reports for department-wise attendance insights." },
  { icon: Shield, title: "Role-Based Access", desc: "Separate admin and staff dashboards with appropriate data visibility." },
  { icon: Users, title: "Staff Management", desc: "Easily add, edit, and manage staff records from a centralized panel." },
  { icon: Zap, title: "Instant Reports", desc: "Generate and export attendance reports by date range, department, or individual." },
  { icon: Layers, title: "Department Analytics", desc: "Compare performance across departments with detailed breakdowns." },
  { icon: Eye, title: "Staff Self-Service", desc: "Staff can view their own attendance, trends, and department stats anytime." },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
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
            The Solution
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Everything you need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(190,60%,50%)]">
              nothing you don't
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            Powerful tools designed for modern institutions that value efficiency and clarity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              <motion.div
                className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <feature.icon className="h-5 w-5 text-primary" />
              </motion.div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-b-2xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
