import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { useState, useContext } from 'react';
import { loginUser } from '../util/auth';
import { Alert } from 'react-native';

function LoginScreen() {

  const [isAuthenticatin, setIsAuthenticatin]= useState(false);
  const AuthCtx =  useContext(AuthContext);

  async function loginHandler({email, password}){
    setIsAuthenticatin(true);
    try{
      const token=await loginUser({email, password});
      AuthCtx.authenticate(token)
    }catch{
      Alert.alert("Authentication failed", "Could not log you in. Please check your credentials or try again later.");
      setIsAuthenticatin(false);
    }
  }
  if(isAuthenticatin){
    return <LoadingOverlay message="Logging in..."/>;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
