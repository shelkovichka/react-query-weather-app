import {FC, useState, useEffect} from 'react';
import {Clock, Loader2, Search, XCircle} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useLocationSearch} from '@/hooks/use-weather.ts';
import {useSearchHistory} from '@/hooks/use-search-history.ts';
import {useDebounce} from '@/hooks/use-debounce.ts';

const CitySearch: FC = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const debouncedValue = useDebounce(inputValue, 300);
  const {data: locations, isLoading} = useLocationSearch(query);
  const {history, clearHistory, addToHistory} = useSearchHistory();

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue]);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split('|');

    addToHistory.mutate({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      query,
      name,
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const renderLoading = () => (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );

  const showSearchResults = query.length >= 3;

  return (
    <div>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground
                  sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          {showSearchResults && !isLoading && locations?.length === 0 && (
            <CommandEmpty>No Cities found.</CommandEmpty>
          )}

          {showSearchResults && isLoading && renderLoading()}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 my-2">
                  <p className="text-xs text-muted-foreground">Recent Search</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {history.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat}|${item.lon}|${item.name}|
                           ${item.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{item.name},</span>
                    <span className="text-sm text-muted-foreground">
                      {item.country}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {format(item.searchedAt, 'MMM d, h:mm a')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && renderLoading()}
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|
                         ${location.country}`}
                  onSelect={handleSelect}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{location.name}, </span>
                  <span className="text-sm text-muted-foreground">
                    {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default CitySearch;
