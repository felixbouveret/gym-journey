import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Badge, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ExerciceContainer from '@/components/ExerciceContainer';
import InfoBlock from '@/components/InfoBlock';
import { HistoryScreenProps } from '@/navigation/navigators/HistoryNavigator';
import { RootState } from '@/store';
import { removeTraining, TrainingStateEnum } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

export default function HistoryList({ navigation }: HistoryScreenProps<'HistoryList'>) {
  const dispatch = useDispatch();
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const { programs } = useSelector((state: RootState) => state.programs);

  const getProgramName = (id: UID_V4) => programs.find((item) => item.id === id)?.name;

  const getIconState = (
    state: TrainingStateEnum
  ): {
    name: 'checkmark-circle-outline' | 'alert-circle-outline';
    colorScheme: string;
    color: string;
  } => {
    switch (state) {
      case TrainingStateEnum.FINISHED:
        return { name: 'checkmark-circle-outline', colorScheme: 'success', color: 'green.1000' };
      default:
        return { name: 'alert-circle-outline', colorScheme: 'danger', color: 'danger.1000' };
    }
  };

  const onOptions = (id: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Voir', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('HistorySingle', { id });
        if (buttonIndex === 2) return dispatch(removeTraining(id));
      }
    );

  const trainingsList = trainings?.map((item, index) => (
    <ExerciceContainer key={index} small onOptions={() => onOptions(item.id)}>
      <HStack alignItems="center" justifyContent={'space-between'}>
        <VStack>
          <Text fontSize={'xs'} fontWeight="medium">
            {format(new Date(item.startedAt), 'dd/MM/yyyy')}
          </Text>
          <Text fontSize={'xs'} fontWeight="medium">
            {getProgramName(item.programId)}
          </Text>
          <Text fontSize={'md'} fontWeight="medium">
            {item.sessionName}
          </Text>
        </VStack>

        <Badge p={1} colorScheme={getIconState(item.state).colorScheme} borderRadius="6">
          <Icon
            p={0}
            as={<Ionicons name={getIconState(item.state).name} />}
            colorScheme={getIconState(item.state).color}
          />
        </Badge>
      </HStack>
    </ExerciceContainer>
  ));

  return (
    <VStack h="full" justifyContent={trainings?.length ? '' : 'flex-end'}>
      <ScrollView w="full" h="full">
        <VStack h="full" space={2} p="4">
          {!!trainings?.length && trainingsList}
        </VStack>
      </ScrollView>
      <VStack p="4" pt={0} space={4}>
        {trainings?.length === 0 && (
          <InfoBlock
            title="Pas de séances enregistrées"
            description="Commencez une séance pour enregistrer votre progression"
          />
        )}
      </VStack>
    </VStack>
  );
}
