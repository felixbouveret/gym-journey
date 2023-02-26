import { Button, HStack, Text, VStack } from 'native-base';
import { useState } from 'react';

interface SelectBoxesProps<T> {
  options: { wording: string; value: T }[];
  selectedValue: T;
  onChange: (value: T) => void;
  label?: string;
}

export default function SelectBoxes<T>({
  options,
  label,
  selectedValue,
  onChange
}: SelectBoxesProps<T>) {
  const [selected, setSelected] = useState<T>(selectedValue);

  const getVariant = (value: T) => (selected === value ? 'solid' : 'outline');

  return (
    <VStack space="1">
      {label && (
        <Text fontWeight={'bold'} color="gray.700">
          {label}
        </Text>
      )}
      <HStack justifyContent={'space-between'} space="2">
        {options.map(({ value, wording }, index) => (
          <Button
            flex="1"
            onPress={() => {
              setSelected(value);
              onChange(value);
            }}
            key={index}
            variant={getVariant(value)}
          >
            {wording}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
