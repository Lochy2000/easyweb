
import React from 'react';
import Button from './Button';
import { ArrowRight, Code } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            <Code className="w-4 h-4" />
            <span>Modern AI Code Editor</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1">
            <span className="text-gradient">The AI Code Editor</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl text-balance opacity-0 animate-fade-in animate-delay-2">
            Built to make you extraordinarily productive, <span className="text-primary font-semibold">easyweb</span> is the best way to code with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('templates')?.scrollIntoView({behavior: 'smooth'})}
              shine
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Browse Templates
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('consultation')?.scrollIntoView({behavior: 'smooth'})}
            >
              Book a Consultation
            </Button>
          </div>
        </div>

        {/* Hero Visual - Code Editor UI */}
        <div className="relative flex items-center justify-center">
          <div className="relative opacity-0 animate-fade-in animate-delay-4">
            {/* Code Editor Frame */}
            <div className="relative z-10 glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/20 opacity-0 animate-scale-in animate-delay-4">
              <div className="bg-secondary/80 p-3 border-b border-white/10 flex items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <div className="mx-auto text-sm text-white/60">AI Code Editor</div>
              </div>
              <div className="bg-background/90 p-4 font-mono text-sm text-white/80 h-[300px] overflow-hidden">
                <div className="flex items-center gap-2 text-primary mb-2"># AI-powered code generation</div>
                <pre className="text-white/70 leading-relaxed">
                  <span className="text-blue-400">function</span> <span className="text-green-400">createComponent</span>() {`{`}<br/>
                  &nbsp;&nbsp;<span className="text-yellow-400">const</span> [code, setCode] = useState('');<br/>
                  &nbsp;&nbsp;<span className="text-yellow-400">const</span> [loading, setLoading] = useState(<span className="text-orange-400">false</span>);<br/>
                  <br/>
                  &nbsp;&nbsp;<span className="text-purple-400">// Generate with AI</span><br/>
                  &nbsp;&nbsp;<span className="text-blue-400">async function</span> <span className="text-green-400">generateCode</span>() {`{`}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span className="text-orange-400">true</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">// AI magic happens here</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span className="text-orange-400">false</span>);<br/>
                  &nbsp;&nbsp;{`}`}<br/>
                  {`}`}
                </pre>
                <div className="absolute bottom-4 left-4 right-4 flex">
                  <div className="border border-primary/30 rounded-md bg-primary/10 text-primary px-3 py-1 text-sm animate-pulse">
                    AI is generating code...
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-lg rotate-12 animate-float"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-lg -rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
