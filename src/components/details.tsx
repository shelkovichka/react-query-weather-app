import {FC} from 'react';
import {Sunrise, Sunset} from 'lucide-react';

import {useFormatTime} from '@/hooks/use-format-time';
import {WeatherData} from '@/api/types.ts';
import {Card, CardContent} from '@/components/ui/card.tsx';

interface DetailsProps {
  data: WeatherData;
}

const Details: FC<DetailsProps> = ({data}) => {
  const {sys} = data;

  const details = [
    {
      title: 'Sunrise',
      value: useFormatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: useFormatTime(sys.sunset),
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
