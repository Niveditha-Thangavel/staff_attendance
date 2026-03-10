import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section id="cta" className="py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative rounded-3xl border border-border bg-card shadow-lg p-12 md:p-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4"
            >
              Ready to streamline attendance?
            </motion.h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              See the platform in action. Explore admin and staff dashboards with live mock data.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-10 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  Try the Demo <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-10 text-base rounded-xl border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  Request Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
