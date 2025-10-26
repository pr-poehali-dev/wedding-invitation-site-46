import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const DressCodeSection = () => {
  return (
    <section className="py-12 md:py-16 bg-accent/30">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12 font-light">
          Дресс-код
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 text-center border-primary/20">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="User" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-4 font-light">Для мужчин</h3>
            <p className="text-muted-foreground leading-relaxed">
              Классический костюм темных оттенков с галстуком или бабочкой
            </p>
          </Card>
          
          <Card className="p-8 text-center border-primary/20">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="User" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-4 font-light">Для женщин</h3>
            <p className="text-muted-foreground leading-relaxed">
              Вечернее платье пастельных тонов или оттенков драгоценных камней
            </p>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground font-light italic">
            Просьба избегать белого цвета в одежде
          </p>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
