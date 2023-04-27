import { Ionicons } from '@expo/vector-icons';
import { Button, HStack, IconButton, Pressable, Text, VStack } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';

import { ProgramSessionSimplified } from '@/types/Programs.types';

interface SessionBlockProps {
  session: ProgramSessionSimplified;
  onOptionsPress?: () => void;
  onEditPress?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  backgroundColor?: ColorType;
}

export default function SessionBlock({
  session,
  onOptionsPress,
  onEditPress,
  onPress,
  onLongPress,
  backgroundColor
}: SessionBlockProps) {
  // const exercice = (step: ProgramSessionStep) => {
  //   if (step.type === ExerciceType.SUPERSET)
  //     return (
  //       <VStack w="full" py={2}>
  //         <Text>Superset</Text>
  //         <VStack w="full" px={2} pr={0}>
  //           {step.map((e, index) => (
  //             <VStack space="2" key={index}>
  //               <HStack alignItems="center" justifyContent={'space-between'}>
  //                 <Text fontWeight="medium">
  //                   {exercices.find((exerciceItem) => exerciceItem.id === e.exerciceId)?.name}
  //                 </Text>
  //                 <Text fontSize={'md'} color="gray.500">
  //                   {step.setNumber} x {e.reps} @ {e.weight} kg
  //                 </Text>
  //               </HStack>
  //             </VStack>
  //           ))}
  //         </VStack>
  //       </VStack>
  //     );
  //   return step.exercices.map((e, index) => (
  //     <VStack flex="1" space="2" key={index}>
  //       <HStack alignItems="center" justifyContent={'space-between'}>
  //         <Text fontWeight="medium">
  //           {exercices.find((exerciceItem) => exerciceItem.id === e.exerciceId)?.name}
  //         </Text>
  //         <Text color={'gray.500'} fontSize={'md'}>
  //           {step.setNumber} x {e.reps} @ {e.weight} kg
  //         </Text>
  //       </HStack>
  //     </VStack>
  //   ));
  // };

  return (
    <Pressable w="full" onPress={onPress} onLongPress={onLongPress}>
      <VStack
        w="full"
        backgroundColor={backgroundColor || 'white'}
        rounded={8}
        overflow="hidden"
        p={4}
        space="4"
      >
        <VStack w="full" space="2">
          <HStack justifyContent={'space-between'}>
            <HStack space={2} justifyContent={'space-between'}>
              <Text fontSize={'xl'} fontWeight="medium">
                {session.name}
              </Text>
            </HStack>
            {onOptionsPress && (
              <IconButton
                size="sm"
                p={1}
                onPress={onOptionsPress}
                _icon={{
                  as: Ionicons,
                  color: 'gray.700',
                  name: 'ellipsis-horizontal'
                }}
              />
            )}
          </HStack>
          <VStack>
            {session.program_session_details.length ? (
              session.program_session_details.map((step, sIndex) => (
                <HStack justifyContent={'space-between'} key={sIndex}>
                  <Text>{step.exercice_name}</Text>
                </HStack>
              ))
            ) : (
              <Text fontSize={'md'} color="gray.500">
                Pas encore d'exercice
              </Text>
            )}
          </VStack>
        </VStack>
        {onEditPress && (
          <Button variant={'outline'} onPress={onEditPress}>
            Éditer la séance
          </Button>
        )}
      </VStack>
    </Pressable>
  );
}
