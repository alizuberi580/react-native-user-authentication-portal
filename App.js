import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthContextProvider from './store/auth-context';
import IconButton from './components/ui/IconButton';
import { AuthContext } from './store/auth-context';
import { Colors } from './constants/styles';
import AppLoading from 'expo-app-loading';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const AuthCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{
          headerRight:({headerTintColor})=>(
            <IconButton
              icon="exit"
              color="white"
              size={24}
              onPress={AuthCtx.logout}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const AuthCtx = useContext(AuthContext);
  return ( 
      <NavigationContainer>
        {!AuthCtx.isAuthenticated && <AuthStack/>}
        {AuthCtx.isAuthenticated && <AuthenticatedStack/>}
      </NavigationContainer>
  );
}

function Root(){

  const [isTryingLogin, setIsTryingLogin]= useState(true);
  const authCntx= useContext(AuthContext);
  useEffect(()=>{
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token');

        if(storedToken){
          authCntx.authenticate(storedToken);
        }

        setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

   useEffect(() => {
    if (!isTryingLogin) {
      SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    // ⛔ Don’t render AppLoading — splash is shown until hideAsync() is called
    return null;
  }
  return <Navigation/>;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}
