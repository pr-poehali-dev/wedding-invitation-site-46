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
        
        <Card className="overflow-hidden border-primary/20">
          <div className="aspect-video bg-muted relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac5c8ab3c9a5f3e7f8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute inset-0"
            ></iframe>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-serif text-primary mb-4 font-light">
              Ресторан "Панорама"
            </h3>
            <div className="space-y-3 text-muted-foreground mb-6">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span>г. Москва, ул. Красная площадь, д. 1</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span>+7 (495) 123-45-67</span>
              </div>
            </div>
            
            <Button 
              className="w-full md:w-auto"
              onClick={() => window.open('https://yandex.ru/maps', '_blank')}
            >
              <Icon name="Navigation" size={18} className="mr-2" />
              Построить маршрут
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LocationSection;
