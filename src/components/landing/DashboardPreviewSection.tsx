import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import dashboardImg1 from "@/assets/dashboard-preview-1.png";
import dashboardImg2 from "@/assets/dashboard-preview-2.png";
import dashboardImg3 from "@/assets/dashboard-preview-3.png";

const slides = [
  { src: dashboardImg1, alt: "Admin dashboard with KPI cards and live attendance table" },
  { src: dashboardImg2, alt: "Analytics dashboard with attendance reports and charts" },
  { src: dashboardImg3, alt: "Staff management dashboard with personal attendance history" },
];

export default function DashboardPreviewSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="dashboard-preview" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Dashboard Preview
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            See it in action
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Explore the admin dashboard, analytics reports, and staff management views.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg overflow-hidden"
        >
          {/* Image carousel */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted/20">
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Navigation dots */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
