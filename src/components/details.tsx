import {FC} from 'react';
import {Sunrise, Sunset} from 'lucide-react';
import {format} from 'date-fns';

import {WeatherData} from '@/api/types.ts';
import {Card, CardContent} from '@/components/ui/card.tsx';

interface DetailsProps {
  data: WeatherData;
}

const Details: FC<DetailsProps> = ({data}) => {
  const {sys} = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="flex gap-4 mt-6">
      {details.map((detail) => {
        return (
          <Card
            key={detail.title}
            className="w-[75px] h-[75px] flex items-center justify-start "
          >
            <CardContent className="p-0">
              <div className="flex gap-3 rounded-lg pl-2">
                <detail.icon className={`h-7 w-7 ${detail.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Details;
