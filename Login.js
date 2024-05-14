import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { View,Text, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}){

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect ( () => {
    const getuserNameANDpassword = async () => {setUserName (await AsyncStorage.getItem("userName"));
    setPassword (await AsyncStorage.flushGetRequests("password")); }
    getuserNameANDpassword()
}, [])

  return(
    <View>
      <Text>Login</Text>
      <Formik
        enableReinitialize={true}
        initialValues={{email: userName?userName:"", password: password?password:""}}
        onSubmit={(values) => {
          axios.post("http://192.168.100.20:3001/signin",{email: values.email,password: values.password})
          .then (async(res) => {
            if(res.data.message === "user signin"){
              await AsyncStorage.setItem("userName", values.email)
              await AsyncStorage.setItem("password", values.password)
              await AsyncStorage.setItem("userID", res.data.user._id)
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