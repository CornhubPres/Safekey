import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewAllPasswords() {
    const [passwords, setPasswords] = useState([])
    useEffect(
        () => {
            const userID = AsyncStorage.getItem("userID")
            axios.get(`http://192.168.100.20:3001/save/${userID}`)
            .then((res) => {
                setPasswords(res.data)
            }).catch((error) => console.log(error))
        }
    )
    return(
        <View>
            {passwords.map((password, index)=>{
                <View key={index}>
                    <Text>{password.type}</Text>
                    <Text>{password.shortName}</Text>
                    <Text>{password.websiteORdevice}</Text>
                    <Text>{password.userName}</Text>
                    <Text>{password.password}</Text>
                </View>
            })}
        </View>
    );
}