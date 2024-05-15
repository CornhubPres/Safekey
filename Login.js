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
    setPassword (await AsyncStorage.getItem("password")); }
    getuserNameANDpassword()
}, [])

  return(
    <View style={{flex: 1, backgroundColor: '#3E3E3E', padding: 30, justifyContent: 'center', gap: 10}}>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>SafeKey</Text>
      <Formik
        enableReinitialize={true}
        initialValues={{email: userName?userName:"", password: password?password:""}}
        onSubmit={(values) => {
          axios.post(`${process.env.EXPO_PUBLIC_API_SERVERURL}/signin`, values)
          .then (async(res) => {
              await AsyncStorage.setItem("userName", res.data.user.email)
              await AsyncStorage.setItem("password", res.data.user.password)
              await AsyncStorage.setItem("userID", res.data.user._id)
              navigation.navigate("ViewAllPasswords")
            
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
              Login
          </Button>
          </View>
        )}
      </Formik>
      <Text style={{fontSize: 15, textAlign: 'center', color: 'white'}}>Don't have an account?</Text>
      <Button
        mode='contained'
        labelStyle={{fontSize: 20, fontWeight: 700}}
        onPress={() => {navigation.navigate("Register")}}>
            Register
        </Button>
    </View>
  )
}