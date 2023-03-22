import { Box, Text, VStack } from 'native-base';

interface InfoBlockProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function InfoBlock({ title, description, children }: InfoBlockProps) {
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
        {children}
      </VStack>
    </Box>
  );
}
