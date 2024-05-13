import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './Login';
import UpdateUserDetails from './UpdateUserDetails';
import StoreNewPassword from './StoreNewPassword';
import ViewAllPasswords from './ViewAllPasswords';
import GeneratePassword from './GeneratePassword';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="UpdateUserDetails" component={UpdateUserDetails} />
        <Drawer.Screen name="StoreNewPassword" component={StoreNewPassword} />
        <Drawer.Screen name="ViewAllPasswords" component={ViewAllPasswords} />
        <Drawer.Screen name="GeneratePasswords" component={GeneratePassword} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}