import 'react-native-gesture-handler';
import React from "react";
import { Provider } from 'react-redux';
import { store } from './reduxCode/Store';
import StartNavigation from './navigations/StartNavigation';

//BASE_URL: http://10.0.2.2:5000/

//creating stack navigator which will contain
//login, register and footer screens
//footer is the bottom tab navigator which
//includes all the other screens.

const App = () => {

  //fetchStoredTheme function will be called when the app starts
  // useEffect(() => {

  // }, []);

  return (
    <Provider store={store}>
      <StartNavigation />
    </Provider>
  )
}

export default App;