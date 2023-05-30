import { Ionicons } from '@expo/vector-icons';
import { addDays, format, isAfter } from 'date-fns';
import { Badge, Box, HStack, Icon, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { ActionSheetIOS, TouchableOpacity } from 'react-native';
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
  LocaleConfig
} from 'react-native-calendars';
import { useSelector } from 'react-redux';

import useTraining from '@/hooks/useTraining';
import { RootState } from '@/store';
import { Training, TrainingStateEnum } from '@/store/Training';

import FrLocales from './Locales';

LocaleConfig.locales.fr = FrLocales;

LocaleConfig.defaultLocale = 'fr';

const agendaInnerDateFormat = (date: Date) => format(new Date(date), 'yyyy-MM-dd');
const displayDateFormat = (date: Date) => format(new Date(date), 'dd/MM/yyyy HH:mm');

interface CustomAgendaEntry extends AgendaEntry {
  state: TrainingStateEnum;
  id: string;
  programId: string;
  startedAt: string;
}

const App = (props: {
  items: Training[];
  onReservationPress: (id: string) => void;
  onUnfinishedTrainingPress: (id: string) => void;
}) => {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { onTrainingFinished } = useTraining();

  const [items, setItems] = useState<AgendaSchedule>({});
  const [update, setUpdate] = useState(false);

  const getProgramName = (id: string) => programs.find((item) => item.id === id)?.name;

  const addTrainingDays = (days: AgendaSchedule): AgendaSchedule => {
    const newItems = { ...days };
    props.items.forEach((item) => {
      const date = agendaInnerDateFormat(new Date(item.startedAt));
      if (newItems[date]?.length)
        newItems[date].push({
          name: item.sessionName,
          height: 64,
          day: date,
          state: item.state,
          id: item.id,
          programId: item.programId,
          startedAt: item.startedAt
        });
      else
        newItems[date] = [
          {
            name: item.sessionName,
            height: 64,
            day: date,
            state: item.state,
            id: item.id,
            programId: item.programId,
            startedAt: item.startedAt
          }
        ];
    });

    return newItems;
  };

  const loadMonth = (day: DateData) => {
    let days = {};
    for (let i = -15; i < 85; i++) {
      const date = addDays(day.timestamp, i);
      if (isAfter(date, addDays(new Date(), 1))) break;
      days = {
        ...days,
        [agendaInnerDateFormat(addDays(day.timestamp, i))]: []
      };
    }

    const trainingDays = addTrainingDays(days);
    setItems(trainingDays);
  };

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

  const onTrainingPress = (id: string, state: TrainingStateEnum) => {
    if (state === TrainingStateEnum.FINISHED) props.onReservationPress(id);
    else
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Annuler', 'Marquer comme terminé', 'Reprendre'],
          cancelButtonIndex: 0
        },
        (buttonIndex) => {
          if (buttonIndex === 0) return;
          if (buttonIndex === 1) return onTrainingFinished(id, () => null);
          if (buttonIndex === 2)
            return async () => {
              await props.onUnfinishedTrainingPress(id);
              setUpdate(!update);
            };
        }
      );
  };

  const trainingBlock = (reservation: CustomAgendaEntry) => (
    <TouchableOpacity onPress={() => onTrainingPress(reservation.id, reservation.state)}>
      <HStack
        alignItems={'center'}
        borderRadius={8}
        flex={1}
        p={2}
        mt={4}
        mr={4}
        space={2}
        backgroundColor={'white'}
        h={reservation.height + 'px'}
      >
        <Box
          backgroundColor={'blue.100'}
          borderRadius={'full'}
          alignItems={'center'}
          justifyContent={'center'}
          w={'24px'}
          h={'24px'}
        >
          <Icon as={Ionicons} name="barbell" size={'xs'} color="blue.400" />
        </Box>
        <VStack flex={1}>
          <Text fontSize={'xs'}>{displayDateFormat(new Date(reservation.startedAt))}</Text>
          <Text>
            {getProgramName(reservation.programId)} - {reservation?.name}
          </Text>
        </VStack>
        <Badge p={1} colorScheme={getIconState(reservation.state).colorScheme} borderRadius="6">
          <Icon
            p={0}
            as={<Ionicons name={getIconState(reservation.state).name} />}
            colorScheme={getIconState(reservation.state).color}
          />
        </Badge>
      </HStack>
    </TouchableOpacity>
  );

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadMonth}
      renderItem={trainingBlock}
      showClosingKnob={true}
      maxDate={agendaInnerDateFormat(new Date())}
      initialDate={agendaInnerDateFormat(addDays(new Date(), -3))}
      hideExtraDays={true}
      firstDay={1}
      renderEmptyDate={() => {
        return (
          <HStack
            alignItems={'center'}
            borderRadius={8}
            flex={1}
            p={2}
            mt={4}
            mr={4}
            backgroundColor={'gray.50'}
            space={2}
            h={'64px'}
          >
            <Box
              backgroundColor={'gray.200'}
              borderRadius={'full'}
              alignItems={'center'}
              justifyContent={'center'}
              w={'24px'}
              h={'24px'}
            >
              <Icon as={Ionicons} name="moon" size={'xs'} color="gray.400" />
            </Box>
            <Text color={'gray.500'}> Repos </Text>
          </HStack>
        );
      }}
    />
  );
};

export default App;
