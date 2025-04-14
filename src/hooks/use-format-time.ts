import {format} from 'date-fns';

export const useFormatTime = (timestamp: number) => {
  return format(new Date(timestamp * 1000), 'h:mm a');
};
