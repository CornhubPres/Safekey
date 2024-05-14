import { StyleSheet, Text, View } from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StoreNewPassword({navigation}) {  

    const [userEmail, setuserEmail] = useState("");

    useEffect (() => {
        const getuserEmail = async () => {const s = await AsyncStorage.getItem("userName"); setuserEmail(s) }
        getuserEmail()
    }, [])
    return(
    <View style={{flex: 1, backgroundColor: '#3E3E3E', padding: 30, justifyContent: 'center', gap: 10}}>
        {!userEmail? (<View>
                <Text style={{fontSize: 25, textAlign: 'center', color: '#fff', marginBottom: 30}}>
                    Please Login
                </Text>
                <Button mode='contained' onPress={() => {navigation.navigate("Login")}}>Go to login</Button>
            </View>): (
            <View>
                <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Store New Passwords</Text>
                <Formik
                enableReinitialize={true}
                initialValues={{email: userEmail, password:"", type:"",shortName:"",websiteORdevice:"",userName:""}}
                onSubmit={(values) => {
                    axios.post("http://192.168.100.20:3001/save",{email: values.email,password: values.password,type: values.type,shortName: values.shortName,websiteORdevice: values.websiteORdevice,userName: values.userName})
                    .then((res) => {
                    console.log(res.data)
                    }).catch((error) => console.log(error))
                }}>
                    {(props) => {
                            return (
                                <View>
                                    <TextInput
                                        label="shortName"
                                        value={props.values.shortName}
                                        onChangeText={props.handleChange("shortName")} />
                                    <TextInput
                                        label="type"
                                        value={props.values.type}
                                        onChangeText={props.handleChange("type")} />
                                    <TextInput
                                        label="websiteORdevice"
                                        value={props.values.websiteORdevice}
                                        onChangeText={props.handleChange("websiteORdevice")} />
                                    <TextInput
                                        label="userName"
                                        value={props.values.userName}
                                        onChangeText={props.handleChange("userName")} />
                                    <TextInput
                                        label="password"
                                        value={props.values.password}
                                        onChangeText={props.handleChange("password")} />
                                    <Button
                                        mode='contained'
                                        labelStyle={{fontSize: 20, fontWeight: 700}}
                                        onPress={props.handleSubmit}>
                                        Submit
                                    </Button>
                                </View>
                            );
                        }}
                </Formik>
            </View>
        )}
    </View>
    );
}