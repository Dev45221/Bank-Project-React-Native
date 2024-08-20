import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { colors } from '../config/theme'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import axios from 'axios'
import { APPNAME, Customer_List, Manaege_Customers} from '../constants/constants'
import { restoreToken } from '../reduxCode/ActionCreator'
import FancyTable from 'react-native-fancy-table'

const AdminHome = ({ navigation }) => {
    const id = useSelector(state => state.id)
    const dispatch = useDispatch()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light.accent }} >

            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: 200,
                    height: 60,
                    padding: 10,
                    backgroundColor: colors.light.tint,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    margin: 10
                }}
                onPress={() => navigation.navigate('Customer List')}
            >
                <Text style={{
                    fontSize: 20,
                    color: 'white'
                }} >Registered Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: 200,
                    height: 60,
                    padding: 10,
                    backgroundColor: colors.light.tint,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    margin: 10
                }}
                onPress={() => navigation.navigate('Manage Customers')}
            >
                <Text style={{
                    fontSize: 20,
                    color: 'white'
                }} >Manage Customers</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => dispatch(restoreToken(null, null, null, null))}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20
                    }}
                >Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const CustomerList = () => {
    const [customerList, setCustomerList] = useState([])
    const [tableHead, setTableHead] = useState(["S. No.", "Name", "Account Number", "Email", "Contact Number", "Pancard Number", "Account Type", "Status"])

    useEffect(() => {
        getCustomerList()
    }, [])

    const getCustomerList = () => {
        axios.get(Customer_List)
            .then((res) => {
                // console.log(res.data);
                const { records } = res.data
                const data = records
                const result = data.map(({ _id, password, balance, gender, simpleinterestrate, role, fdinterestrate, ifsc_code, address, info, __v, ...rest }, index) => ({ index, ...rest }))
                setCustomerList(result)
                // console.log(records)
            }).catch((error) => {
                Alert.alert(APPNAME, error)
            })
    }

    return (
        <View>
            <FancyTable
                headerBGColor={colors.light.tint}
                headerFontColor="white"
                headerFontSize={18}
                bodyFontSize={16}
                bodyFontColor="black"
                tableHeight={2.5}
                header={tableHead}
                tableBody={customerList}
                rowWidth={4}
                borderColor={colors.light.tint}
                borderWidth={1}
            />
        </View>
    )
}

const ManageCustomers = ({ navigation }) => {
    const [customerList, setCustomerList] = useState([])
    const [tableHead, setTableHead] = useState(["S. No.", "Name", "Account Number", "Email", "Pancard Number", "Account Type", "Status"])

    useEffect(() => {
        getCustomerList()
    }, [])

    const getCustomerList = () => {
        axios.get(Customer_List)
            .then((res) => {
                // console.log(res.data);
                const { records } = res.data
                const data = records
                const result = data.map(({ password, balance, mobile, gender, simpleinterestrate, fdinterestrate, ifsc_code, address, info, __v, ...rest }) => ({ ...rest }))
                setCustomerList(result)
                // console.log(records)
            }).catch((error) => {
                Alert.alert(APPNAME, error)
            })
    }

    const verifyCustomer = (id) => {
        axios.get(Manaege_Customers + id + "&s=verify")
            .then((res) => {
                console.log(res.data.success)
                // Alert.alert(APPNAME, "Status updated ✔")
                // navigation.goBack()
                getCustomerList()
            })
            .catch((error) => {
                console.log(APPNAME, error);
            })
    }

    const blockCustomer = (id) => {
        axios.get(Manaege_Customers + id + "&s=block")
            .then((res) => {
                console.log(res.data.success)
                // Alert.alert(APPNAME, "Status updated ✔")
                // navigation.goBack()
                getCustomerList()
            })
            .catch((error) => {
                console.log(APPNAME, error);
            })
    }

    const deleteCustomer = (id) => {
        axios.get(Manaege_Customers + id)
            .then((res) => {
                console.log(res.data.success)
                Alert.alert(APPNAME, "Record deleted ✔")
                // navigation.goBack()
                getCustomerList()
            })
            .catch((error) => {
                console.log(APPNAME, error);
            })
    }

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={customerList}
                keyExtractor={item => item.email}
                renderItem={({ item, index }) =>
                    item.role == 'customer' ?
                        <View style={{
                            height: 260,
                            backgroundColor: 'beige',
                            borderRadius: 20,
                            margin: 10,
                            padding: 15,
                            elevation: 10,
                            borderColor: colors.light.tint,
                            borderWidth: 1
                        }} >
                            <Text style={{
                                fontSize: 20,
                                color: colors.light.tint,
                                fontWeight: 'bold',
                                fontFamily: 'georgia'
                            }} >Name: {item.name}</Text>

                            <Text style={{
                                fontSize: 20,
                                color: colors.light.tint,
                                fontWeight: 'bold',
                                fontFamily: 'georgia'
                            }} >Email: {item.email}</Text>

                            <Text style={{
                                fontSize: 20,
                                color: colors.light.tint,
                                fontWeight: 'bold',
                                fontFamily: 'georgia'
                            }} >Account Number: {item.accno}</Text>

                            <Text style={{
                                fontSize: 20,
                                color: colors.light.tint,
                                fontWeight: 'bold',
                                fontFamily: 'georgia'
                            }} >Pancard Number: {item.pancard}</Text>

                            <Text style={{
                                fontSize: 20,
                                color: colors.light.tint,
                                fontWeight: 'bold',
                                fontFamily: 'georgia'
                            }} >Role: {item.role}</Text>

                            {
                                item.status ?
                                    <Text style={{
                                        fontSize: 20,
                                        color: statusColor,
                                        fontWeight: 'bold',
                                        fontFamily: 'georgia'
                                    }} >Status: {statusTxt}</Text>
                                    : <Text style={{
                                        fontSize: 20,
                                        color: 'red',
                                        fontWeight: 'bold',
                                        fontFamily: 'georgia'
                                    }} >Status: Blocked ✖</Text>
                            }

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                {
                                    item.status ?
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                flex: 1,
                                                height: 50,
                                                margin: 10,
                                                backgroundColor: 'grey',
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={() => blockCustomer(item._id)}
                                        >
                                            <Text style={{
                                                fontSize: 20,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontFamily: 'georgia',
                                                letterSpacing: 1
                                            }} >Block</Text>
                                        </TouchableOpacity>
                                        : <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                flex: 1,
                                                height: 50,
                                                margin: 10,
                                                backgroundColor: 'green',
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={() => verifyCustomer(item._id)}
                                        >
                                            <Text style={{
                                                fontSize: 20,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontFamily: 'georgia',
                                                letterSpacing: 1
                                            }} >Verify</Text>
                                        </TouchableOpacity>
                                }

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{
                                        flex: 1,
                                        height: 50,
                                        margin: 10,
                                        backgroundColor: 'red',
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => deleteCustomer(item._id)}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontFamily: 'georgia',
                                        letterSpacing: 1
                                    }} >Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null
                }
            />
        </View>
    )
}

const Stact = createNativeStackNavigator()

export const AdminHomeScreen = () => {
    return (
        <Stact.Navigator initialRouteName='Admin' >
            <Stact.Screen name='Admin' component={AdminHome} />
            <Stact.Screen name='Customer List' component={CustomerList} />
            <Stact.Screen name='Manage Customers' component={ManageCustomers} />
        </Stact.Navigator>
    )
}