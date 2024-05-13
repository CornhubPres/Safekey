import React, { useState } from 'react';
import { Formik } from 'formik';
import { View,Text, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}){
  const username = AsyncStorage.getItem("username");
  const password = AsyncStorage.flushGetRequests("password");

  return(
    <View>
      <Text>Login</Text>
      <Formik
        enableReinitialize={true}
        initialValues={{email: username?username:"", password: password?password:""}}
        onSubmit={(values) => {
          axios.post("http://192.168.100.20:3001/signin",{email: values.email,password: values.password})
          .then((res) => {
            if(res.data.message === "user signin"){
              AsyncStorage.setItem("username", values.email)
              AsyncStorage.setItem("password", values.password)
              AsyncStorage.setItem("userID", res.data.user._id)
              navigation.navigate("ViewAllPasswords")
            }
          }).catch((error) => console.log(error))
        }}
      >
        {(props) => (
          <View>
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
            onPress={props.handleSubmit}>
              Login
          </Button>
          </View>
        )}
      </Formik>
    </View>
  )
}