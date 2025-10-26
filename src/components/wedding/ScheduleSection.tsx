import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ScheduleSection = () => {
  const schedule = [
    { time: '16:00', event: 'Церемония бракосочетания', icon: 'Heart' },
    { time: '17:30', event: 'Фуршет и поздравления', icon: 'Wine' },
    { time: '19:00', event: 'Праздничный ужин', icon: 'UtensilsCrossed' },
    { time: '21:00', event: 'Первый танец молодоженов', icon: 'Music' },
    { time: '22:00', event: 'Развлекательная программа', icon: 'Sparkles' }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12 font-light">
          Программа праздника
        </h2>
        
        <div className="space-y-6">
          {schedule.map((item, index) => (
            <Card 
              key={index} 
              className="p-6 flex items-center gap-6 hover:shadow-lg transition-shadow animate-fade-in border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={item.icon as any} size={28} className="text-primary" />
              </div>
              <div className="flex-grow">
                <div className="text-2xl font-light text-primary mb-1">{item.time}</div>
                <div className="text-lg text-foreground">{item.event}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
