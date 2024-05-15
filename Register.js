import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { View,Text, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}){
  return(
    <View style={{flex: 1, backgroundColor: '#3E3E3E', padding: 30, justifyContent: 'center', gap: 10}}>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Register</Text>
      <Formik
        enableReinitialize={true}
        initialValues={{email: "", password: ""}}
        onSubmit={(values) => {
          axios.post(`${process.env.EXPO_PUBLIC_API_SERVERURL}/createaccount`, values)
          .then (async(res) => {       
              navigation.navigate("Login")
          }).catch((error) => console.log(error))
        }}
      >
        {(props) => (
          <View style={{gap: 10}}>
           <TextInput
              label="Email"
              value={props.values.email}
              onChangeText={props.handleChange("email")}
          />  
          <TextInput
              label="Password"
              value={props.values.password}
              onChangeText={props.handleChange("password")}
          />  
          <Button
            mode='contained'
            labelStyle={{fontSize: 20, fontWeight: 700}}
            onPress={props.handleSubmit}>
              Register
          </Button>
          </View>
        )}
      </Formik>
      <Text style={{fontSize: 15, textAlign: 'center', color: 'white'}}>Already have an account?</Text>
      <Button
        labelStyle={{fontSize: 20, fontWeight: 700}}
        onPress={() => {navigation.navigate("Login")}}>
            Login
        </Button>
    </View>
  )
}