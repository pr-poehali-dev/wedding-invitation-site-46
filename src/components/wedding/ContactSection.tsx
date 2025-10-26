import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
