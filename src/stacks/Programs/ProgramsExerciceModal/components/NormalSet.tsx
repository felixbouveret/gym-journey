import { Checkbox, FormControl, HStack, Input, VStack } from 'native-base';
import { useEffect, useState } from 'react';

interface NormalSetFormData {
  name: string;
  isUnilateral: boolean;
  weight: string;
  reps: string;
  sets: string;
  restTime: string;
}

interface NormalSetProps {
  data: NormalSetFormData | null;
  onChange: (data: NormalSetFormData) => void;
}

export default function NormalSet({ data, onChange }: NormalSetProps) {
  const [formData, setFormData] = useState<NormalSetFormData>({
    name: data?.name || '',
    isUnilateral: data?.isUnilateral || false,
    weight: data?.weight || '',
    reps: data?.reps || '',
    sets: data?.sets || '',
    restTime: data?.restTime || ''
  });

  const setSingleFormData = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(formData)) setFormData(data);
  }, [data]);

  return (
    <VStack flex={1} w="full" space="4">
      <FormControl>
        <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
          Nom de l'exercice
        </FormControl.Label>
        <Input
          size={'xl'}
          value={formData.name}
          onChangeText={(e) => setSingleFormData('name', e)}
        />
      </FormControl>
      <HStack space={4}>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Séries
          </FormControl.Label>
          <Input
            size={'xl'}
            value={formData.sets}
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('sets', e)}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Répétitions
          </FormControl.Label>
          <Input
            size={'xl'}
            value={formData.reps}
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('reps', e)}
          />
        </FormControl>
      </HStack>
      <HStack space={4}>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Charge (kg)
          </FormControl.Label>
          <Input
            size={'xl'}
            value={formData.weight}
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('weight', e)}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Repos (m)
          </FormControl.Label>
          <Input
            size={'xl'}
            value={formData.restTime}
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('restTime', e)}
          />
        </FormControl>
      </HStack>
      <Checkbox
        value="isUnilateral"
        isChecked={formData.isUnilateral}
        onChange={(e) => setSingleFormData('isUnilateral', e)}
      >
        Exercice unilatéral
      </Checkbox>
    </VStack>
  );
}
