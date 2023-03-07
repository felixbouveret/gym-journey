import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Pressable } from 'native-base';

interface ExerciceContainerProps {
  children: React.ReactNode;
  small?: boolean;
  onOptions?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function ExerciceContainer({
  onOptions,
  onPress,
  onLongPress,
  children,
  small
}: ExerciceContainerProps) {
  return (
    <Pressable onLongPress={() => onLongPress?.()} onPress={() => onPress?.()}>
      <HStack
        space="4"
        p={small ? 2 : 4}
        px={2}
        pl={onLongPress ? 2 : 4}
        pr={onOptions ? 2 : 4}
        flex="1"
        backgroundColor={'white'}
        rounded={8}
        w="full"
        alignItems={'center'}
      >
        {onLongPress && <Box w={1} h="100%" backgroundColor={'gray.100'} rounded="full" />}

        <Box flex="1">{children}</Box>
        {!!onOptions && (
          <IconButton
            size="sm"
            p={1}
            onPress={() => onOptions()}
            _icon={{
              as: Ionicons,
              color: 'gray.700',
              name: 'ellipsis-vertical'
            }}
          />
        )}
      </HStack>
    </Pressable>
  );
}
