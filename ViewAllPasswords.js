import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, Button } from 'react-native-paper';

export default function ViewAllPasswords({ navigation }) {
    const [passwords, setPasswords] = useState([])
    const [userId, setUserId] = useState('')

    const getallPasswords = async () => { setUserId(await AsyncStorage.getItem("userID"))
    axios.get(`http://192.168.100.20:3001/save/${userId}`)
    .then((res) => {
         setPasswords(res.data)
    }).catch((error) => console.log(error))}

    useEffect(() => {
        getallPasswords()
        
        }, []
    )
    return(
        <View style={{flex: 1, backgroundColor: '#3E3E3E', padding: 30, justifyContent: 'center', gap: 10}}>
            {!userId? (<View>
                <Text style={{fontSize: 25, textAlign: 'center', color: '#fff', marginBottom: 30}}>
                    Please Login
                </Text>
                <Button mode='contained' onPress={() => {navigation.navigate("Login")}}>Go to login</Button>
            </View>):(
                <View>
                    <Text style={{fontSize: 25, color: 'white'}}>Welcome User</Text>
                    <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>View Passwords</Text>{console.log(userId)}
                    {passwords.length !== 0 && passwords.map((password)=>(
                        <View key={password._id}>
                            <Divider />
                            <Text style={{ fontSize: 16, color: 'white'}}>type: {password.type}</Text>
                            <Text style={{ fontSize: 16, color: 'white'}}>shortName: {password.shortName}</Text>
                            <Text style={{ fontSize: 16, color: 'white'}}>website OR device: {password.websiteORdevice}</Text>
                            <Text style={{ fontSize: 16, color: 'white'}}>userName: {password.userName}</Text>
                            <Text style={{ fontSize: 16, color: 'white'}}>password: {password.password}</Text> 
                            <Divider />
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}