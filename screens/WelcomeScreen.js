import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';

import  LoadingOverlay  from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
function WelcomeScreen() {

  const [fetchedMessage, setFetchedMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const authCtx =  useContext(AuthContext)

  // attaching token so that firebase knows, we have logged in succesfull and that auth.uyid is not null. firebase needs to know since rule says auth.uid should not be null
  useEffect(()=>{
    const fetchMessage=(async()=>{
      try{
        //setIsLoading(true);
        const response =  await axios.get(
          `https://react-native-course-70cf6-default-rtdb.firebaseio.com/message.json?auth=${authCtx.token}`
        )
        setFetchedMessage(response.data);
      }catch(error)
      {
        console.log("Error accessing the data");
      }finally{
        setIsLoading(false);
      }
    })

    fetchMessage();
    /*axios.get(
      `https://react-native-course-70cf6-default-rtdb.firebaseio.com/message.json?auth=${authCtx.token}`
    ).then((response)=>{
      setFetchedMessage(response.data);
    })*/
  }, [authCtx.token]);

  if(isLoading){
    return <LoadingOverlay message="Loading Resources..."/>;
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
