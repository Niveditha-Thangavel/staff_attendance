import { motion } from "framer-motion";
import { Bell, Clock, AlertTriangle, MessageSquare, CheckCircle2 } from "lucide-react";

const alerts = [
  {
    icon: AlertTriangle,
    title: "Missed Morning Punch",
    desc: "Auto-detected at 9:15 AM",
    time: "2 min ago",
    color: "bg-warning/20 text-warning",
    iconColor: "text-warning",
  },
  {
    icon: Clock,
    title: "Punch-Out Reminder",
    desc: "Sent to 12 staff members",
    time: "5 min ago",
    color: "bg-info/20 text-info",
    iconColor: "text-info",
  },
  {
    icon: Bell,
    title: "Half-Day Eligibility",
    desc: "3 staff eligible for half-day",
    time: "12 min ago",
    color: "bg-primary/20 text-primary",
    iconColor: "text-primary",
  },
];

export default function AlertsAutomationSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Alert cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              className="absolute -inset-8 bg-warning/5 rounded-3xl blur-3xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative space-y-4">
              {alerts.map((alert, i) => (
                <motion.div
                  key={alert.title}
                  initial={{ opacity: 0, x: -30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 8, scale: 1.02, transition: { duration: 0.2 } }}
                  className="rounded-xl border border-border bg-card shadow-sm p-4 flex items-center gap-4 cursor-default"
                >
                  <motion.div
                    className={`h-10 w-10 rounded-xl ${alert.color} flex items-center justify-center shrink-0`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground hidden sm:block">{alert.time}</span>
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-7 w-7 rounded-lg bg-success/10 flex items-center justify-center"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold text-warning uppercase tracking-widest mb-3"
            >
              Alerts & Automation
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
              Never miss a{" "}
              <span className="text-warning">punch</span>{" "}
              again
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The system automatically detects missed punches, sends reminders, and notifies administrators — so no one falls through the cracks.
            </p>
            <div className="space-y-3">
              {[
                "Auto-detect missed morning punch-in",
                "End-of-day punch-out reminders",
                "Half-day eligibility notifications",
                "One-click reminder via SMS or call",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
