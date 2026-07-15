import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { ProcessSection } from "@/components/process-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <StatsSection />
      <ProcessSection />
    </div>
  );
}
