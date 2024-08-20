import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import RegisterScreen from "../screens/RegisterScreen";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { colors } from "../config/theme";
import { toggleScreen } from "../reduxCode/ActionCreator";
import { CustomerHomeScreen } from "../screens/CustomerHomeScreen";
import { AdminHomeScreen } from "../screens/AdminHomeScreen";
import { SkypeIndicator } from 'react-native-indicators'
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(toggleScreen(false))
        }, 4000)
    })
    return (
        <View style={{ flex: 1, backgroundColor: colors.light.accent }} >
            <Text style={{
                fontSize: 30,
                color: 'white',
                fontFamily: 'georgia',
                fontWeight: 'bold',
                letterSpacing: 5,
                marginBottom: 10,
                textAlign: 'center'
            }} >Splash Screen</Text>
            <SkypeIndicator color='white' />
        </View>
    )
}

const LoginStack = () => {
    const isLoading = useSelector(state => state.isLoading)
    const isSignIn = useSelector(state => state.isSignIn)
    const isSignOut = useSelector(state => state.isSignOut)
    const userToken = useSelector(state => state.userToken)
    const role = useSelector(state => state.role)
    const status = useSelector(state => state.status)
    const storedPass = useSelector(state => state.password)

    // useEffect(() => {
    //     console.log(`isLoadingadf: ${isLoading}`)
    //     console.log(`userTokensdaf: ${userToken}`)
    //     console.log(`rolesdf: ${role}`)
    //     console.log(`statussdf: ${status}`)
    //     console.log(`Passworddf: ${storedPass}`)
    // }, [])
    
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
            <Stack.Screen name="Forget Password" options={{ headerShown: false }} component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

const StartNavigation = () => {
    const isLoading = useSelector(state => state.isLoading)
    // const isSignIn = useSelector(state => state.isSignIn)
    // const isSignOut = useSelector(state => state.isSignOut)
    const userToken = useSelector(state => state.userToken)
    const role = useSelector(state => state.role)
    const id = useSelector(state => state.id)

    // useEffect(() => {
    //     // console.log(`isLoading: ${isLoading}`)
    //     // console.log(`userToken: ${userToken}`)
    //     // console.log(`role: ${role}`)
    //     // console.log(`id: ${id}`)
    // }, [])

    if (isLoading) {
        return <SplashScreen />
    } else {
        return (
            <NavigationContainer>
                {
                    userToken == null ?
                        <LoginStack />
                        : (userToken && role == "customer") ?
                            <Stack.Navigator initialRouteName="customerHome">
                                <Stack.Screen name="customerHome" options={{ headerShown: false }} component={CustomerHomeScreen} />
                            </Stack.Navigator>
                            : (userToken && role == "admin") ?
                                <Stack.Navigator initialRouteName="admin">
                                    <Stack.Screen name="admin" options={{ headerShown: false }} component={AdminHomeScreen} />
                                </Stack.Navigator>
                                : null
                }
            </NavigationContainer>
        )
    }
}

export default StartNavigation