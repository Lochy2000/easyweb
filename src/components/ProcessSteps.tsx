import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Phone, 
  FileText, 
  Code2, 
  Rocket, 
  HeartHandshake,
  ArrowRight,
  Users,
  UserCheck
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const steps = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Discovery Call",
    description: "We'll hop on a quick call to learn about your business, goals, and what kind of website or app you need. No pressure — just a chance to explore.",
    subtext: "🔍 You talk. We listen. Then we give some honest, practical suggestions."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Planning & Proposal",
    description: "After the call, we'll draft a simple proposal with timelines, costs, and what's included. Everything is transparent and clear — no techy confusion or fine print.",
    subtext: "📝 You'll know exactly what you're getting and what it'll cost."
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Design & Build",
    description: "Once you give us the green light, we'll start designing and coding your project. You'll get updates throughout and have chances to give feedback.",
    subtext: "🧱 We build in small steps so you're never left in the dark."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Testing & Launch",
    description: "We rigorously test your site/app to make sure it works perfectly on all devices. Once you approve, we'll launch it — either on our hosting or yours.",
    subtext: "🚀 It's go time. We launch when you're 100% happy."
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Support & Growth",
    description: "We don't disappear after launch. We're available for tweaks, updates, and ongoing support. We can also help you grow your site with SEO or performance improvements.",
    subtext: "🤝 Consider us your long-term tech partner."
  }
];

const ProcessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[800px] bg-[#0f0f12] border border-white/10">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Our Road to Your Success</DialogTitle>
      </DialogHeader>
      <div className="mt-4 space-y-8">
        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground/70 mb-3">{step.description}</p>
                <p className="text-sm text-primary/80">{step.subtext}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-16 w-[2px] h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const ApproachCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative"
  >
    <div className="relative p-[1px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 opacity-0 group-hover:opacity-100 rounded-2xl"></div>
      <div className="absolute inset-[1px] bg-black rounded-xl"></div>
      <div className="relative z-10 p-6 bg-[#0f0f12] rounded-xl">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </div>
  </motion.div>
);

export const ProcessSteps = () => {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  return (
    <section id="process" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Journey, Your Way
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Choose how you want to work with us
          </p>
          <button
            onClick={() => setIsProcessModalOpen(true)}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span>Learn about our process</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ApproachCard
            icon={<Users className="w-6 h-6" />}
            title="Full-Service Approach"
            description="Let us handle everything from start to finish. We'll manage the entire process while keeping you updated at every step."
            delay={0.1}
          />
          <ApproachCard
            icon={<UserCheck className="w-6 h-6" />}
            title="Collaborative Approach"
            description="Work closely with our team. Be involved in key decisions and provide feedback throughout the development process."
            delay={0.2}
          />
        </div>
      </div>

      <ProcessModal 
        isOpen={isProcessModalOpen} 
        onClose={() => setIsProcessModalOpen(false)} 
      />
    </section>
  );
}; 