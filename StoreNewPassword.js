import { StyleSheet, Text, View } from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';

export default function StoreNewPassword() {
    return(
    <View>
        <Text>Store</Text>
        <Formik
        initialValues={{email:"", password:"", type:"",shortName:"",websiteORdevice:"",userName:""}}
        onSubmit={(values) => {
            axios.post("http://192.168.100.20:3001/save",{email: "fisheater@gmail.com",password: values.password,type: values.type,shortName: values.shortName,websiteORdevice: values.websiteORdevice,userName: values.userName})
            .then((res) => {
              console.log(res.data)
            }).catch((error) => console.log(error))
          }}>
            {(props) => {
                    return (
                        <View>
                            {/* <RadioButton.Group
                                onValueChange={props.handleChange('type')}
                                value={props.values.type}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Text>Device</Text>
                                    <RadioButton value="Device" />
                                </View>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Text>Online Service</Text>
                                    <RadioButton value="Online Service" />
                                </View>
                            </RadioButton.Group> */}
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
                                onPress={props.handleSubmit}>
                                Submit
                            </Button>
                        </View>
                    );
                }}
        </Formik>
    </View>
    );
}