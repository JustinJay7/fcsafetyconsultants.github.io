import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ClipboardCheck, FileText, Search, AlertTriangle, Landmark, ScrollText } from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "Safety Representatives",
    desc: "Fully registered Health and Safety officers and representatives available for onsite duty to ensure continuous compliance.",
  },
  {
    icon: FileText,
    title: "Health & Safety Files",
    desc: "Compiling of Health and Safety files for Principle Contractors as well as Sub Contractors.",
  },
  {
    icon: Search,
    title: "Site Auditing",
    desc: "Comprehensive auditing of sites and premises to identify risks and ensure regulatory compliance.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Investigation",
    desc: "Thorough investigation of incidents and accidents on site to determine root causes and prevent recurrence.",
  },
  {
    icon: Landmark,
    title: "Department of Labour",
    desc: "Expert handling of Department of Labour issues and requirements on your behalf.",
  },
  {
    icon: ScrollText,
    title: "Safety Documentation",
    desc: "All necessary safety documentation and inspections needed to be compliant across various sites.",
  },
  {
    icon: ClipboardCheck,
    title: "OHS Consulting",
    desc: "Professional Occupational Health and Safety consulting services tailored to your business needs and regulatory requirements.",
  },
  {
    icon: FileText,
    title: "Training & Toolbox Talks",
    desc: "Comprehensive safety training sessions and toolbox talks to keep your workforce informed and safety-conscious.",
  },
  {
    icon: Search,
    title: "Risk Assessments",
    desc: "Thorough risk assessments to identify potential hazards and implement effective control measures across your operations.",
  },
  {
    icon: AlertTriangle,
    title: "Fire Fighting & First Aid",
    desc: "Competent fire fighting and first aid representatives to ensure emergency preparedness and rapid response on site.",
  },
];
const ServicesSection = () => {
  const heading = useScrollAnimation("drop-down");
  const objective = useScrollAnimation("slide-up");

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <p
          ref={heading.ref}
          className={`text-center text-sm font-display font-bold tracking-widest text-muted-foreground uppercase mb-4 ${heading.className}`}
        >
          Unmatched Comprehensive Health &amp; Safety Solutions
        </p>
        <h2 className="text-center font-display text-3xl font-extrabold text-primary md:text-4xl mb-6">
          Our Range of Services
        </h2>
        <p
          ref={objective.ref}
          className={`text-center text-foreground/70 max-w-3xl mx-auto mb-16 text-lg leading-relaxed ${objective.className}`}
        >
          Our objective is to protect workers and employees from the struggle and hassle of health and safety accidents, and to assist employers in all channels — making it easier for them to maintain a safe and compliant workplace.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const animations = ["slide-left", "slide-up", "slide-right"] as const;
  const scroll = useScrollAnimation(animations[index % 3]);
  const Icon = service.icon;
  // Per-card border colors + glow color (RGBA for the pulsing keyframe).
  const cardStyles = [
    { border: "border-yellow-400 hover:border-yellow-400", glow: "rgba(250, 204, 21, 0.9)" },        // 0 Safety Reps
    { border: "border-safety-blue hover:border-safety-blue", glow: "rgba(20, 130, 184, 0.9)" },      // 1 H&S Files
    { border: "border-accent hover:border-accent", glow: "rgba(180, 200, 220, 0.9)" },               // 2 Site Auditing
    { border: "border-destructive hover:border-destructive", glow: "rgba(239, 68, 68, 0.9)" },       // 3 Incident
    { border: "border-purple-500 hover:border-purple-500", glow: "rgba(168, 85, 247, 0.9)" },        // 4 Dept Labour
    { border: "border-foreground hover:border-foreground", glow: "rgba(15, 23, 42, 0.85)" },         // 5 Safety Docs
    { border: "border-safety-blue hover:border-safety-blue", glow: "rgba(20, 130, 184, 0.9)" },      // 6 OHS
    { border: "border-accent hover:border-accent", glow: "rgba(180, 200, 220, 0.9)" },               // 7 Training
    { border: "border-yellow-400 hover:border-yellow-400", glow: "rgba(250, 204, 21, 0.9)" },        // 8 Risk
    { border: "border-destructive hover:border-destructive", glow: "rgba(239, 68, 68, 0.9)" },       // 9 Fire Fighting
  ];
  const style = cardStyles[index % cardStyles.length];
  // Keep card always visible (no opacity-0); only run the entrance animation when in view.
  const animationClass = scroll.className.includes("opacity-0") ? "" : scroll.className;
  return (
    <div
      ref={scroll.ref}
      style={{ ["--glow-color" as any]: style.glow }}
      className={`group rounded-lg bg-section-bg p-8 text-center border-2 ${style.border} hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_30px_4px_var(--glow-color)] transition-all duration-300 ${animationClass}`}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon className="text-primary" size={32} />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-3">{service.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
    </div>
  );
};

export default ServicesSection;
