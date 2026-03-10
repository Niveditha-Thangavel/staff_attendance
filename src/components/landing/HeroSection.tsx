import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import demoVideo from "@/assets/dashboard-demo.mp4";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Animated glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">Live Attendance Monitoring</span>
        </motion.div>

        <motion.h1
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] tracking-tight max-w-4xl mx-auto"
        >
          Smart attendance,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(190,60%,50%)]">
            zero hassle
          </span>
        </motion.h1>

        <motion.p
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          A modern platform to track attendance, detect missed punches, send automated reminders, and keep your institution running smoothly — all from one elegant dashboard.
        </motion.p>

        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Try a Demo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-xl border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard video */}
        <motion.div
          style={{ y: heroY }}
          className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden cursor-pointer group"
            onClick={() => navigate("/dashboard")}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
              <div className="ml-4 h-5 flex-1 max-w-xs rounded bg-muted/50" />
            </div>

            <div className="relative w-full aspect-[16/9] bg-muted/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top"
              >
                <source src= {demoVideo} type="video/mp4" />
              </video>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                  View Dashboard →
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
