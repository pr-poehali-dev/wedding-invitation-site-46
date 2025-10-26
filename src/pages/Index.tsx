import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import Divider from '@/components/Divider';

const WeddingInvitation = () => {
  const { toast } = useToast();
  const weddingDate = new Date('2025-07-15T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    message: '',
    drinks: [] as string[]
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

  const handleDrinkToggle = (drink: string) => {
    setFormData(prev => ({
      ...prev,
      drinks: prev.drinks.includes(drink)
        ? prev.drinks.filter(d => d !== drink)
        : [...prev.drinks, drink]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за подтверждение!",
      description: "Мы с нетерпением ждем встречи с вами",
    });
    setFormData({ name: '', guests: '', message: '', drinks: [] });
  };

  const schedule = [
    { time: '16:00', event: 'Церемония бракосочетания', icon: 'Heart' },
    { time: '17:30', event: 'Фуршет и поздравления', icon: 'Wine' },
    { time: '19:00', event: 'Праздничный ужин', icon: 'UtensilsCrossed' },
    { time: '21:00', event: 'Первый танец молодоженов', icon: 'Music' },
    { time: '22:00', event: 'Развлекательная программа', icon: 'Sparkles' }
  ];

  return (
    <div className="min-h-screen bg-background">
      
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

      <Divider />

      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-primary font-light">
              Программа дня
            </h2>
            <div className="h-px w-24 bg-primary/30 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {schedule.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-6 md:gap-8 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="flex-shrink-0 w-20 md:w-24 text-right pt-2">
                  <span className="text-xl md:text-2xl font-serif font-light text-primary">
                    {item.time}
                  </span>
                </div>
                
                <div className="flex-shrink-0 mt-2">
                  <div className="w-12 h-12 rounded-full bg-accent/40 flex items-center justify-center group-hover:bg-accent/60 transition-all group-hover:scale-110">
                    <Icon name={item.icon as any} size={22} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow pt-2">
                  <p className="text-xl md:text-2xl font-light text-foreground">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="relative w-full bg-secondary/20">
        <div className="text-center pt-20 pb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-primary font-light">
            Детали события
          </h2>
          <div className="h-px w-24 bg-primary/30 mx-auto"></div>
        </div>
        
        <div className="relative w-full animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
          <img 
            src="https://cdn.poehali.dev/files/cf92b069-54dd-42ee-8cfe-1d04b4a5c9aa.jpg" 
            alt="Место проведения свадьбы"
            className="w-full h-[600px] md:h-[700px] object-cover"
          />
          
          <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl px-4">
              <div className="text-center bg-gray-800/85 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-4">
                  <Icon name="Calendar" size={40} className="mx-auto text-white" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-white">Дата</h3>
                <p className="text-lg font-light text-white/95">
                  15 июля 2025 года
                </p>
              </div>
              
              <div className="text-center bg-gray-800/85 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-4">
                  <Icon name="Clock" size={40} className="mx-auto text-white" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-white">Время</h3>
                <p className="text-lg font-light text-white/95">
                  Начало в 16:00
                </p>
              </div>
              
              <div className="text-center bg-gray-800/85 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-4">
                  <Icon name="MapPin" size={40} className="mx-auto text-white" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-white">Место</h3>
                <p className="text-lg font-light text-white/95">
                  Ресторан "Усадьба"
                </p>
                <p className="text-sm text-white/75 mt-2 font-light">
                  Московская область<br/>пос. Сосновый бор
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-20"></div>
      </section>

      <Divider />

      <section 
        className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/projects/fa5d2723-1c80-43cf-b863-841e187d3b22/files/00b05cb9-cb7c-421e-9cb4-4fb27f10a0d0.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 container max-w-5xl mx-auto px-4">
          <Card className="p-10 md:p-16 bg-card/90 backdrop-blur-sm shadow-2xl border-accent/30 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-primary font-light">
              До нашего счастливого дня
            </h2>
            <div className="h-px w-24 bg-primary/30 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-serif text-primary mb-3 font-light">
                  {timeLeft.days}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-light">
                  дней
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-serif text-primary mb-3 font-light">
                  {timeLeft.hours}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-light">
                  часов
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-serif text-primary mb-3 font-light">
                  {timeLeft.minutes}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-light">
                  минут
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-serif text-primary mb-3 font-light">
                  {timeLeft.seconds}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-light">
                  секунд
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Divider />

      <section className="py-20 md:py-32 bg-secondary/20">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-primary font-light">
              Подтверждение присутствия
            </h2>
            <div className="h-px w-24 bg-primary/30 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground font-light">
              Пожалуйста, сообщите нам о вашем присутствии
            </p>
          </div>
          
          <Card className="p-8 md:p-12 bg-card/90 backdrop-blur-sm shadow-xl border-accent/30 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Ваше имя *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Иван Иванов"
                  className="bg-background/50 border-accent/40 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Количество гостей *
                </label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  placeholder="1"
                  className="bg-background/50 border-accent/40 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-foreground mb-3 tracking-wide">
                  Ваши предпочтения по напиткам
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'spirits', label: 'Крепкий алкоголь' },
                    { id: 'white-wine', label: 'Белое вино' },
                    { id: 'red-wine', label: 'Красное вино' },
                    { id: 'champagne', label: 'Шампанское' },
                    { id: 'non-alcoholic', label: 'Безалкогольные напитки' }
                  ].map((drink) => (
                    <div key={drink.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={drink.id}
                        checked={formData.drinks.includes(drink.id)}
                        onCheckedChange={() => handleDrinkToggle(drink.id)}
                      />
                      <label
                        htmlFor={drink.id}
                        className="text-sm font-light cursor-pointer select-none"
                      >
                        {drink.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Пожелания и комментарии
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Ваше сообщение..."
                  rows={4}
                  className="bg-background/50 border-accent/40 focus:border-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-light tracking-wider transition-all hover:shadow-lg"
              >
                Подтвердить присутствие
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-16 bg-background border-t border-accent/20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Icon name="Heart" size={40} className="mx-auto text-primary/60 animate-float" />
          </div>
          <p className="text-xl md:text-2xl font-serif font-light text-primary mb-4 italic">
            С любовью ждем вас на нашем празднике
          </p>
          <div className="h-px w-32 bg-primary/20 mx-auto mb-6"></div>
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            По всем вопросам: +7 (999) 123-45-67
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;