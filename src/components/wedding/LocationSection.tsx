import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const LocationSection = () => {
  return (
    <section className="py-12 md:py-16 bg-accent/30">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12 font-light">
          Место проведения
        </h2>
        
        <Card className="p-8 border-primary/20">
          <div className="flex items-start gap-3 mb-6">
            <Icon name="MapPin" size={24} className="mt-1 flex-shrink-0 text-primary" />
            <div>
              <h3 className="text-2xl font-serif text-primary mb-2 font-light">
                Ресторан "Панорама"
              </h3>
              <p className="text-muted-foreground">
                г. Москва, ул. Красная площадь, д. 1
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Clock" size={24} className="flex-shrink-0 text-primary" />
            <div>
              <p className="text-muted-foreground">
                Начало торжества: 16:00
              </p>
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => window.open('https://yandex.ru/maps', '_blank')}
          >
            <Icon name="Navigation" size={18} className="mr-2" />
            Построить маршрут
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default LocationSection;