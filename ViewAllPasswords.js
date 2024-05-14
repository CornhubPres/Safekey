import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-paper';

export default function ViewAllPasswords({ navigation }) {
    const [passwords, setPasswords] = useState([])

    const getallPasswords = async () => { const userID = await AsyncStorage.getItem("userID")
    axios.get(`http://192.168.100.20:3001/save/${userID}`)
    .then((res) => { console.log(res.data)
        setPasswords(res.data)
    }).catch((error) => console.log(error))}

    useEffect(() => {
        getallPasswords()
        
        }, []
    )
    return(
        <View>
            {passwords.length !== 0 && passwords.map((password)=>(
                <View key={password._id}>
                    <Text>type: {password.type}</Text>
                    <Text>shortName: {password.shortName}</Text>
                    <Text>website OR device: {password.websiteORdevice}</Text>
                    <Text>userName: {password.userName}</Text>
                    <Text>password: {password.password}</Text> 
                    <Divider />
                </View>
            ))}
        </View>
    );
}