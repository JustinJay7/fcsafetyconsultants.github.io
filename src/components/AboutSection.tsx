import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const heading = useScrollAnimation("drop-down");
  const text = useScrollAnimation("slide-left");
  const text2 = useScrollAnimation("slide-right");

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <p
          ref={heading.ref}
          className={`text-sm font-display font-bold tracking-widest text-muted-foreground uppercase mb-4 ${heading.className}`}
        >
          Your Partner in Occupational Health &amp; Safety Excellence
        </p>
        <h2
          ref={text.ref}
          className={`font-display text-3xl font-extrabold text-primary md:text-4xl mb-8 ${text.className}`}
        >
          Leading the Way in Workplace Safety and Compliance
        </h2>
        <p
          ref={text2.ref}
          className={`text-foreground/80 text-lg leading-relaxed ${text2.className}`}
        >
          Welcome to FC Safety Consultants Pty Ltd, where we are dedicated to making safety an integral part of every workplace. Our customized safety solutions, accredited safety training, and comprehensive risk management strategies ensure your business complies with the Occupational Health &amp; Safety Act of 1993 and its Regulations. We strive to foster safer, more productive work environments. With a focus on excellence, we build lasting relationships and promote a strong culture of safety in every organization we serve.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
