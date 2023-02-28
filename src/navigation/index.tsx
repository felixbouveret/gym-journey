/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import * as React from 'react';

import Colors from '@/constants/Colors';
import ExercicesScreen from '@/screens/ExercicesScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';
import ProgramsScreen from '@/screens/ProgramsScreen';
import TrainingScreen from '@/screens/TrainingScreen';
import { RootStackParamList, RootTabParamList } from '@/types';

import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Training" component={TrainingScreen} options={{}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  // const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ProgramsScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint
      }}
    >
      <BottomTab.Screen
        name="ProgramsScreen"
        component={ProgramsScreen}
        options={{
          headerShown: false,
          title: 'Programmes',
          tabBarIcon: ({ color }) => <TabBarIcon name="barbell" color={color} />
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          title: 'Historique',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Exercices"
        component={ExercicesScreen}
        options={{
          headerShown: false,
          title: 'Exercices',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Icon size={30} as={Ionicons} style={{ marginBottom: -3 }} {...props} />;
}
