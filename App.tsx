import React, {useState} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Debtors from './components/Debtors';
import AddDebtorModal from './components/AddDebtorModal';
import {Appbar, IconButton} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transfers from './components/Transfers';

export type NavParamList = {
  debtors: undefined;
  transfers: {name: string};
};

const Stack = createNativeStackNavigator<NavParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="debtors"
        screenOptions={{
          statusBarColor: '#2c5670',
          headerStyle: {backgroundColor: '#2c5670'},
          headerTintColor: '#ffffff',
        }}>
        <Stack.Screen
          name="debtors"
          component={Debtors}
          options={{
            title: 'Debtors',
          }}
        />
        <Stack.Screen
          name="transfers"
          component={Transfers}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  AddDebtor: {
    alignSelf: 'center',
  },
});

export default App;
