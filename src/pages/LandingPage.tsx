import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection";
import StaffExperienceSection from "@/components/landing/StaffExperienceSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import AlertsAutomationSection from "@/components/landing/AlertsAutomationSection";
import SecuritySection from "@/components/landing/SecuritySection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DashboardPreviewSection />
      <StaffExperienceSection />
      <AnalyticsSection />
      <AlertsAutomationSection />
      <SecuritySection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
