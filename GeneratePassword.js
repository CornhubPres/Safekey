import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function GeneratePassword() {
    const [password, setPassword] = useState("");

    function createPassword(){
        const length = 8;
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const number = "1234567890";
        const symbol = "~!@#$%^&*()_+=-`{}[]:;<>?/\*"
        const allChars = uppercase + lowercase + number + symbol;

        let password = "";

        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += number[Math.floor(Math.random() * number.length)];
        password += symbol[Math.floor(Math.random() * symbol.length)];

        while(length > password.length){
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        setPassword(password);
    }
    return(
        <View>
            <Text>
                {password}
            </Text>
            <Button onPress = {createPassword}>
            Create Password
            </Button>
        </View>
    );
}



    