import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const WeddingInvitation = () => {
  const weddingDate = new Date('2025-07-15T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const schedule = [
    { time: '16:00', event: 'Церемония бракосочетания', icon: 'Heart' },
    { time: '17:30', event: 'Фуршет и поздравления', icon: 'Wine' },
    { time: '19:00', event: 'Праздничный ужин', icon: 'UtensilsCrossed' },
    { time: '21:00', event: 'Первый танец молодоженов', icon: 'Music' },
    { time: '22:00', event: 'Развлекательная программа', icon: 'Sparkles' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-float">
            <Icon name="Heart" size={48} className="mx-auto text-primary/60" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-light text-primary mb-4 tracking-wide">
            Анна & Дмитрий
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-widest">
            15 • 07 • 2025
          </p>
        </div>

        <Card className="p-8 md:p-12 mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-accent/20 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-primary">
            До нашего счастливого дня
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-serif text-primary mb-2 font-light">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                дней
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-serif text-primary mb-2 font-light">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                часов
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-serif text-primary mb-2 font-light">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                минут
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-serif text-primary mb-2 font-light">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                секунд
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 md:p-12 mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-accent/20 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-primary">
            Детали события
          </h2>
          
          <div className="space-y-8">
            <div className="text-center">
              <Icon name="Calendar" size={32} className="mx-auto mb-3 text-primary/60" />
              <p className="text-xl font-light text-foreground">
                15 июля 2025 года
              </p>
            </div>
            
            <Separator className="bg-accent/40" />
            
            <div className="text-center">
              <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary/60" />
              <p className="text-xl font-light text-foreground">
                Начало в 16:00
              </p>
            </div>
            
            <Separator className="bg-accent/40" />
            
            <div className="text-center">
              <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary/60" />
              <p className="text-xl font-light text-foreground">
                Ресторан "Усадьба"
              </p>
              <p className="text-muted-foreground mt-2">
                Московская область, пос. Сосновый бор
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm shadow-xl border-accent/20 animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-primary">
            Программа дня
          </h2>
          
          <div className="space-y-6">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-4 md:gap-6 group">
                <div className="flex-shrink-0 w-16 md:w-20 text-right">
                  <span className="text-lg md:text-xl font-light text-primary">
                    {item.time}
                  </span>
                </div>
                
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center group-hover:bg-accent/50 transition-colors">
                    <Icon name={item.icon as any} size={20} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow pt-2">
                  <p className="text-lg md:text-xl font-light text-foreground">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl font-serif font-light text-muted-foreground italic">
            С любовью ждем вас на нашем празднике
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitation;
