import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface RSVPSectionProps {
  formData: {
    name: string;
    guests: string;
    message: string;
    drinks: string[];
  };
  onFormDataChange: (data: any) => void;
  onDrinkToggle: (drink: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RSVPSection = ({ formData, onFormDataChange, onDrinkToggle, onSubmit }: RSVPSectionProps) => {
  const drinkOptions = [
    { id: 'wine', label: 'Вино', icon: 'Wine' },
    { id: 'champagne', label: 'Шампанское', icon: 'Sparkles' },
    { id: 'whiskey', label: 'Виски', icon: 'Glass' },
    { id: 'vodka', label: 'Водка', icon: 'Glass' },
    { id: 'cognac', label: 'Коньяк', icon: 'Wine' },
    { id: 'non-alcoholic', label: 'Безалкогольные', icon: 'Coffee' }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-2xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-4 font-light">
          Подтверждение присутствия
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Пожалуйста, подтвердите ваше участие до 1 ноября 2025
        </p>
        
        <Card className="p-8 border-primary/20">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Ваше имя <span className="text-destructive">*</span>
              </label>
              <Input
                required
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                className="border-primary/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Количество гостей <span className="text-destructive">*</span>
              </label>
              <Input
                required
                type="number"
                min="1"
                placeholder="Укажите количество"
                value={formData.guests}
                onChange={(e) => onFormDataChange({ ...formData, guests: e.target.value })}
                className="border-primary/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3 text-foreground">
                Предпочтения по напиткам
              </label>
              <div className="grid grid-cols-2 gap-4">
                {drinkOptions.map((drink) => (
                  <div key={drink.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={drink.id}
                      checked={formData.drinks.includes(drink.id)}
                      onCheckedChange={() => onDrinkToggle(drink.id)}
                    />
                    <label
                      htmlFor={drink.id}
                      className="text-sm font-light cursor-pointer flex items-center gap-2"
                    >
                      <Icon name={drink.icon as any} size={16} className="text-primary" />
                      {drink.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Пожелания и комментарии
              </label>
              <Textarea
                placeholder="Ваше сообщение молодоженам"
                value={formData.message}
                onChange={(e) => onFormDataChange({ ...formData, message: e.target.value })}
                rows={4}
                className="border-primary/20"
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              <Icon name="Heart" size={18} className="mr-2" />
              Подтвердить участие
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;