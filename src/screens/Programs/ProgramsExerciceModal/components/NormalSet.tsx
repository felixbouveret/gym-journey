import { Checkbox, FormControl, HStack, Input, Text, VStack } from 'native-base';

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
    <VStack flex={1} w="full" space="2" mt={2}>
      <Input
        size={'xl'}
        placeholder="Nom de l'exercice"
        value={props.data[0].name}
        onChangeText={(e) => setSingleFormData('name', e)}
      />
      <Checkbox
        value="isUnilateral"
        isChecked={props.data[0].isUnilateral}
        onChange={(e) => setSingleFormData('isUnilateral', e)}
      >
        Exercice unilatéral
      </Checkbox>
      <HStack space={2}>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Tempo
          </FormControl.Label>
          <Input size={'xl'} keyboardType="decimal-pad" placeholder="1012" />
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Repos
          </FormControl.Label>
          <Input
            size={'xl'}
            value={props.restTime}
            placeholder="3"
            keyboardType="decimal-pad"
            onChangeText={props.onRestTimeChange}
            InputRightElement={
              <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
                min
              </Text>
            }
          />
        </FormControl>
      </HStack>
      <HStack space={2}>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Séries
          </FormControl.Label>
          <Input
            size={'xl'}
            value={props.sets}
            placeholder="3"
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
            placeholder="12"
            value={props.data[0].reps}
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('reps', e)}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
            Charge
          </FormControl.Label>
          <Input
            size={'xl'}
            value={props.data[0].weight}
            placeholder="28"
            keyboardType="decimal-pad"
            onChangeText={(e) => setSingleFormData('weight', e)}
            InputRightElement={
              <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
                kg
              </Text>
            }
          />
        </FormControl>
      </HStack>
    </VStack>
  );
}
