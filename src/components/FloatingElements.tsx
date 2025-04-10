import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
  animationDelay: number;
}

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 10,
          animationDuration: Math.random() * 10 + 10,
          animationDelay: Math.random() * -10,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-lg animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            animationDuration: `${element.animationDuration}s`,
            animationDelay: `${element.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}; 