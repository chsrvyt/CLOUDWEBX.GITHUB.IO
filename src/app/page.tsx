import { Hero } from "@/components/hero/hero";
import { Introduction } from "@/components/shared/introduction";
import { CampusPreview } from "@/components/campus/campus-preview";
import { CapabilitiesList } from "@/components/capabilities/capabilities-list";
import { WorkList } from "@/components/work/work-list";
import { SystemSection } from "@/components/systems/system-section";
import { FlowDiagram } from "@/components/systems/flow-diagram";
import { SecurityDiagram } from "@/components/systems/security-diagram";
import { ApproachTimeline } from "@/components/approach/approach-timeline";
import { Philosophy } from "@/components/philosophy/philosophy";
import { About } from "@/components/about/about";
import { ContactSection } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer/footer";
import { AGENT_LOOP, SYSTEMS_PREVIEW } from "@/lib/constants/systems";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <CampusPreview />
      <CapabilitiesList />
      <WorkList />

      <SystemSection
        id="intelligence"
        eyebrow="04 / Intelligence"
        headline={["We build systems", "that reason and act."]}
        copy="AI, LLMs, agents and automation — assembled as one system that understands context and connects intelligence to real workflows."
        fieldVariant="ai"
        fieldLabel="Intelligence"
      >
        <FlowDiagram steps={AGENT_LOOP} loop />
      </SystemSection>

      <SystemSection
        id="systems"
        eyebrow="05 / Systems"
        headline={["Good software", "feels simple."]}
        copy="Software, cloud, infrastructure and data — complex systems underneath, simple products above."
        reverse
      >
        <FlowDiagram steps={SYSTEMS_PREVIEW} />
      </SystemSection>

      <SystemSection
        id="security"
        eyebrow="06 / Security"
        headline={["Security", "is architecture."]}
        copy="Cybersecurity, application security, infrastructure security and resilience — engineered in, not bolted on."
        fieldVariant="security"
        fieldLabel="Defense"
      >
        <SecurityDiagram />
      </SystemSection>

      <ApproachTimeline />
      <Philosophy />
      <About />
      <ContactSection />
      <Footer />
    </>
  );
}
