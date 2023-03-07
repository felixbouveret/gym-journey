import { Box, Text, VStack } from 'native-base';

interface InfoBlockProps {
  title?: string;
  description?: string;
}

export default function InfoBlock({ title, description }: InfoBlockProps) {
  return (
    <Box
      rounded={8}
      p={4}
      backgroundColor="gray.200"
      borderColor={'gray.400'}
      borderStyle="dashed"
      borderWidth={2}
    >
      <VStack space={1}>
        {!!title && (
          <Text color={'gray.500'} fontSize="xl">
            {title}
          </Text>
        )}
        {!!description && <Text color={'gray.500'}>{description}</Text>}
      </VStack>
    </Box>
  );
}
