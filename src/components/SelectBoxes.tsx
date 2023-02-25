import { Button, HStack, Text, VStack } from 'native-base';
import { useState } from 'react';

interface SelectBoxesProps<T> {
  options: { wording: string; value: T }[];
  onChange: (value: T) => void;
  label?: string;
}

export default function SelectBoxes<T>({ options, label, onChange }: SelectBoxesProps<T>) {
  const [selected, setSelected] = useState<T>(options[0].value);

  const getVariant = (value: T) => (selected === value ? 'solid' : 'outline');

  return (
    <VStack space="1">
      {label && (
        <Text fontWeight={'bold'} color="gray.700">
          {label}
        </Text>
      )}
      <HStack justifyContent={'space-between'} space="2">
        {options.map(({ value, wording }) => (
          <Button
            flex="1"
            onPress={() => {
              setSelected(value);
              onChange(value);
            }}
            variant={getVariant(value)}
          >
            {wording}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
