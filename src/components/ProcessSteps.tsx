import { motion } from "framer-motion";

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative flex gap-6 items-start"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
      <span className="text-primary font-semibold">{number}</span>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </motion.div>
);

export const ProcessSteps = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Road to Your Success
            </h2>
            <p className="text-lg text-foreground/80">
              We follow a proven process to deliver exceptional results for every project
            </p>
          </motion.div>

          <div className="space-y-12">
            <Step
              number="01"
              title="Join an Exploration Call"
              description="Tell us about your business during a discovery call. We'll discuss your team structure, approach, success criteria, timeline, and budget."
            />
            <Step
              number="02"
              title="Discuss Solution and Team Structure"
              description="Within a few days, we will finalize your project specifications, agree on an engagement model, and select your team."
            />
            <Step
              number="03"
              title="Get Started and Track Performance"
              description="After agreeing on milestones, we'll begin work immediately. We'll monitor progress and provide regular updates."
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 