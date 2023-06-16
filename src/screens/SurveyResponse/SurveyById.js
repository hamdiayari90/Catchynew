import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Modal,
  ActivityIndicator,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {HEIGHT} from '../../utils/Dimension';
import {Color, Font} from '../../constants/colors/color';
import Foundation from 'react-native-vector-icons/Foundation';
import {TextInput} from 'react-native-paper';
import {NativeBaseProvider, Text, Radio, Checkbox} from 'native-base';
import {SwitchPage} from '../../components/SwitchPage/SwitchPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import * as api from '../../services/api';
import {MenuHeaders} from '../../components/menuComponent/MenuHeaders';
export class SurveyById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: {
        id: '84b05ad4-89e0-4498-aa31-a825278b64cb',
        title: '     ',
        description: '',
        points: 0,
        startDate: '',
        endDate: '',
        status: '',
        questions: [],
      },

      index: 0,
      lastIndex: false,
      end: false,
      responses: [],
      text: '',
      fetching: true,
      skipedIndex: null,
      modalVisible: false,
      loading: true,
    };
    this.fetchSurveyById = this.fetchSurveyById.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  handleBackButton() {
    // Handle the back button press event here
    // Navigate back to the previous screen, etc.
    this.props.navigation.navigate('Acceuil');
    return true; // Return true to prevent default behavior (i.e. exit app)
  }
  // =======================================================================================
  // ============================= COMPONENT DID MOUNT =====================================
  // =======================================================================================

  componentDidMount() {
    // console.log('his.props.navigation:', this.props.route)
    this.fetchSurveyById();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  // =======================================================================================
  // ============================= GET SURVEY BY ID    =====================================
  // =======================================================================================
  fetchSurveyById = async () => {
    console.log(
      '##################################################################',
    );
    console.log(
      'this.props.route.params.surveyId:\n',
      this.props.route.params.surveyId,
    );
    console.log(
      '##################################################################',
    );

    if (
      this.props.route.params.surveyId == undefined ||
      this.props.route.params.surveyId == null
    ) {
      this.props.navigation.replace('Sondages');
    }
    let res = await this.getSuveyById();
    if (res.error) {
      this.createAlert();
    } else {
      let resp = [];
      res.questions?.forEach(() => resp.push([]));
      await AsyncStorage.setItem('responses', JSON.stringify(resp));
      this.setState({
        survey: res,
        responses: resp,
        loading: false,
      });
    }
  };
  getSuveyById = async () => {
    // let id = "bf110eba-1429-42aa-8e5d-bc007bb60771";
    // console.log(
    //   "this.props.route.params.surveyId in getSuveyById:",
    //   this.props.route.params.surveyId
    // );
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let data = await fetch(
        `http://145.239.166.14:8082/surveys/${this.props.route.params.surveyId}`,
        requestOptions,
      );
      return data.json();
    } catch (e) {}
  };
  createAlert = () =>
    Alert.alert(
      'no survey',
      'Ce sondage est expiré \n attendez vous prochain sondage',
      [{text: 'OK', onPress: () => this.props.navigation.replace('Acceuil')}],
    );
  componentWillUnmount() {
    this.fetchSurveyById = null;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  // =======================================================================================
  // ============================= NEXT QUESTION  ==========================================
  // =======================================================================================
  nextQuestion = () => {
    // console.log('neeeext')
    if (this.state.responses[this.state.index][0]) {
      if (this.state.index < this.state.survey.questions.length - 1) {
        if (
          this.state.survey.questions[this.state.index + 1].questionDependency >
          0
        ) {
          //  here check the response choices if
          // check if the next question is dependeing on this current question Reponse Dependante so increment by 1 and set last index == true
          //  else
          // inrement index by 2 and set skipped question = index + 1 to make sure when he go with previous question not select that index

          if (
            this.state.survey.questions[this.state.index].choices[
              this.state.survey.questions[this.state.index + 1]
                .dependencyResponse - 1
            ].id === this.state.responses[this.state.index][0]
          ) {
            // console.log(
            //   "======== is depending and make the rigth choices  =========================",
            //   this.state.survey.questions[this.state.index].choices[
            //     this.state.survey.questions[this.state.index + 1]
            //       .dependencyResponse - 1
            //   ].id === this.state.responses[this.state.index][0]
            // );
            this.setState(
              prevState => {
                // create a copy of the current state
                const newResponses = [...prevState.responses];
                for (
                  let i = this.state.index + 1;
                  i < newResponses.length;
                  i++
                ) {
                  newResponses[i] = [];
                }

                return {
                  responses: newResponses,
                  index: this.state.index + 1,

                  lastIndex: true,
                };
              },
              async () => {
                // code that uses the updated state
                // console.log(
                //   "this.state.responses ========================>\n",
                //   this.state.responses
                // );
              },
            );
            // this.setState({
            //   index: this.state.index + 1,

            //   lastIndex: true,
            // })
          } else {
            this.setState({
              index: this.state.index + 2,
              skipedIndex: this.state.index + 1,
            });
          }
        } else {
          // if the next quesion is not dependeind from the last question
          this.setState({index: this.state.index + 1});
        }
      }
    } else {
      Alert.alert("svp remplissez le champ avant d'avancer !");
    }

    // this.setState({ index: this.state.index + 1 });
  };

  // =======================================================================================
  // ============================= PREVIOUS QUESTION   =====================================
  // =======================================================================================

  previousQuestion = () => {
    // make sure when you go back tp previous question if lastindex is true or it will always stay check not sui
    this.setState({
      lastIndex: false,
    });
    if (this.state.index > 0) {
      // check before if the previous question is skipped from the dependenind question so you shoud skip that question by index -2

      if (this.state.index - 1 == this.state.skipedIndex) {
        this.setState({index: this.state.index - 2});
      } else {
        this.setState({index: this.state.index - 1});
      }
    }
  };

  // =======================================================================================
  // ============================= UPDATE RESPONSE WHEN CHOSE A VALUE ======================
  // =======================================================================================

  updateResponse = async value => {
    if (this.state.responses === undefined) {
      try {
        let parsedResponses = await AsyncStorage.getItem('responses');
        let responsesStorage = JSON.parse(parsedResponses);
        //console.log("responsesStorage:", responsesStorage);
        this.setState({
          responses: responsesStorage,
        });
      } catch (e) {}
    }
    if (this.state.text.length > 0) {
      this.setState(
        prevState => {
          // make a copy of the responses array
          const updatedResponses = [...prevState.responses];
          // check if value is an array
          let newValue = [value];
          // update the specific index of the array
          updatedResponses[this.state.index] = [...newValue];
          // return the updated state
          return {responses: updatedResponses, text: ''};
        },
        async () => {
          // code that uses the updated state
          // console.log(
          //   "this.state.responses ========================>\n",
          //   this.state.responses
          // );
          await AsyncStorage.setItem(
            'responses',
            JSON.stringify(this.state.responses),
          );
        },
      );
    } else {
      this.setState(
        prevState => {
          // make a copy of the responses array
          const updatedResponses = [...prevState.responses];
          // check if value is an array
          let newValue = Array.isArray(value) ? [...value] : [value];
          // update the specific index of the array
          updatedResponses[this.state.index] = [...newValue];
          // return the updated state
          return {responses: updatedResponses};
        },
        async () => {
          // code that uses the updated state
          // console.log(
          //   "this.state.responses ========================>\n",
          //   this.state.responses
          // );
          await AsyncStorage.setItem(
            'responses',
            JSON.stringify(this.state.responses),
          );
        },
      );
    }
  };
  // =======================================================================================
  // ============================= SUMIT SURVEY  ===========================================
  // =======================================================================================

  handleSubmit = async () => {
    // console.log(
    //   "====================== S U B M I T ============================================="
    // );
    // code to handle the form submission goes here
    if (this.state.responses[this.state.index][0] === undefined) {
      Alert.alert("svp remplissez le champ avant d'avancer !");
    } else {
      try {
        const value = await AsyncStorage.getItem('profile');
        const parsedToken = JSON.parse(value);
        const token = jwtDecode(parsedToken);
        this.setState({
          modalVisible: true,
        });
        let allAnswers = this.state.responses.map((v, i) => {
          let tmp = {
            questionId: this.state.survey.questions[i].id,
            response: v,
          };

          return tmp;
        });
        //console.log("allAnswers:", allAnswers);

        api
          .answerSurvey(token.id, this.state.survey.id, allAnswers)
          .then(result => {
            ToastAndroid.show(
              `Félicitation vous avez gagné ${this.state.survey.points} points suit a votre participation au sondage.`,
              ToastAndroid.LONG,
            );
            this.setState({
              modalVisible: false,
            });
            setTimeout(() => {
              this.props.navigation.navigate('Home');
            }, 1500);
          })
          .catch(error => this.props.navigation.navigate('Acceuil'));
      } catch (e) {}
    }
  };

  render() {
    const {survey, index, lastIndex, modalVisible, loading} = this.state;
    const {questions} = survey;
    const isLastQuestion = index === questions.length - 1;
    return (
      <>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Color.secondary} />
          </View>
        ) : (
          <NativeBaseProvider>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: !modalVisible});
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Loading...</Text>
                  <ActivityIndicator size="large" color={Color.secondary} />
                </View>
              </View>
            </Modal>

            {survey && survey.questions.length > 0 ? (
              <SafeAreaView style={styles.container}>
                <View style={{height: HEIGHT / 3.5}}>
                  <MenuHeaders
                    // navigation={navigation}
                    // userInfo={userInfo}
                    title=""
                  />
                </View>
                <Text style={styles.title}>
                  {survey.title ? survey.title.toUpperCase() : ''}
                </Text>
                <View
                  style={{
                    backgroundColor: Color.Quaternary,
                    flex: 1,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 30,
                  }}>
                  <View style={styles.renderQuestionContainer}>
                    <Text style={styles.question}>
                      {survey.questions[index].title}
                    </Text>
                  </View>
                  <View style={{width: '95%', alignSelf: 'center'}}>
                    <View style={styles.responseContainer}>
                      {survey.questions[index].type === 'RADIO' ? (
                        <ScrollView>
                          <Radio.Group
                            style={styles.radioGroup}
                            mt="5"
                            mb="5"
                            name="myCheckboxGroup"
                            colorScheme="info"
                            onChange={this.updateResponse}
                            value={
                              this.state.responses[this.state.index][0]
                                ? this.state.responses[this.state.index][0]
                                : ''
                            }>
                            {survey.questions[this.state.index].choices.map(
                              value => (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start', // add this line
                                    marginBottom: 10,
                                    width: '100%',
                                    borderWidth: 1,
                                    height: HEIGHT / 15,
                                    borderRadius: 10,
                                    backgroundColor:
                                      Color.backGroundColorSurvey,
                                    borderColor: Color.borderColor,
                                  }}
                                  key={value.id}>
                                  <Radio
                                    style={[
                                      styles.radioInput,
                                      {alignItems: 'center'},
                                    ]}
                                    key={value.id}
                                    value={value.id}
                                    _text={{
                                      fontSize: 16,
                                      fontFamily: Font.primary,
                                      fontWeight: 'bold',
                                      textTransform: 'capitalize',
                                      color: Color.text,
                                      flexWrap: 'wrap',
                                      // textAlign:'center'
                                    }}
                                  
                                    >
                                    {value.content}
                                  </Radio>
                                </View>
                              ),
                            )}
                          </Radio.Group>
                        </ScrollView>
                      ) : survey.questions[index].type === 'CHECKBOX' ? (
                        <ScrollView>
                          <Checkbox.Group
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                            }}
                            mt="5"
                            mb="5"
                            name="myRadioGroup"
                            colorScheme="info"
                            onChange={this.updateResponse}
                            value={this.state.responses[index]}>
                            {survey.questions[index].choices.map((value, i) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    width: '100%',
                                    borderWidth: 1,
                                    // padding:"1%",
                                    height: HEIGHT / 18,
                                    borderRadius: 10,
                                    paddingLeft: 8,
                                    backgroundColor:
                                      Color.backGroundColorSurvey,
                                    borderColor: Color.borderColor,
                                  }}
                                  key={value.id}>
                                  <Checkbox
                                    value={value.id}
                                    key={i}
                                    colorScheme="info"
                                    _text={{
                                      fontSize: 16,
                                      fontFamily: Font.primary,
                                      fontWeight: 'bold',
                                      textTransform: 'capitalize',
                                      color: Color.text,
                                      flexWrap: 'wrap',
                                    }}>
                                    {value.content}
                                  </Checkbox>
                                </View>
                              );
                            })}
                          </Checkbox.Group>
                        </ScrollView>
                      ) : survey.questions[index].type === 'TEXT' ? (
                        <View style={{width: '90%', alignSelf: 'center'}}>
                          <TextInput
                            onSubmitEditing={event => {
                              this.updateResponse(event.nativeEvent.text);
                              this.setState({
                                text: event.nativeEvent.text,
                              });
                            }}
                            placeholder="Enter some text"
                            editable
                          />
                          <View style={{alignSelf: 'center'}}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 16,
                                letterSpacing: 1.8,
                              }}>
                              Ton reponse est :{' '}
                            </Text>

                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 16,
                                letterSpacing: 1.8,
                                marginTop: '3%',
                                fontFamily: Font.primary,
                              }}>
                              {this.state.responses[index].toString()}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <Text>Invalid question type</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      disabled={index == 0}
                      onPress={() => this.previousQuestion()}>
                      {/* <Foundation
                        name="arrow-left"
                        size={HEIGHT * 0.1}
                        color={index == 0 ? '#CAD3C8' : Color.tertiary}
                      /> */}
                      <Text
                        style={{
                          color: index == 0 ? '#CAD3C8' : Color.tertiary,
                          fontSize: 18,
                          fontWeight: 'bold',
                          backgroundColor:
                            index == 0 ? '#CAD3C8' : Color.secondary,
                          borderRadius: 10,
                          padding: '5%',
                          color: '#fff',
                        }}>
                        Précédent
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        this.state.index ===
                          this.state.survey.questions.length - 1 || lastIndex
                          ? this.handleSubmit()
                          : this.nextQuestion()
                      }>
                      {/* <Foundation
                        name={
                          isLastQuestion || lastIndex ? 'check' : 'arrow-right'
                        }
                        size={HEIGHT * 0.1}
                        color={
                          isLastQuestion || lastIndex ? 'green' : Color.tertiary
                        }
                      /> */}
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          backgroundColor: '#2d3436',
                          borderRadius: 10,
                          padding: '5%',
                          color: '#fff',
                        }}>
                        {isLastQuestion || lastIndex
                          ? '  Valider  '
                          : '  Suivant  '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            ) : (
              <SwitchPage />
            )}
          </NativeBaseProvider>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Font.primary,
  },
  renderQuestionContainer: {
    width: '100 %',
    alignSelf: 'center',
    padding: '5%',
    maxHeight: 400, // set a maximum height that makes sense for your design
    overflow: 'scroll', // ensure that the content is scrollable even when it's not overflowing the container
  },

  question: {
    color: '#000',
    fontSize: 20,
    fontFamily: Font.primary,
    letterSpacing: 1.6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responseContainer: {
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    // marginTop: '3%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '50%',
    margin: '5%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: '12%',
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Font.primary,
    fontWeight: 'bold',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: '2%',
    fontSize: 16,
    fontFamily: Font.primary,
  },
  radioInput: {
    // marginTop: '2%',
    // marginLeft: '3%',
    paddingLeft:8
  },
});
