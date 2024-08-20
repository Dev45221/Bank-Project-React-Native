import { useEffect, useState } from 'react'
import { View, Text, Image, Alert, ScrollView } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { colors } from '../config/theme';
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APPNAME, Set_Password, Verify_User } from '../constants/constants';
import LoginScreen from './LoginScreen';
import axios from 'axios';
import { updatePassword } from '../reduxCode/ActionCreator';
import { useDispatch } from 'react-redux';

const VerifyUser = ({ navigation }) => {
    const [email, setEmail] = useState("devansh@google.com")
    const [storedMobile, setStoredMobile] = useState()
    const [storedID, setStoredID] = useState()

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // Handle login
    function onAuthStateChanged(user) {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            console.log("Hiii")
            navigation.navigate("Set Password", {
                id: storedID
            })
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    const verifyEmail = async () => {
        const params = {
            email: email
        }
        try {
            const res = await axios.post(Verify_User, params)
            // console.log(res) 
            const { _id, mobile } = res.data.records
            const phone = `+91 ${mobile}`
            const sec = phone.split(' ')[1].slice(0, 8)
            const rep = sec.replace("90096600", "********")
            const rem = phone.split(' ')[1].slice(8, 10)
            const full = "+91 " + rep + rem
            
            // console.log(demo.replace("90096600", "********"))
            setStoredID(_id)
            setStoredMobile(full)
            const confirmation = await auth().signInWithPhoneNumber(phone)
            setConfirm(confirmation)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    if (!confirm) {
        return (
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require("../images/forgot_password.png")}
                        style={{
                            height: 200,
                            width: 300,
                            margin: 15
                            // transform: [{ rotate: "-5deg" }],
                        }}
                    />
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "500",
                        color: colors.light.tint,
                        marginBottom: 30,
                    }}
                >Verify Email</Text>

                <InputField
                    label={"Email ID"}
                    values={email}
                    setText={setEmail}
                    icon={<MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    }
                    keyboardType="email-address"
                    selectionColor={colors.light.tint}
                />

                {/* <InputField
                label={"Mobile Number"}
                values={mobile}
                setText={setMobile}
                icon={<MaterialIcons
                    name="phone"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                />
                }
                keyboardType="number-pad"
                selectionColor={colors.light.tint}
            /> */}

                {/* <CustomButton label={"Send OTP"} onPress={() => signInWithPhoneNumber(`+91 ${mobile}`)} /> */}

                <CustomButton label={"Verify"} onPress={verifyEmail} />

            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }} >
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.light.tint
                }}
            >OTP sent at registered mobile number</Text>

            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.light.tint,
                    marginBottom: 30
                }}
            >{storedMobile}</Text>

            <InputField
                label={"Enter OTP"}
                values={code}
                setText={setCode}
                icon={
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
                keyboardType='number-pad'
            />

            <CustomButton label={"Confirm Code"} onPress={confirmCode} />
            {/* <TextInput value={code} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
        </View>
    );
}

const SetPassword = ({ navigation, route }) => {
    const [newPass, setNewPass] = useState(0)
    const [conPass, setConPass] = useState(0)
    const [newValid, setNewValid] = useState()
    const [newValidColor, setNewValidColor] = useState('red')
    const { id } = route.params
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(`IDDDDD: ${id}`)
        newValidPassword()
    })

    const newValidPassword = () => {
        if (newPass == "" && conPass == "") {
            setNewValid("*All fields are required ✖")
            setNewValidColor("red")
        } else {
            if (newPass === conPass) {
                setNewValid("*Password matched ✔")
                setNewValidColor("green")
            } else {
                setNewValid("*Password didn't matched ✖")
                setNewValidColor("red")
            }
        }

    }

    const changePassword = () => {
        if (newPass != "" && conPass != "") {
            if (newPass == conPass) {
                const params = {
                    newPass: newPass,
                    conPass: conPass
                }
                axios.put(Set_Password + id, params)
                    .then((res) => {
                        console.log(res.data.msg)
                        Alert.alert(APPNAME, res.data.msg)
                        dispatch(updatePassword(conPass))
                        setNewPass(0)
                        setConPass(0)
                        navigation.navigate("Login")
                    })
                    .catch((error) => {
                        Alert.alert(APPNAME, `Something went wrong ${error}`)
                    })
            }
        }
    }

    return (
        <ScrollView>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require("../images/change_password.png")}
                        style={{
                            height: 200,
                            width: 300,
                            marginBottom: 20
                            // transform: [{ rotate: "-5deg" }],
                        }}
                    />
                </View>

                <Text
                    style={{
                        fontSize: 16,
                        color: newValidColor,
                        marginBottom: 30,
                    }}
                >
                    {newValid}
                </Text>

                <InputField
                    label={"New Password"}
                    values={newPass}
                    setText={setNewPass}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                />

                <InputField
                    label={"Confirm Password"}
                    values={conPass}
                    setText={setConPass}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                />

                <CustomButton label={"Change Password"} onPress={changePassword} />

            </View>
        </ScrollView>
    )

}

const Stack = createNativeStackNavigator()

const ForgotPasswordScreen = () => {
    return (
        <Stack.Navigator initialRouteName='Forgot Password' >
            <Stack.Screen name='Forgot Password' component={VerifyUser} />
            <Stack.Screen name='Set Password' component={SetPassword} />
        </Stack.Navigator>
    )
}

export default ForgotPasswordScreen