import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Divider from '@/components/Divider';
import MusicButton from '@/components/wedding/MusicButton';
import HeroSection from '@/components/wedding/HeroSection';
import WelcomeSection from '@/components/wedding/WelcomeSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import ScheduleSection from '@/components/wedding/ScheduleSection';
import LocationSection from '@/components/wedding/LocationSection';
import RSVPSection from '@/components/wedding/RSVPSection';
import DressCodeSection from '@/components/wedding/DressCodeSection';
import ContactSection from '@/components/wedding/ContactSection';
import FooterSection from '@/components/wedding/FooterSection';

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

  return (
    <div className="min-h-screen bg-background">
      <MusicButton />
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
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default WeddingInvitation;
