import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {Header, ListItem, Icon, Button} from 'react-native-elements';
import * as api from '../services/api';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function questionList({route, navigation}) {
    // handle press buttom 
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      });
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
  //get data from survey
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const {itemId} = route.params;
// 
    api.surveyById(itemId).then(res => {

      setQuestions(res.data.questionsReturned);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <HomeHeader navigation={navigation} title="Surveys" />
      </View>

      <ScrollView style={styles.mainbox}>
        {questions.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.nom}>Nom :{l.title}</ListItem.Title>

              <ListItem.Subtitle style={styles.point}>
                choix : {l.choices}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.point}>
                type : {l.type}
              </ListItem.Subtitle>
              
            </ListItem.Content>
          </ListItem>
          
        ))}
      </ScrollView>
      
      <Button title="Annuler" style={styles.bouton} />
      <Button title="Envoyer" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nom: {
    color: '#4B0082',
  },
  point: {
    color: '#4B0082',
    fontSize: 20,
  },
  bouton: {
    color: '#ffbf00',
    fontSize: 20,
  },
  desc: {
    color: '#4B0082',
    fontSize: 20,
  },
  question: {
    color: '#4B0082',
    fontSize: 20,
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  Réponse: {
    backgroundColor: '#B22222',
    color: 'white',
  },
});
