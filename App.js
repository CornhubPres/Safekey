import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UpdateUserDetails from './UpdateUserDetails';
import StoreNewPassword from './StoreNewPassword';
import ViewAllPasswords from './ViewAllPasswords';
import GeneratePassword from './GeneratePassword';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="View All Passwords">
        <Drawer.Screen name="Update User Details" component={UpdateUserDetails} />
        <Drawer.Screen name="Store New Password" component={StoreNewPassword} />
        <Drawer.Screen name="View All Passwords" component={ViewAllPasswords} />
        <Drawer.Screen name="Generate Passwords" component={GeneratePassword} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}