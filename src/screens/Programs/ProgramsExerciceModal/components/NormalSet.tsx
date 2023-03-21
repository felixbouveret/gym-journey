import { Checkbox, FormControl, HStack, Input, VStack } from 'native-base';

interface NormalSetFormData {
  name: string;
  isUnilateral: boolean;
  weight: string;
  reps: string;
}

interface NormalSetProps {
  sets: string;
  restTime: string;
  data: NormalSetFormData[] | [];
  onDataChange: (index: number, data: NormalSetFormData) => void;
  onSetsChange: (sets: string) => void;
  onRestTimeChange: (restTime: string) => void;
}

export default function NormalSet(props: NormalSetProps) {
  const setSingleFormData = (key: string, value: string | boolean) => {
    const updatedSet = { ...props.data[0], [key]: value };
    props.onDataChange(0, updatedSet);
  };

  return (
    <VStack flex={1} w="full" space="4">
      <FormControl>
        <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
          Nom de l'exercice
        </FormControl.Label>
        <Input
          size={'xl'}
          value={props.data[0].name}
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
            value={props.sets}
            keyboardType="decimal-pad"
            onChangeText={props.onSetsChange}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Répétitions
          </FormControl.Label>
          <Input
            size={'xl'}
            value={props.data[0].reps}
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
            value={props.data[0].weight}
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
            value={props.restTime}
            keyboardType="decimal-pad"
            onChangeText={props.onRestTimeChange}
          />
        </FormControl>
      </HStack>
      <Checkbox
        value="isUnilateral"
        isChecked={props.data[0].isUnilateral}
        onChange={(e) => setSingleFormData('isUnilateral', e)}
      >
        Exercice unilatéral
      </Checkbox>
    </VStack>
  );
}
