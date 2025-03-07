import { FormEvent, useEffect, useState } from 'react';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';
import { useFilterCharacters } from '@/features/characters/hooks/useFilterCharacters.tsx';

export default function SelectCorrespondent({
  onSelect,
}: {
  onSelect: (id: number, name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [correspondent, setCorrespondent] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const { filterCharacters, characters } = useFilterCharacters();

  useEffect(() => {
    filterCharacters(inputValue);
  }, [inputValue]);

  const onCorrespondentSelect = (id: number, name: string) => {
    setCorrespondent({ id, name });
    onSelect(id, name);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          {correspondent ? correspondent.name : 'Select correspondent'}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandInput
            placeholder="Search correspondent..."
            onInput={(event: FormEvent<HTMLInputElement>) =>
              setInputValue(event.currentTarget.value)
            }
          />
          <CommandList>
            <CommandEmpty>No correspondent found.</CommandEmpty>
            <CommandGroup>
              {characters?.results.map(({ name, id }) => (
                <CommandItem
                  key={id}
                  value={id}
                  onSelect={() => onCorrespondentSelect(id, name)}
                >
                  {name}
                  <Check
                    className={cn(
                      'ml-auto',
                      correspondent?.id == id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
