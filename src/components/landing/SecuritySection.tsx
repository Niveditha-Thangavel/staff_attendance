import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, Key } from "lucide-react";

const securityFeatures = [
  { icon: Shield, title: "Role-Based Access", desc: "Admin and staff views are completely separated with strict permissions." },
  { icon: Lock, title: "Data Isolation", desc: "Staff can only view their own attendance and department-level aggregates." },
  { icon: Eye, title: "Audit Trail", desc: "Every action is logged for transparency and accountability." },
  { icon: FileCheck, title: "Compliance Ready", desc: "Built to meet institutional data privacy and governance standards." },
  { icon: Server, title: "99.9% Uptime", desc: "Enterprise-grade reliability with automated failover systems." },
  { icon: Key, title: "Encrypted Data", desc: "All data is encrypted in transit and at rest for maximum protection." },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
            Security & Control
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Enterprise-grade security
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            Built with institutional trust and data privacy at its core.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border bg-card/50 p-5 hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <motion.div
                className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <feature.icon className="h-4 w-4 text-primary" />
              </motion.div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
