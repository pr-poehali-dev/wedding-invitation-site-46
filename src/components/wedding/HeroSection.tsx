import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(https://cdn.poehali.dev/projects/fa5d2723-1c80-43cf-b863-841e187d3b22/files/cafb2357-2b72-452e-b457-6e6791f964af.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]"></div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="mb-8 animate-float">
          <Icon name="Heart" size={56} className="mx-auto text-primary" />
        </div>
        <h1 className="text-7xl md:text-9xl font-serif font-light text-primary mb-6 tracking-wider">
          Анна & Дмитрий
        </h1>
        <div className="h-px w-32 bg-primary/40 mx-auto mb-6"></div>
        <p className="text-2xl md:text-3xl text-foreground font-light tracking-[0.3em]">
          15 • 07 • 2025
        </p>
        <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-light italic">
          Приглашаем вас разделить с нами этот особенный день
        </p>
      </div>
      
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <Icon name="ChevronDown" size={40} className="text-primary/70 hover:text-primary transition-colors" />
      </button>
    </section>
  );
};

export default HeroSection;
