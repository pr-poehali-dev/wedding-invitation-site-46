interface CountdownSectionProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CountdownSection = ({ timeLeft }: CountdownSectionProps) => {
  return (
    <section className="py-12 md:py-16 bg-accent/30 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')" }}
      />
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12 font-light">
          До встречи осталось
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center animate-fade-in">
            <div className="text-5xl md:text-6xl font-light text-primary mb-2">
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
              Дней
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl md:text-6xl font-light text-primary mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
              Часов
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl md:text-6xl font-light text-primary mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
              Минут
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-5xl md:text-6xl font-light text-primary mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
              Секунд
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;