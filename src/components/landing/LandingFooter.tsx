import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: ["Dashboard", "Analytics", "Reports", "Alerts"],
  },
  {
    title: "Features",
    links: ["Real-Time Tracking", "Smart Alerts", "Staff Management", "Department Analytics"],
  },
  {
    title: "Support",
    links: ["Documentation", "Help Center", "Contact Us", "Status"],
  },
  {
    title: "Solutions",
    links: ["Universities", "Colleges", "Schools", "Corporate"],
  },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <motion.div className="flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">AttendanceHQ</span>
            </motion.div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modern staff attendance monitoring for institutions that care about their people.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                {group.title}
              </p>
              <div className="space-y-2">
                {group.links.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ x: 3 }}
                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AttendanceHQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -1 }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
