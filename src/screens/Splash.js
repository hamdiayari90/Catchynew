import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default function Splash({navigation}) {

        useEffect(() => {
            // Simulate a delay and navigate to the main screen
            setTimeout(() => {
              navigation.navigate('Login');
            }, 5000); // Adjust the delay as per your requirement
          }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/design/splash.png')} style={styles.logo} />
      <Text style={styles.lable}>Catchy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    lable:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
    }
  });
