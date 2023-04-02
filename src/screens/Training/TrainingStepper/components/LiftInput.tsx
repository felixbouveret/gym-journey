import { Input, Text } from 'native-base';

const LiftInput = ({
  placeholder,
  value,
  name,
  onChange,
  onEndEditing
}: {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  onEndEditing?: (e: any) => void;
}) => {
  return (
    <Input
      flex="1"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onEndEditing={onEndEditing}
      backgroundColor={'white'}
      size={'lg'}
      selectTextOnFocus
      keyboardType="decimal-pad"
      InputRightElement={
        <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
          {name}
        </Text>
      }
    />
  );
};

export default LiftInput;
