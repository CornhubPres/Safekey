import React from 'react';
import { Formik } from 'formik';
import { View,Text, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

export default function Login({navigation}){
  return(
    <View>
      <Text>Login</Text>
      <Formik 
        initialValues={{email:"", password:""}}
        onSubmit={(values) => {
          axios.post("http://192.168.100.20:3001/signin",{email: values.email,password: values.password})
          .then((res) => {
            if(res.data === "user signin"){
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