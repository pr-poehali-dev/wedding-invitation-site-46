import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const MusicButton = () => {
  const { toast } = useToast();
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

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary transition-all hover:scale-110"
      aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
    >
      <Icon name={isPlaying ? 'Volume2' : 'VolumeX'} size={24} className="text-primary-foreground" />
    </button>
  );
};

export default MusicButton;
