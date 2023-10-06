import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import { Color, FontFamily, FontSize, Padding, Border } from "../../assets/survey/GlobalStyles";

import {HEIGHT} from '../../utils/Dimension';
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
        `http://94.237.82.88:8082/surveys/${this.props.route.params.surveyId}`,
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
  updateResponseForMultipleChoice(valueId) {
    let responses = [...this.state.responses];
    const indexResponses = responses[this.state.index];
    
    if (indexResponses.includes(valueId)) {
        // If the valueId already exists in the responses, remove it
        const updatedIndexResponses = indexResponses.filter(id => id !== valueId);
        responses[this.state.index] = updatedIndexResponses;
    } else {
        // If the valueId does not exist in the responses, add it
        responses[this.state.index].push(valueId);
    }
    
    this.setState({ responses: responses });
}

  // =======================================================================================
  // ============================= SUMIT SURVEY  ===========================================
  // =======================================================================================

  handleSubmit = async () => {
    // console.log(
    //   "====================== S U B M I T ============================================="
    // );
    // code to handle the form submission goes here
    if (this.state.responses[this.state.index][0] === undefined) {
      Alert.alert("Veillez remplisser les champs svp !");
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
  updateResponseForChoice = (choiceId) => {
    let updatedResponses = [...this.state.responses];
    updatedResponses[this.state.index] = [choiceId];
    this.setState({ responses: updatedResponses });
}
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
            
                <View style={styles.frameParent5}>
                  <Text style={styles.modalText}>Merci ! Vous avez accumulé vos points</Text>
                  <ActivityIndicator size="large" color={Color.secondary} />
                </View>
       
            </Modal>

            {survey && survey.questions.length > 0 ? (
              <SafeAreaView style={styles.container}>
                  <View style={[styles.maskGroup, styles.n1IconPosition]}>
        <Image
          style={[styles.n1Icon, styles.n1IconPosition]}
          resizeMode="cover"
          source={require("../../assets/survey/127773614-110363384232036-3311761003683354167-n-1.png")}
        />
        <View style={[styles.buttons1, styles.buttonsFlexBox]}>
          <Image
            style={styles.icons}
            resizeMode="cover"
            source={require("../../assets/survey/icons1.png")}
          />
        </View>
        <Image
          style={styles.maskGroupChild}
          resizeMode="cover"
          source={require("../../assets/survey/group-6356506.png")}
        />
      </View>
      <Text style={styles.text8}>                        {survey.questions[index].title}

</Text>
                <Text style={styles.title}>
                </Text>
                <View
                  style={{
                    flex: 1,
                    width: '95%',
                    alignSelf: 'center',
               
                  }}>
                  <View style={styles.frameParent}>
                  </View>
                  <View style={{ width: '95%', left: '5%', alignSelf: 'center' }}>
    <View style={styles.frameParent}>
        {survey.questions[index].type === 'RADIO' ? (
            <ScrollView>
                {survey.questions[this.state.index].choices.map(value => (
                    <TouchableOpacity
                        key={value.id}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',  // centers the text horizontally
                            width: '100%',
                            height: HEIGHT / 20,  // increased height
                            backgroundColor: 
                                this.state.responses[this.state.index][0] === value.id 
                                ? 'black' 
                                : 'lightgray',
                            padding: 10,
                            marginVertical: 5,  // adds space between answers
                            borderRadius: 5,  // optional: rounds the corners a bit
                        }}
                        onPress={() => this.updateResponseForChoice(value.id)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: FontFamily.interSemiBold,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                color: 'white',
                                flexWrap: 'wrap',
                                textAlign: 'center',  // centers the text within its container
                            }}
                        >
                            {value.content}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
                      ) : survey.questions[index].type === 'CHECKBOX' ? (
                        <ScrollView style={{ width: '95%', left: '-20%', alignSelf: 'center' }}>

                            {survey.questions[index].choices.map((value, i) => {
                                const isSelected = this.state.responses[index].includes(value.id);
                    
                                return (
                                    <TouchableOpacity
                                        key={value.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 15,  // Added more space between options
                                            width: '100%',
                                            height: HEIGHT / 20,  // Increased height for a larger background
                                            borderRadius: 10,
                                            paddingLeft: 8,
                                            backgroundColor: isSelected ? 'black' : 'lightgray',
                                            borderColor: Color.borderColor,
                                            justifyContent: 'center',  // Centers the text horizontally
                                            borderWidth: isSelected ? 0 : 1, // Hide border when selected
                                        }}
                                        onPress={() => this.updateResponseForMultipleChoice(value.id)} // A method to handle adding/removing from the responses array
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: FontFamily.interSemiBold,
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize',
                                                color: isSelected ? 'white' : Color.text,  // If selected, text is white. Else, use the default color.
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            {value.content}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
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
                                fontFamily: FontFamily.interSemiBold,
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
    style={styles.buttons}
    disabled={index == 0}
    onPress={() => this.previousQuestion()}
>
    {/* If you don't need the Foundation component, just remove the commented out part */}
    <Text style={styles.text9}>
        {index == 0 ? 'Précédent' : 'Précédent'}
    </Text>
    {/* You might want to remove this view if it's not needed anymore */}
    <View style={{ height: 60 }} />
</TouchableOpacity>

                    <TouchableOpacity
    style={styles.buttons}
    onPress={() =>
        this.state.index === this.state.survey.questions.length - 1 || lastIndex
            ? this.handleSubmit()
            : this.nextQuestion()
    }
>
    {/* If you don't need the Foundation component, just remove the commented out part */}
    <Text style={styles.text9}>
        {isLastQuestion || lastIndex ? 'Valider' : 'Suivant'}
    </Text>
    {/* You might want to remove this view if it's not needed anymore */}
    <View style={{ height: 60 }} />
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
  buttons: {
    backgroundColor: Color.black,
    marginTop: 24,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    height: 48,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FontFamily.interSemiBold,
  },
  maskGroupChild: {
    top: 60,
    left: 67,
    width: 76,

    position: "absolute",
  },
  n1IconPosition: {
    left: -5,
    top: -20,
    position: "absolute",
  },
  n1Icon: {
    top: 0,
    width: 400,
    height: 200,
  },
  maskGroup: {
    width: 200,
    height: 70,
  },
  renderQuestionContainer: {
    width: '100 %',

    alignSelf: 'center',
    padding: '5%',
    maxHeight: 400, // set a maximum height that makes sense for your design
    overflow: 'scroll', // ensure that the content is scrollable even when it's not overflowing the container
  },
  icons: {
    width: 24,
    height: 24,
  },
  question: {
    color: '#000',
    fontSize: 20,
    fontFamily: FontFamily.interSemiBold,
    letterSpacing: 1.6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frameParent: {
    top: 161,
    left: 50,
    position: "absolute",
  },
    frameParent5: {
      position: 'absolute',   // Position it at the bottom
      bottom: 0,              // Start from bottom of the screen
      left: 0,                // Start from the left of the screen
      right: 0,               // End at the right of the screen
      alignItems: 'center',   // Align inner items to the center
      justifyContent: 'center',// Vertically center the inner content
      backgroundColor: 'white',  // Background color
      borderTopLeftRadius: 10,  // Radius
      borderTopRightRadius: 10, // Radius
      padding: 10,               // Padding for better spacing
    },
  text8: {
    marginLeft: -29,
    top: 5,
    left: "50%",
    fontSize: 18,
    lineHeight: 29,
    color: "black",
    width: 168,
    textTransform: "capitalize",
    textAlign: "left",
    fontWeight: "600",
    position: "absolute",
  },
  text9: {
    top: 8,
    left: "40%",
    fontSize: 16,
    lineHeight: 29,
    color: Color.primary,
    width: 168,
    textTransform: "capitalize",
    textAlign: "left",
    fontWeight: "600",
    position: "absolute",
  },
  responseContainer: {
    alignSelf: 'center',
    width: '50%',
    justifyContent: 'center',
    // marginTop: '3%',
  },
  buttonContainer: {
    flexDirection: 'column',
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
    fontFamily: FontFamily.interSemiBold,
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
  },
  radioInput: {
    // marginTop: '2%',
    // marginLeft: '3%',
    paddingLeft:8
  },
});
