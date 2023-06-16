import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import * as api from '../services/api';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/min/moment-with-locales';
import {useIsFocused} from '@react-navigation/native';
import {fetchUSerInforamtion} from '../services/homePageApi/home.js';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {Color, Font} from '../constants/colors/color';
import LottieView from 'lottie-react-native';
import {Card, Button} from 'react-native-paper';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import {FlatList} from 'react-native';
import NoData from '../components/NoData.js/NoData';

export default function SurveyList({navigation}) {
  //get data from survey
  const [refreshing, setRefreshing] = React.useState(false);
  const [surveys, setSurveys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState();
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState({});
  const [random, setRandom] = useState(1);
  const [toggleSurvey, setTogglesurvey] = useState(false);

  const getUserInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };

  const getUserSurveys = () => {
    setRefreshing(true);
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        setUserId(token.id);
        api
          .getUserSurvey(token.id)
          .then(res => {
            setSurveys(res.data);
            setRefreshing(false);
            setTogglesurvey(true);
          })
          .catch(e => {
            navigation.navigate('Home');
          });
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      getUserSurveys();
      getUserInformation();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserSurveys();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <SwitchPage />
      ) : (
        <>
          {/* ********************************************************************************************************* */}
          {/* ********************************************* NAV BAR *************************************************** */}
          {/* ********************************************************************************************************* */}


          <View styles={styles.scrollView}>
            <View style={{height: HEIGHT / 5}}>
              <MenuHeaders
                navigation={navigation}
                userInfo={userInfo}
                title="SONDAGE"
              />
            </View>

            <FlatList
              data={surveys}
              renderItem={({item, index}) => (
                <Card style={styles.card} key={index}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '50%'}}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('DetailsSondage', {
                            survey: item,
                            userId: userId,
                          })
                        }>
                        <Card.Cover
                          source={{
                            uri:
                              'data:image/png;base64,' +
                              (item.product
                                ? item.product.photo.picByte
                                : item.partner.logo.picByte),
                          }}
                          resizeMode="center"
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                          }}></Card.Cover>
                      </Pressable>
                    </View>
                    <View style={styles.detailGiftContainer}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                          Disparu dans
                          {moment(item.endDate).locale('fr').fromNow(true)}
                        </Text>
                        <View style={styles.nameContainer}>
                          <Text style={styles.name}>
                            {item.description.length > 48
                              ? item.description.slice(0, 49) + '...'
                              : item.description}
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={styles.voirDetailContainer}
                        onLongPress={() =>
                          navigation.navigate('DetailsSondage', {
                            survey: item,
                            userId: userId,
                          })
                        }
                        onPress={() =>
                          navigation.navigate('RespondSurvey', {
                            surveyId: item.id,
                            userId: userId,
                          })
                        }>
                        <Button mode="contained" color={Color.primary}>
                          voir detail
                        </Button>
                      </Pressable>
                    </View>
                  </View>
                </Card>
              )}
              ListEmptyComponent={<NoData message={  'il n\'y a pas des sondages...'} />}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
{
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImageContainer: {
    width: '100%',
    height: 120,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  scrollView: {
    justifyContent: 'flex-start',
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#ffff',
    marginHorizontal: 5,
    shadowColor: '#353b48',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.05,
    elevation: 4,
    height: HEIGHT / 5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  detailGiftContainer: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginTop: '3%',
  },
  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  nameContainer: {
    marginTop: '1%',
  },
  name: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  voirDetailContainer: {
    alignItems: 'flex-end',
    padding: '5%',
  },
});
