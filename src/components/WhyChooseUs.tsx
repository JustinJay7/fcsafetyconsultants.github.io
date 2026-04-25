import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Handshake, Settings, Award, Shield } from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "Expertise You Can Trust",
    desc: "Our team of fully registered Health and Safety officers bring years of experience across various industries to enhance your business operations.",
  },
  {
    icon: Settings,
    title: "Customized Solutions",
    desc: "We work closely with you to develop customized safety programs that align with your industry, goals, and regulatory requirements.",
  },
  {
    icon: Award,
    title: "Commitment to Excellence",
    desc: "Our mission is to ensure your workplace not only meets but exceeds safety standards. We are committed to providing exceptional service every step of the way.",
  },
  {
    icon: Shield,
    title: "Our Promise",
    desc: "At FC Safety Consultants, we are more than just consultants — we are your partners in safety. Driven by integrity, professionalism, and a shared goal of a safer workplace.",
  },
];

const WhyChooseUs = () => {
  const heading = useScrollAnimation("drop-down");

  return (
    <section className="section-padding section-blue">
      <div className="container mx-auto max-w-5xl">
        <p
          ref={heading.ref}
          className={`text-center text-sm font-display font-bold tracking-widest uppercase mb-4 text-safety-blue-foreground/80 ${heading.className}`}
        >
          Elevating Your Workplace Safety to New Heights
        </p>
        <h2 className="text-center font-display text-3xl font-extrabold text-safety-blue-foreground md:text-4xl mb-16">
          Why Choose FC Safety Consultants?
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((f, i) => {
            const anim = i % 2 === 0 ? "slide-left" : "slide-right";
            return <FeatureCard key={f.title} feature={f} animation={anim} />;
          })}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, animation }: { feature: typeof features[0]; animation: "slide-left" | "slide-right" }) => {
  const scroll = useScrollAnimation(animation);
  const Icon = feature.icon;
  return (
    <div ref={scroll.ref} className={`text-center ${scroll.className}`}>
      <Icon className="mx-auto mb-4 text-safety-blue-foreground" size={56} strokeWidth={1.5} />
      <h3 className="font-display text-xl font-bold text-safety-blue-foreground mb-3">{feature.title}</h3>
      <p className="text-safety-blue-foreground/90 leading-relaxed">{feature.desc}</p>
    </div>
  );
};

export default WhyChooseUs;
