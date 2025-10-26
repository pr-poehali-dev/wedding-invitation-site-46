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

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio();
    audioElement.src = 'https://ru-d3.drivemusic.me/dl/R55kFDrbzTDYXHy-q8sgoA/1761533897/download_music/2025/07/macan-amp-navai-neuzheli-jeto-vse-ljubov.mp3';
    audioElement.loop = true;
    audioElement.volume = 0.3;
    audioElement.preload = 'auto';
    audioElement.currentTime = 37;
    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 37;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error('Audio play failed:', err);
            toast({
              title: "Ошибка воспроизведения",
              description: "Не удалось воспроизвести музыку",
              variant: "destructive"
            });
          });
      }
    }
  };

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
    { time: '13:00', event: 'Церемония бракосочетания', icon: 'Heart' },
    { time: '15:30', event: 'Сбор гостей', icon: 'Users' },
    { time: '16:00', event: 'Банкет', icon: 'UtensilsCrossed' },
    { time: '00:00', event: 'Окончание вечера', icon: 'Moon' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary transition-all hover:scale-110"
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        <Icon name={isPlaying ? 'Volume2' : 'VolumeX'} size={24} className="text-primary-foreground" />
      </button>
      
      <section 
        className="relative min-h-screen flex items-start justify-center bg-cover bg-center bg-no-repeat pt-4 md:pt-6"
        style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/projects/fa5d2723-1c80-43cf-b863-841e187d3b22/files/cafb2357-2b72-452e-b457-6e6791f964af.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-4 animate-float">
            <Icon name="Heart" size={56} className="mx-auto text-primary" />
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-light text-primary mb-64 md:mb-72 tracking-wider text-center">Ксения & Владимир</h1>
          <div className="h-px w-32 bg-primary/40 mx-auto mb-8"></div>
          <p className="text-2xl md:text-3xl text-foreground font-light tracking-[0.3em]">
            15 • 07 • 2025
          </p>
          <p className="mt-8 text-xl md:text-2xl text-muted-foreground font-light italic">
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

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-2xl mx-auto px-4 text-center animate-fade-in">
          <p className="text-xl md:text-2xl font-serif text-primary leading-snug font-light">
            Дорогие гости!<br/>
            Приглашаем вас разделить с нами радость особенного<br className="hidden md:block"/> для нас события и стать частью нашей семейной истории
          </p>
          
          <div className="mt-12 max-w-md mx-auto">
            <h3 className="text-2xl font-serif text-primary mb-6 font-light">Ноябрь 2025</h3>
            <div className="grid grid-cols-7 gap-2">
              <div className="text-sm font-light text-muted-foreground py-2">Пн</div>
              <div className="text-sm font-light text-muted-foreground py-2">Вт</div>
              <div className="text-sm font-light text-muted-foreground py-2">Ср</div>
              <div className="text-sm font-light text-muted-foreground py-2">Чт</div>
              <div className="text-sm font-light text-muted-foreground py-2">Пт</div>
              <div className="text-sm font-light text-muted-foreground py-2">Сб</div>
              <div className="text-sm font-light text-muted-foreground py-2">Вс</div>
              
              <div className="text-sm font-light text-foreground py-2"></div>
              <div className="text-sm font-light text-foreground py-2"></div>
              <div className="text-sm font-light text-foreground py-2"></div>
              <div className="text-sm font-light text-foreground py-2"></div>
              <div className="text-sm font-light text-foreground py-2"></div>
              <div className="text-sm font-light text-foreground py-2">1</div>
              <div className="text-sm font-light text-foreground py-2">2</div>
              
              <div className="text-sm font-light text-foreground py-2">3</div>
              <div className="text-sm font-light text-foreground py-2">4</div>
              <div className="text-sm font-light text-foreground py-2">5</div>
              <div className="text-sm font-light text-foreground py-2">6</div>
              <div className="text-sm font-light text-foreground py-2">7</div>
              <div className="text-sm font-light text-foreground py-2">8</div>
              <div className="text-sm font-light text-foreground py-2">9</div>
              
              <div className="text-sm font-light text-foreground py-2">10</div>
              <div className="text-sm font-light text-foreground py-2">11</div>
              <div className="text-sm font-light text-foreground py-2">12</div>
              <div className="text-sm font-light text-foreground py-2">13</div>
              <div className="text-sm font-light text-foreground py-2">14</div>
              <div className="text-sm font-light text-foreground py-2">15</div>
              <div className="text-sm font-light text-foreground py-2">16</div>
              
              <div className="text-sm font-light text-foreground py-2">17</div>
              <div className="text-sm font-light text-foreground py-2">18</div>
              <div className="text-sm font-light text-foreground py-2">19</div>
              <div className="text-sm font-light text-foreground py-2">20</div>
              <div className="text-sm font-light text-foreground py-2">21</div>
              <div className="text-sm font-light text-foreground py-2">22</div>
              <div className="text-sm font-light text-foreground py-2">23</div>
              
              <div className="text-sm font-light text-foreground py-2">24</div>
              <div className="text-sm font-light text-foreground py-2">25</div>
              <div className="text-sm font-light text-foreground py-2">26</div>
              <div className="text-sm font-light text-foreground py-2">27</div>
              <div className="relative text-sm font-light py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Heart" size={40} className="text-pink-300/60 fill-pink-300/50" />
                </div>
                <span className="relative z-10 text-foreground font-medium">28</span>
              </div>
              <div className="text-sm font-light text-foreground py-2">29</div>
              <div className="text-sm font-light text-foreground py-2">30</div>
            </div>
          </div>
        </div>
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
            className="w-full h-[600px] md:h-[700px] object-cover object-center"
            style={{ objectPosition: '55% center' }}
          />
          
          <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl px-4">
              <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/10 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-3">
                  <Icon name="Calendar" size={32} className="mx-auto text-white" />
                </div>
                <h3 className="text-lg font-serif mb-1 text-white">Дата</h3>
                <p className="text-base font-light text-white/95">
                  15 июля 2025 года
                </p>
              </div>
              
              <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/10 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-3">
                  <Icon name="Clock" size={32} className="mx-auto text-white" />
                </div>
                <h3 className="text-lg font-serif mb-1 text-white">Время</h3>
                <p className="text-base font-light text-white/95">
                  Начало в 16:00
                </p>
              </div>
              
              <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/10 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="mb-3">
                  <Icon name="MapPin" size={32} className="mx-auto text-white" />
                </div>
                <h3 className="text-lg font-serif mb-1 text-white">Место</h3>
                <p className="text-base font-light text-white/95">
                  Ресторан "Версаль"
                </p>
                <p className="text-sm text-white/75 mt-1 font-light">
                  г. Барнаул<br/>ул. Интернациональная, 116
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center py-12 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          <a 
            href="https://yandex.ru/maps/?text=Барнаул, Интернациональная 116, Версаль" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-serif text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <Icon name="MapPin" size={24} />
            Как добраться
          </a>
        </div>
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

      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/10 via-background to-secondary/10">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <Icon name="Mail" size={48} className="mx-auto text-primary/70" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-primary font-light">
              Подтверждение присутствия
            </h2>
            <div className="h-px w-32 bg-primary/30 mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
              Будем рады видеть вас на нашем празднике.<br/>Пожалуйста, заполните форму ниже
            </p>
          </div>
          
          <Card className="p-10 md:p-16 bg-card shadow-2xl border-primary/10 animate-fade-in overflow-hidden relative" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center gap-2 text-base font-light text-foreground mb-3 tracking-wide">
                    <Icon name="User" size={18} className="text-primary" />
                    Ваше имя *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Иван Иванов"
                    className="bg-background/70 border-primary/20 focus:border-primary h-12 text-base"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-base font-light text-foreground mb-3 tracking-wide">
                    <Icon name="Users" size={18} className="text-primary" />
                    Количество гостей *
                  </label>
                  <Input
                    required
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    placeholder="1"
                    className="bg-background/70 border-primary/20 focus:border-primary h-12 text-base"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-base font-light text-foreground mb-4 tracking-wide">
                  <Icon name="Wine" size={18} className="text-primary" />
                  Ваши предпочтения по напиткам
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'spirits', label: 'Крепкий алкоголь', icon: 'Wine' },
                    { id: 'white-wine', label: 'Белое вино', icon: 'Wine' },
                    { id: 'red-wine', label: 'Красное вино', icon: 'Wine' },
                    { id: 'champagne', label: 'Шампанское', icon: 'Sparkles' },
                    { id: 'non-alcoholic', label: 'Безалкогольные', icon: 'Coffee' }
                  ].map((drink) => (
                    <div key={drink.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                      <Checkbox
                        id={drink.id}
                        checked={formData.drinks.includes(drink.id)}
                        onCheckedChange={() => handleDrinkToggle(drink.id)}
                        className="border-primary/30"
                      />
                      <label
                        htmlFor={drink.id}
                        className="text-base font-light cursor-pointer select-none flex-1"
                      >
                        {drink.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-base font-light text-foreground mb-3 tracking-wide">
                  <Icon name="MessageSquare" size={18} className="text-primary" />
                  Пожелания и комментарии
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Особые пожелания, пищевые ограничения или другие комментарии..."
                  rows={5}
                  className="bg-background/70 border-primary/20 focus:border-primary resize-none text-base"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-7 text-xl font-light tracking-wider transition-all hover:shadow-2xl hover:scale-[1.02] group"
              >
                <Icon name="Send" size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
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