import React, { useState, useEffect } from 'react';
import { View, Text, Image, ToastAndroid, Alert, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { SignOut, updatePassword } from '../reduxCode/ActionCreator';
import { APPNAME, Customer_Detail, Deposit_Amount, Withdraw_Amount, Transaction_History, Edit_Profile, Change_Password, Create_FD, Fetch_FD, Updata_Balance, Upload_Document } from '../constants/constants';
import { Styling } from '../styling/Styling';
import InputField from '../components/InputField';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from '../components/CustomButton';
import { colors } from '../config/theme';
import { DataTable, RadioButton, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { SkypeIndicator, UIActivityIndicator } from 'react-native-indicators';
import FancyTable from 'react-native-fancy-table';
import SegmentedControlTab from "react-native-segmented-control-tab";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,
} from 'react-native-document-picker'

const CustomerProfile = ({ navigation }) => {
    const isFocused = useIsFocused()
    const id = useSelector(state => state.id)
    const storedPass = useSelector(state => state.password)
    const [name, setName] = useState()
    const [accno, setAccNo] = useState()
    const [acctype, setAccType] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [balance, setBalance] = useState()
    const [city, setCity] = useState()
    const [selectedState, setSelectedState] = useState()
    const [nameStr, setNameStr] = useState()

    useEffect(() => {
        if (isFocused) {
            getCustomerDetails()
        }
    })

    const getCustomerDetails = async () => {
        try {
            const res = await axios.get(Customer_Detail + id)
            // console.log(res.data.record)
            const { name, email, accno, acctype, balance, mobile } = res.data.record
            const { city, state } = res.data.record.address
            // console.log(`jdjfbjsbsjdbf ${storedPass}`)
            setName(name)
            // nameStr = name
            let logoname = name.charAt(0).toUpperCase()
            setNameStr(logoname)
            setEmail(email)
            setAccNo(accno)
            setAccType(acctype)
            setBalance(balance)
            setMobile(mobile)
            setCity(city)
            setSelectedState(state)
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View
                style={{
                    width: 300,
                    height: 360,
                    backgroundColor: '#CB9B42',
                    alignSelf: 'center',
                    margin: 10,
                    marginTop: 100,
                    elevation: 15,
                    borderRadius: 20,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 10,
                    paddingBottom: 20
                }}
            >
                <Text style={Styling.txt} >Name: {name}</Text>
                <Text style={Styling.txt} >Email: {email}</Text>
                <Text style={Styling.txt} >Mobile: {mobile}</Text>
                <Text style={Styling.txt} >Account number: {accno}</Text>
                <Text style={Styling.txt} >Account Type: {acctype}</Text>
                <Text style={Styling.txt} >Balance: {balance}</Text>
                <Text style={Styling.txt} >City: {city}</Text>
                <Text style={Styling.txt} >State: {selectedState}</Text>
            </View>
            <View
                style={{
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                    backgroundColor: '#CB9B42',
                    borderColor: '#F2F3EE',
                    borderWidth: 8,
                    alignSelf: 'center',
                    marginTop: -450,
                    elevation: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={Styling.txtLogo} >{nameStr}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: 45,
                    height: 45,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -70,
                    marginRight: -230
                }}
                onPress={() => navigation.navigate('Edit Profile')}
            >
                <MaterialIcons
                    name='edit'
                    size={30}
                    color='black'
                />
            </TouchableOpacity>

        </View>
    );
}

const WithdrawScreen = ({ navigation }) => {
    const [amount, setAmount] = useState(0)
    const id = useSelector(state => state.id)
    const [accno, setAccNo] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        getCustomerDetails()
        // console.log(`withdraw id: ${id}`);
    })

    const getCustomerDetails = async () => {
        try {
            const res = await axios.get(Customer_Detail + id)
            // console.log(res.data.record)
            const { email, accno } = res.data.record
            setEmail(email)
            setAccNo(accno)
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    const withdrawAmt = async () => {
        try {
            const params = {
                amount: parseFloat(amount),
                email: email,
                accno: accno
            }
            const res = await axios.put(Withdraw_Amount + id, params)
            // console.log(res.data.record)
            setAmount()
            Alert.alert(APPNAME, "Withdraw successfull ✔.")
            navigation.navigate('Customer')
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    return (
        <View style={{ flex: 1, margin: 20 }} >
            <InputField
                label={'Enter withdraw amount'}
                values={amount}
                setText={setAmount}
                keyboardType='number-pad'
                icon={
                    <MaterialIcons
                        name="currency-rupee"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
            />
            <CustomButton label={"Withdraw"} onPress={() => withdrawAmt()} />
        </View>
    );
}

const DepositScreen = ({ navigation }) => {
    const [amount, setAmount] = useState(0)
    const id = useSelector(state => state.id)
    const [accno, setAccNo] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        getCustomerDetails()
        // console.log(`deposit id: ${id}`);
    })

    const getCustomerDetails = async () => {
        try {
            const res = await axios.get(Customer_Detail + id)
            // console.log(res.data.record)
            const { email, accno } = res.data.record
            setEmail(email)
            setAccNo(accno)
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    const depositAmt = async () => {
        try {
            const params = {
                amount: amount,
                email: email,
                accno: accno
            }
            const res = await axios.put(Deposit_Amount + id, params)
            // console.log(res.data.record)
            setAmount()
            Alert.alert(APPNAME, "Deposit successfull ✔.")
            navigation.navigate('Customer')
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    return (
        <View style={{ flex: 1, margin: 20 }} >
            <InputField
                label={'Enter deposit amount'}
                values={amount}
                setText={setAmount}
                keyboardType='number-pad'
                icon={
                    <MaterialIcons
                        name="currency-rupee"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
            />
            <CustomButton label={"Deposit"} onPress={() => depositAmt()} />
        </View>
    );
}

const TransactionHistoryScreen = () => {
    const isFocused = useIsFocused()
    const id = useSelector(state => state.id)
    const [tableData, setTableData] = useState([])
    const [tableHead, setTableHead] = useState(["S. No.", "Amount", "Before Balance", "After Balance", "Transaction Type"])

    useEffect(() => {
        if (isFocused) {
            getTransactions()
        }
    }, [])

    const getTransactions = async () => {
        try {
            const res = await axios.get(Transaction_History + id)
            // console.log(res.data.transactions)
            const { status, transactions } = res.data
            const data = transactions
            const result = data.map(({ _id, customer_id, timestamp, __v, ...rest }, index = 1) => ({ index, ...rest }))
            // console.log("Result=======", result)
            setTableData(result)
            // console.log(history)
        } catch (error) {
            Alert.alert(APPNAME, `Transaction list failed! ${error}`)
        }
    }

    return (
        <View>
            {/* <ScrollView horizontal={true}>
                <DataTable style={Styling.container} >
                    <DataTable.Header style={Styling.tabHeader} >
                        <DataTable.Title style={Styling.tabTitle} ><Text style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: 'bold',
                            letterSpacing: 1,
                        }} >Date</Text></DataTable.Title>
                        <DataTable.Title style={Styling.tabTitle} ><Text style={Styling.tabTxtHeader} >Type</Text></DataTable.Title>
                        <DataTable.Title style={Styling.tabTitle} ><Text style={Styling.tabTxtHeader} >Amount</Text></DataTable.Title>
                        <DataTable.Title style={Styling.tabTitle} ><Text style={Styling.tabTxtHeader} >Balance</Text></DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={history}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={() =>
                            <Text style={{ width: '100%', height: 0.5, backgroundColor: colors.light.tint }} />
                        }
                        renderItem={({ item, index }) =>

                            <DataTable.Row style={Styling.tabCell} >
                                <DataTable.Cell><Text style={{
                                    flex: 1,
                                    width: 80,
                                    padding: 6,
                                    fontSize: 16.5,
                                    color: colors.light.tint
                                }} >{item.timestamp}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={Styling.tabTxtCell} >{item.transaction_type}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={Styling.tabTxtCell} >{item.amount}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={Styling.tabTxtCell} >{item.balance_after_transaction}</Text></DataTable.Cell>
                            </DataTable.Row>
                        }
                    />

                </DataTable>
            </ScrollView> */}
            <FancyTable
                headerBGColor={colors.light.tint}
                headerFontColor='white'
                headerFontSize={18}
                bodyFontSize={16}
                bodyFontColor={colors.light.tint}
                tableHeight={1}
                header={tableHead}
                tableBody={tableData}
                rowWidth={4}
                borderColor={colors.light.tint}
                borderWidth={1}
            />
        </View>
    )
}

const EditProfileScreen = ({ navigation }) => {
    const id = useSelector(state => state.id)
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [selectedState, setSelectedState] = useState("Select State")
    const [city, setCity] = useState("Select City")
    const [gender, setGender] = useState()
    const [pin, setPin] = useState()

    useEffect(() => {
        getCustomerDetails()
    }, [])

    const getCustomerDetails = async () => {
        try {
            const res = await axios.get(Customer_Detail + id)
            // console.log(res.data.record)
            const { name, mobile, gender } = res.data.record
            const { city, state, pincode } = res.data.record.address
            setName(name)
            setMobile(mobile)
            setGender(gender)
            setPin(pincode)
            setCity(city)
            setSelectedState(state)
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    const updateProfle = async () => {
        try {
            const params = {
                name: name,
                city: city,
                mobile: mobile,
                state: selectedState,
                pincode: pin,
                gender: gender
            }
            const res = await axios.put(Edit_Profile + id, params)
            console.log(res.data.msg)
            Alert.alert(APPNAME, res.data.msg)
            navigation.goBack()
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 25 }} >
            <Text style={Styling.heading} >Edit Profile</Text>

            <View>
                <InputField
                    label={"Full Name"}
                    values={name}
                    setText={setName}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                />

                <InputField
                    label={"Mobile Number"}
                    values={mobile}
                    setText={setMobile}
                    icon={
                        <MaterialIcons
                            name="phone"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="number-pad"
                />

                <View style={{
                    // flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} >
                    <Picker
                        onValueChange={(val) => setSelectedState(val)}
                        style={{
                            width: 50,
                            marginRight: 20,
                        }}
                    >
                        <Picker.Item label="Select State" value="Select State" />
                        <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                        <Picker.Item label="Gujarat" value="Gujarat" />
                        <Picker.Item label="Maharashtra" value="Maharashtra" />
                    </Picker>
                    <Text style={{
                        fontSize: 16,
                        color: 'black'
                    }} >{selectedState}</Text>
                </View>
                <Text style={{
                    height: 1,
                    backgroundColor: 'grey',
                    marginBottom: 15,
                }} />

                <View style={{
                    // flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} >
                    <Picker
                        onValueChange={(val) => setCity(val)}
                        style={{
                            width: 50,
                            marginRight: 20,
                        }}
                    >
                        <Picker.Item label="Select City" value="Select City" />
                        <Picker.Item label="Indore" value="Indore" />
                        <Picker.Item label="Ahemdabad" value="Ahemdabad" />
                        <Picker.Item label="Pune" value="Pune" />
                    </Picker>
                    <Text style={{
                        fontSize: 18,
                        color: 'black'
                    }} >{city}</Text>
                </View>
                <Text style={{
                    height: 1,
                    backgroundColor: 'grey',
                    marginBottom: 30,
                }} />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: 20
                }} >
                    <RadioButton
                        color={colors.light.accent}
                        value='male'
                        onPress={() => setGender('male')}
                        uncheckedColor='black'
                        status={gender == 'male' ? 'checked' : 'unchecked'}
                    ></RadioButton>
                    <Text style={{
                        fontSize: 18,
                        color: gender == 'male' ? colors.light.accent : 'black'
                    }} >Male</Text>

                    <RadioButton
                        color={colors.light.accent}
                        value='female'
                        onPress={() => setGender('female')}
                        uncheckedColor='black'
                        status={gender == 'female' ? 'checked' : 'unchecked'}
                    ></RadioButton>
                    <Text style={{
                        fontSize: 18,
                        color: gender == 'female' ? colors.light.accent : 'black'
                    }} >Female</Text>

                    <RadioButton
                        color={colors.light.accent}
                        value='other'
                        onPress={() => setGender('other')}
                        uncheckedColor='black'
                        status={gender == 'other' ? 'checked' : 'unchecked'}
                    ></RadioButton>
                    <Text style={{
                        fontSize: 18,
                        color: gender == 'other' ? colors.light.accent : 'black'
                    }} >Other</Text>
                </View>

                <InputField
                    label={"Pin"}
                    values={pin}
                    setText={setPin}
                    icon={
                        <Ionicons
                            name="location"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="numeric"
                />

                <CustomButton label={"Update Profile"} onPress={updateProfle} />
            </View>


        </View>
    )
}

const ChangePasswordScreen = ({ navigation }) => {
    const id = useSelector(state => state.id)
    const storedPass = useSelector(state => state.password)
    const dispatch = useDispatch()
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState(0)
    const [conPass, setConPass] = useState(0)
    const [oldValid, setOldValid] = useState()
    const [oldValidColor, setOldValidColor] = useState("red")
    const [newValid, setNewValid] = useState()
    const [newValidColor, setNewValidColor] = useState('red')

    useEffect(() => {
        newValidPassword()
        oldValidPassword()
    })

    const oldValidPassword = () => {
        if (storedPass == oldPass) {
            setOldValid("*Old password matched ✔")
            setOldValidColor("green")
        } else {
            setOldValid("*Old password didn't matched ✖")
            setOldValidColor("red")
        }
    }

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
        if (oldPass != "" && newPass != "" && conPass != "") {
            if (newPass == conPass && oldPass == storedPass) {
                const params = {
                    oldPass: oldPass,
                    newPass: newPass,
                    conPass: conPass
                }
                axios.post(Change_Password + id, params)
                    .then((res) => {
                        console.log(res.data.msg)
                        Alert.alert(APPNAME, res.data.msg)
                        dispatch(updatePassword(conPass))
                        setOldPass()
                        setNewPass(0)
                        setConPass(0)
                        navigation.navigate("Customer")
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
                        color: oldValidColor,
                        marginBottom: 30,
                    }}
                >
                    {oldValid}
                </Text>

                <InputField
                    label={"Old Password"}
                    values={oldPass}
                    setText={setOldPass}
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

const FDScreen = () => {
    const isFocused = useIsFocused()
    const id = useSelector(state => state.id)
    const storedEmail = useSelector(state => state.email)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabHead = ["View FDs", "Create FD"]
    const [tabData, setTabData] = useState("View FDs")
    const [amount, setAmount] = useState()
    const [email, setEmail] = useState()
    const [duration, setDuration] = useState()
    const [time, setTime] = useState()
    const [accno, setAccNo] = useState()
    const [tableData, setTableData] = useState([])
    const [tableHead, setTableHead] = useState(["Account Number", "FD Amount", "Balance", "Transaction Type", "Interest Rate", "Duration\n(in years)", "Created time", "Interest Amount"])

    useEffect(() => {
        if (isFocused) {
            setEmail(storedEmail)
            // console.log(Date());
            fetchFD()
            getCustomerDetails()
        }
    }, [])

    const getCustomerDetails = async () => {
        try {
            const res = await axios.get(Customer_Detail + id)
            // console.log(res.data.record)
            const { accno } = res.data.record
            setAccNo(accno)
        } catch (error) {
            Alert.alert(APPNAME, error)
        }
    }

    const handleTab = ind => {
        setSelectedIndex(ind)
        setTabData(tabHead[ind])
    }

    const createFD = () => {
        const params = {
            fd_amount: amount,
            email: storedEmail,
            fd_duration: duration
        }
        axios.post(Create_FD + id, params)
            .then((res) => {
                console.log(res.data.msg)
                Alert.alert(APPNAME, res.data.msg)
                // fetchFD()
                updateBalance()
                handleTab(0)
                setAmount()
                setDuration()
            })
            .catch((error) => {
                Alert.alert(APPNAME, error.response.data.msg)
            })
    }

    const updateBalance = () => {
        const params = {
            dateInString: Date(),
            accno: accno
        }
        axios.post(Updata_Balance + id, params)
            .then((res) => {
                console.log(res.data)
                // Alert.alert(APPNAME, "FD Created ✔")
                fetchFD()
                // setTabData(0)
            })
            .catch((error) => {
                Alert.alert(APPNAME, error)
            })
    }

    const fetchFD = () => {
        axios.get(Fetch_FD + id)
            .then((res) => {
                const { records } = res.data
                // setFds(records)
                const result = records.map(({ _id, customer_id, __v, ...rest }) => ({ ...rest }))
                setTableData(result)
                // console.log(`FDs Length: ${fds.length}`)
                // console.log(`Result Length: ${fds.length}`)
            })
            .catch((error) => {
                // console.log(error.response.data.msg)
                Alert.alert(APPNAME, error)
            })
    }

    return (
        <View style={{ flex: 1 }} >
            <SegmentedControlTab
                values={tabHead}
                selectedIndex={selectedIndex}
                onTabPress={(ind) => handleTab(ind)}
                borderRadius={0}
                tabsContainerStyle={{
                    height: 40,
                    marginBottom: 10
                }}
                tabTextStyle={{
                    fontSize: 20,
                    fontFamily: 'georgia'
                }}
                activeTabStyle={{
                    backgroundColor: colors.light.accent
                }}
                activeTabTextStyle={{
                    color: 'white',
                    fontWeight: 'bold'
                }}
            />
            {
                selectedIndex == 0 ?
                    tableData.length > 0 ?
                        <FancyTable
                            headerBGColor={colors.light.tint}
                            headerFontColor='white'
                            headerFontSize={18}
                            bodyFontSize={16}
                            bodyFontColor={colors.light.tint}
                            tableHeight={1}
                            header={tableHead}
                            tableBody={tableData}
                            rowWidth={3}
                            borderColor={colors.light.tint}
                            borderWidth={1}
                        />
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{
                                fontSize: 22,
                            }} >No, FD created yet</Text>
                            <UIActivityIndicator color={colors.light.tint} />
                        </View>
                    :
                    <View style={{ flex: 1, marginTop: 30, padding: 10 }} >
                        <InputField
                            label={'Enter FD amount'}
                            values={amount}
                            setText={setAmount}
                            keyboardType='number-pad'
                            icon={
                                <MaterialIcons
                                    name="currency-rupee"
                                    size={20}
                                    color="#666"
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                        <InputField
                            label={'Enter Email'}
                            values={email}
                            setText={setEmail}
                            keyboardType='email-address'
                            icon={
                                <MaterialIcons
                                    name="alternate-email"
                                    size={20}
                                    color="#666"
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                        <InputField
                            label={'Enter FD Duration (in years)'}
                            values={duration}
                            setText={setDuration}
                            keyboardType='number-pad'
                            icon={
                                <MaterialIcons
                                    name="timelapse"
                                    size={20}
                                    color="#666"
                                    style={{ marginRight: 5 }}
                                />
                            }
                            length={2}
                        />
                        <CustomButton label={"Create FD"} onPress={createFD} />
                    </View>
            }
        </View>
    )
}

const UploadDocument = () => {
    const id = useSelector(state => state.id)
    const [result, setResult] = React.useState([])
    const [docname, setdocname] = useState("")
    // useEffect(() => {
    //   console.log(JSON.stringify(result, null, 2))
    // }, [result])


    const UploadDoc = () => {
        console.log(result)
        var imgName = result[0]["name"]
        var type = result[0]["type"]
        var imgPath = result[0]["fileCopyUri"]
        console.log(imgName)
        console.log(type)
        console.log(imgPath)

        var formData = new FormData();
        formData.append("doc_name", docname);
        formData.append("upload_doc", {
            uri: imgPath,
            type: type,
            name: imgName
        })
        console.log(formData)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        axios.post(Upload_Document + id, formData, config)
            .then((response) => {
                console.log(response.data.post)
                console.log(response.data.success)
                if (response.data.success) {
                    alertBox(APPNAME, "Image Uploaded Successfully")
                }
            })
            .catch((error) => {
                console.log(error)
                alertBox(APPNAME, error.response.data.msg)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {/* {/ <Text style={{fontSize:32,fontWeight:'bold'}}>Result: {JSON.stringify(result, null, 2)}</Text> /} */}


            <Button
                title="open picker for single file selection"
                onPress={async () => {
                    try {
                        const pickerResult = await DocumentPicker.pickSingle({
                            presentationStyle: 'fullScreen',
                            copyTo: 'cachesDirectory',
                        })
                        setResult([pickerResult])
                    } catch (error) {
                        console.log(error)
                        Alert.alert(APPNAME, error)
                    }
                }}
            />
            <InputField
                selectionColor={colors.light.tint}
                label={"Enter Document Name"}
                values={docname}
                setText={setdocname}
            />
            <CustomButton
                label={"Upload Document"}
                onPress={UploadDoc} />
        </View>
    )
}

/*************************** Navigation Stack Code *****************************/
const Stack = createNativeStackNavigator()

const Customer = () => {
    return (
        <Stack.Navigator initialRouteName='CustomerHome' >
            <Stack.Screen name='CustomerHome' component={CustomerProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Edit Profile' component={EditProfileScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

const CustomDrawerContent = (props) => {
    const dispatch = useDispatch()
    const logoutAlert = () => {

        Alert.alert(APPNAME, "Are you sure? want to logout?", [
            {
                text: 'cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => {
                    ToastAndroid.show("Logging Out", ToastAndroid.LONG)
                    dispatch(SignOut(null, null, null, null, null))
                }
            }
        ])
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={logoutAlert}
            />
        </DrawerContentScrollView>
    );
}

/*************************** Drawer Code *****************************/

const Drawer = createDrawerNavigator();

const CustomerDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Customer'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Customer" component={Customer} />
            <Drawer.Screen name="Withdraw" component={WithdrawScreen} />
            <Drawer.Screen name="Deposit" component={DepositScreen} />
            <Drawer.Screen name="Transaction History" component={TransactionHistoryScreen} />
            <Drawer.Screen name="Change Password" component={ChangePasswordScreen} />
            <Drawer.Screen name="Fixed Deposit" component={FDScreen} />
            <Drawer.Screen name="Upload Document" component={UploadDocument} />
        </Drawer.Navigator>
    )
}

export const CustomerHomeScreen = () => {
    return (
        <CustomerDrawer />
    );
}