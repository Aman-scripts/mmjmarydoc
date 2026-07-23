import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { ScrollFab } from "@/components/scroll-fab";
import { LazyMount } from "@/components/lazy-mount";

const StatsSection = dynamic(() =>
  import("@/components/stats-section").then((m) => ({ default: m.StatsSection }))
);
const ProcessSection = dynamic(() =>
  import("@/components/process-section").then((m) => ({ default: m.ProcessSection }))
);
const FeaturesSection = dynamic(() =>
  import("@/components/features-section").then((m) => ({ default: m.FeaturesSection }))
);
const ValuesSection = dynamic(() =>
  import("@/components/values-section").then((m) => ({ default: m.ValuesSection }))
);
const JudgmentSection = dynamic(() =>
  import("@/components/judgment-section").then((m) => ({ default: m.JudgmentSection }))
);
const PricingSection = dynamic(() =>
  import("@/components/pricing-section").then((m) => ({ default: m.PricingSection }))
);
const StandardsSection = dynamic(() =>
  import("@/components/standards-section").then((m) => ({ default: m.StandardsSection }))
);
const ReviewsSection = dynamic(() =>
  import("@/components/reviews-section").then((m) => ({ default: m.ReviewsSection }))
);
const FooterSection = dynamic(() =>
  import("@/components/footer-section").then((m) => ({ default: m.FooterSection }))
);

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <LazyMount rootMargin="320px 0px" minHeight={520}>
        <StatsSection />
      </LazyMount>
      <LazyMount rootMargin="280px 0px" minHeight={700}>
        <ProcessSection />
      </LazyMount>
      <LazyMount rootMargin="280px 0px" minHeight={900}>
        <FeaturesSection />
      </LazyMount>
      <LazyMount rootMargin="240px 0px" minHeight={900}>
        <ValuesSection />
      </LazyMount>
      <LazyMount rootMargin="240px 0px" minHeight={700}>
        <JudgmentSection />
      </LazyMount>
      <LazyMount rootMargin="240px 0px" minHeight={700}>
        <PricingSection />
      </LazyMount>
      <LazyMount rootMargin="200px 0px" minHeight={800}>
        <StandardsSection />
      </LazyMount>
      <LazyMount rootMargin="200px 0px" minHeight={700}>
        <ReviewsSection />
      </LazyMount>
      <LazyMount rootMargin="160px 0px" minHeight={320}>
        <FooterSection />
      </LazyMount>
      <ScrollFab />
    </div>
  );
}
