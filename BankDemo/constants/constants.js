export const APPNAME = "BANK"
const Base_Url = "http://10.0.2.2:2002/"

export const Customer_Register = Base_Url + "register"
export const Customer_Login = Base_Url + "login"

/*************************** Customer APIs ************************************* */
export const Customer_Detail = Base_Url + "customer/details?id="
export const Withdraw_Amount = Base_Url + "customer/withdraw?id="
export const Deposit_Amount = Base_Url + "customer/deposit?id="
export const Transaction_History = Base_Url + "customer/transactions?id="
export const Edit_Profile = Base_Url + "customer/editprofile?id="
export const Change_Password = Base_Url + "customer/changepassword?id="
export const Create_FD = Base_Url + "customer/fixeddeposit?id="
export const Fetch_FD = Base_Url + "customer/fetchfd?id="
export const Updata_Balance = Base_Url + "customer/updatebalance?id="
export const Verify_User = Base_Url + "customer/verifyUser"
export const Set_Password = Base_Url + "customer/setPassword?id="

/*************************** Admin APIs ************************************* */
export const Customer_List = Base_Url + "admin/customerlist"
export const Manaege_Customers = Base_Url + "admin/managecustomer?id="