import Icon from '@/components/ui/icon';

const FooterSection = () => {
  return (
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
  );
};

export default FooterSection;
