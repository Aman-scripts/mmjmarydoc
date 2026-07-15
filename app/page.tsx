import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { ProcessSection } from "@/components/process-section";
import { FeaturesSection } from "@/components/features-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <StatsSection />
      <ProcessSection />
      <FeaturesSection />
    </div>
  );
}
