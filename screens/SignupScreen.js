import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useState, useContext } from 'react';
import { createUser } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isLoading, setIsLoading]= useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}){
    setIsLoading(true);
    try{
      const token= await createUser({email, password});
      authCtx.authenticate(token);
    }catch{
      Alert.alert("SignUp failed!", 
        "Could not create user. Please check your credentials or try again later."
      );
      setIsLoading(false);

    }
  }

  if(isLoading){
    return <LoadingOverlay message="Creating user..."/>;
  }
  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
