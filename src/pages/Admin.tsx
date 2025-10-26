import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RSVPResponse {
  id: number;
  name: string;
  guests_count: number;
  attendance: string;
  dietary_restrictions: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [rsvps, setRsvps] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/31bff099-c6af-4bd8-9c86-f32d00c82ff5');
      const data = await response.json();
      setRsvps(data.rsvps);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.guests_count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 font-light">
            Ответы гостей
          </h1>
          <div className="h-px w-32 bg-rose-300 mx-auto mb-6"></div>
          <div className="flex gap-8 justify-center text-rose-700">
            <div>
              <div className="text-3xl font-serif mb-1">{total}</div>
              <div className="text-sm">Ответов</div>
            </div>
            <div>
              <div className="text-3xl font-serif mb-1">{totalGuests}</div>
              <div className="text-sm">Гостей</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
          </div>
        ) : rsvps.length === 0 ? (
          <Card className="p-12 text-center bg-white animate-scale-in">
            <Icon name="Inbox" size={48} className="mx-auto text-rose-300 mb-4" />
            <p className="text-rose-700">Пока нет ответов от гостей</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {rsvps.map((rsvp, index) => (
              <Card 
                key={rsvp.id} 
                className="p-6 bg-white shadow-lg border-rose-100 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-rose-900 mb-1">{rsvp.name}</h3>
                    <p className="text-sm text-rose-600">
                      {new Date(rsvp.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full transition-smooth">
                    <Icon name="Users" size={18} className="text-rose-600" />
                    <span className="font-medium text-rose-900">{rsvp.guests_count}</span>
                  </div>
                </div>

                {rsvp.dietary_restrictions && (
                  <div className="mb-3 flex items-start gap-2 transition-smooth">
                    <Icon name="UtensilsCrossed" size={18} className="text-rose-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-rose-600 mb-1">Предпочтения:</div>
                      <div className="text-rose-900">{rsvp.dietary_restrictions}</div>
                    </div>
                  </div>
                )}

                {rsvp.message && (
                  <div className="flex items-start gap-2 bg-rose-50 p-4 rounded-lg transition-smooth">
                    <Icon name="MessageCircle" size={18} className="text-rose-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-rose-600 mb-1">Сообщение:</div>
                      <div className="text-rose-900">{rsvp.message}</div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;