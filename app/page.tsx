import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { ProcessSection } from "@/components/process-section";
import { FeaturesSection } from "@/components/features-section";
import { ValuesSection } from "@/components/values-section";
import { JudgmentSection } from "@/components/judgment-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <StatsSection />
      <ProcessSection />
      <FeaturesSection />
      <ValuesSection />
      {/* <JudgmentSection /> */}
    </div>
  );
}
