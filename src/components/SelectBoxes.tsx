import { Button, HStack, Text, VStack } from 'native-base';
import { useState } from 'react';

interface SelectBoxesProps {
  options: { wording: string; value: string | number | boolean }[];
  onChange: (value: string | number | boolean) => void;
  label?: string;
}

export default function SelectBoxes({ options, label, onChange }: SelectBoxesProps) {
  const [selected, setSelected] = useState(options[0].value);

  const getVariant = (value: string | number | boolean) =>
    selected === value ? 'solid' : 'outline';

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
