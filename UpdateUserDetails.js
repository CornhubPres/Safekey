import { StyleSheet, Text, View } from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateUserDetails() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect ( () => {
      const getuserNameANDpassword = async () => {setUserName (await AsyncStorage.getItem("userName"));
      setPassword (await AsyncStorage.flushGetRequests("password")); }
      getuserNameANDpassword()
  }, [])  
    return(
      <View style={{flex: 1, backgroundColor: '#3E3E3E', padding: 30, justifyContent: 'center', gap: 10}}>
      {!userName? (<View>
                <Text style={{fontSize: 25, textAlign: 'center', color: '#fff', marginBottom: 30}}>
                    Please Login
                </Text>
                <Button mode='contained' onPress={() => {navigation.navigate("Login")}}>Go to login</Button>
            </View>): (
              <View>
                <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Update User</Text>
                <Formik
                  enableReinitialize={true}
                  initialValues={{email: userName?userName:"", password: password?password:"", newEmail: "", newPassword: ""}}
                  onSubmit={(values) => {
                    axios.put(`${process.env.EXPO_PUBLIC_API_SERVERURL}/changeuserdetails`,values)
                    .then (async(res) => {
                      console.log(res.data)
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
                    <TextInput
                        label="New Email"
                        value={props.values.newEmail}
                        onChangeText={props.handleChange("newEmail")}
                    />  
                    <TextInput
                        label="New Password"
                        value={props.values.newPassword}
                        onChangeText={props.handleChange("newPassword")}
                        />
                    <Button
                      mode='contained'
                      labelStyle={{fontSize: 20, fontWeight: 700}}
                      onPress={props.handleSubmit}>
                        Update
                    </Button>
                    </View>
                  )}
                </Formik>
              </View>
            )}
    </View>
    )
}