import { Button, Checkbox, FormControl, HStack, Input, Text, VStack } from 'native-base';

interface SupersetFormData {
  name: string;
  isUnilateral: boolean;
  weight: string;
  reps: string;
}

interface SupersetProps {
  sets: string;
  restTime: string;
  data: SupersetFormData[] | [];
  onDataChange: (index: number, data: SupersetFormData) => void;
  onSetsChange: (sets: string) => void;
  onRestTimeChange: (restTime: string) => void;
}

export default function SuperSet(props: SupersetProps) {
  const setSingleFormData = (index: number, key: string, value: string | boolean) => {
    const updatedSet = { ...props.data[index], [key]: value };
    props.onDataChange(index, updatedSet);
  };

  return (
    <VStack flex={1} w="full" space="4">
      <HStack space={2}>
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
            Repos
          </FormControl.Label>
          <Input
            size={'xl'}
            value={props.restTime}
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
      {props.data.map((set, index) => (
        <VStack key={index} space="2" backgroundColor={'gray.100'} p="2" rounded={8}>
          <FormControl>
            <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
              Exercice {index + 1}
            </FormControl.Label>
            <Input
              backgroundColor={'white'}
              size={'xl'}
              value={set.name}
              onChangeText={(e) => setSingleFormData(index, 'name', e)}
            />
          </FormControl>
          <Checkbox
            value="isUnilateral"
            isChecked={set.isUnilateral}
            onChange={(e) => setSingleFormData(index, 'isUnilateral', e)}
          >
            Exercice unilatéral
          </Checkbox>
          <HStack space={2}>
            <FormControl flex={1}>
              <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                Répétitions
              </FormControl.Label>
              <Input
                backgroundColor={'white'}
                size={'xl'}
                value={set.reps}
                keyboardType="decimal-pad"
                onChangeText={(e) => setSingleFormData(index, 'reps', e)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                Charge
              </FormControl.Label>
              <Input
                backgroundColor={'white'}
                size={'xl'}
                value={set.weight}
                keyboardType="decimal-pad"
                onChangeText={(e) => setSingleFormData(index, 'weight', e)}
                InputRightElement={
                  <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
                    kg
                  </Text>
                }
              />
            </FormControl>
          </HStack>
        </VStack>
      ))}
      <Button
        variant={'subtle'}
        onPress={() =>
          props.onDataChange(props.data.length, {
            name: '',
            isUnilateral: false,
            weight: '',
            reps: ''
          })
        }
      >
        Compléter le set
      </Button>
    </VStack>
  );
}
