import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Divider from '@/components/Divider';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/wedding/HeroSection';
import WelcomeSection from '@/components/wedding/WelcomeSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import ScheduleSection from '@/components/wedding/ScheduleSection';
import LocationSection from '@/components/wedding/LocationSection';
import RSVPSection from '@/components/wedding/RSVPSection';
import DressCodeSection from '@/components/wedding/DressCodeSection';

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
    audioElement.src = 'https://rus.hitmotop.com/get/music/20250718/Macan_Navai_-_Neuzheli_jeto_vse_lyubov_79311746.mp3';
    audioElement.loop = true;
    audioElement.volume = 0.3;
    audioElement.preload = 'auto';
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
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error('Audio play failed:', err);
            toast({
              title: "Ошибка воспроизведения",
              description: "Не удалось воспроизвести музыку. Проверьте соединение с интернетом.",
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

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary transition-all hover:scale-110"
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        <Icon name={isPlaying ? 'Volume2' : 'VolumeX'} size={24} className="text-primary-foreground" />
      </button>

      <HeroSection />
      <Divider />
      <WelcomeSection />
      <Divider />
      <CountdownSection timeLeft={timeLeft} />
      <Divider />
      <ScheduleSection />
      <Divider />
      <LocationSection />
      <Divider />
      <RSVPSection 
        formData={formData}
        onFormDataChange={setFormData}
        onDrinkToggle={handleDrinkToggle}
        onSubmit={handleSubmit}
      />
      <Divider />
      <DressCodeSection />
      <Divider />

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12 font-light">
            Контакты
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-primary/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="Heart" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-serif text-primary mb-4 text-center font-light">Анна</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 justify-center">
                  <Icon name="Phone" size={18} className="text-primary" />
                  <span className="text-muted-foreground">+7 (999) 123-45-67</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://t.me/username', '_blank')}
              >
                <Icon name="Send" size={18} className="mr-2" />
                Написать в Telegram
              </Button>
            </Card>
            
            <Card className="p-8 border-primary/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="Heart" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-serif text-primary mb-4 text-center font-light">Дмитрий</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 justify-center">
                  <Icon name="Phone" size={18} className="text-primary" />
                  <span className="text-muted-foreground">+7 (999) 765-43-21</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://t.me/username', '_blank')}
              >
                <Icon name="Send" size={18} className="mr-2" />
                Написать в Telegram
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-primary/5 border-t border-primary/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <Icon name="Heart" size={40} className="mx-auto text-primary animate-float" />
          </div>
          <p className="text-2xl font-serif text-primary mb-4 font-light">
            С любовью,<br/>Анна и Дмитрий
          </p>
          <p className="text-muted-foreground text-sm">
            15 июля 2025 года
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;
