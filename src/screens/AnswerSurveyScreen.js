import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import * as api from '../services/api';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Checkbox, Input, VStack, Stack, Radio} from 'native-base';

export default function AnswerSurveyScreen({route, navigation}) {
  // const {id} = route.params.survey || "6adc0ab6-af28-466b-8d35-d055f6ae32be";
  const {id} = 'e7201cf6-75c4-496e-aaa7-0773abc461e8';

  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [response, setResponse] = useState([]);
  const [responses, setResponses] = useState([]);
  const [text, setText] = useState([]);
  const [step, setStep] = useState();
  const [indexNextQuestion, setIndexNextQuestion] = useState(0);
  const [surveyToAnswer, setSurveyToAnswer] = useState([]);
  const [textButton, setTextButton] = useState(['Suivant']);

  useEffect(() => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        api
          .getSurveyById('e7201cf6-75c4-496e-aaa7-0773abc461e8')
          .then(response => {
            for (let i = 0; i < response.data.questionsReturned.length; i++) {
              let resp = response.data.questionsReturned[i].response;
              let responses = [];
              if (resp) {
                responses =
                  response.data.questionsReturned[i].response.split(/\//);
              }
              setResponses(oldArray => [...oldArray, responses]);
              if (response.data.questionsReturned[i].choice) {
                setChoices(
                  response.data.questionsReturned[index].choices.split(/\//),
                );
              }
            }
            setSurveyToAnswer(response.data);
          })
          .catch(e => {
            Alert.alert("veuillez contacter l'administrateur");
          });
      }
    });

    // Met à jour le titre du document via l’API du navigateur
  }, []);

  useEffect(() => {
    if (step) {
      if (indexNextQuestion != 0) {
        setIndex(indexNextQuestion);

        if (surveyToAnswer.questionsReturned[indexNextQuestion].choices) {
          setChoices(
            surveyToAnswer.questionsReturned[indexNextQuestion].choices.split(
              /\//,
            ),
          );
        }
      } else {
        if (step == 'next') {
          setIndex(index => index + 1);
          if (surveyToAnswer.questionsReturned[index + 1].choices) {
            setChoices(
              surveyToAnswer.questionsReturned[index + 1].choices.split(/\//),
            );
          }
        } else if (step == 'previous' && index > 0) {
          setIndex(index => index - 1);
          if (surveyToAnswer.questionsReturned[index - 1].choices) {
            setChoices(
              surveyToAnswer.questionsReturned[index - 1].choices.split(/\//),
            );
          }
        }
      }
    }
  }, [indexNextQuestion, step]);
  useEffect(() => {
    setStep('');
    let found = false;
    if (
      index &&
      responses[index].length != 0 &&
      index != 0 &&
      index < surveyToAnswer.questionsReturned.length
    ) {
      let i = index;

      while (
        found == false &&
        i < surveyToAnswer.questionsReturned.length - 1
      ) {
        i = i + 1;

        let {dependencyResponse, questionDependency} =
          surveyToAnswer.questionsReturned[i];
        found =
          questionDependency == 0 ||
          (responses[questionDependency - 1].length != 0 &&
            responses[questionDependency - 1].includes(dependencyResponse));
      }

      if (i >= surveyToAnswer.questionsReturned.length - 1) {
        setTextButton('Terminer');
      }
      if (found) {
        setTextButton('Suivant');
        if (i >= surveyToAnswer.questionsReturned.length) {
          setIndexNextQuestion(i - 1);
          setTextButton('Terminer');
        } else setIndexNextQuestion(i);
      }
    }
  }, [responses, index]);

  const nextQuestion = () => {
    setStep('next');
  };

  const previousQuestion = () => {
    setTextButton('Suivant');
    testDependency();
    setStep('previous');
  };

  function TextType() {
    return (
      <Stack space={4} w="100%">
        <Input
          mt="10"
          mb="10"
          variant="rounded"
          onChangeText={updateResponse}
          //value={responses[index][0]}
          placeholder="Réponse"
          _light={{
            placeholderTextColor: 'blueGray.500',
          }}
          _dark={{
            placeholderTextColor: 'blueGray.50',
          }}
        />
      </Stack>
    );
  }

  const updateResponse = v => {
    let newArray = [...responses];
    if (Array.isArray(v)) {
      newArray[index] = v;
    } else {
      newArray[index] = [v];
    }
    setResponses(newArray);
  };

  function CheckboxType(props) {
    return (
      <View>
        <VStack space={3} alignItems="flex-start" mt="10" mb="10">
          <Checkbox.Group
            onChange={updateResponse}
            value={responses[index]}
            colorScheme="warning"
            accessibilityLabel="choose numbers">
            {props.choices.map((value, index) => {
              return (
                <Checkbox value={value} key={index} my={2}>
                  {value}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </VStack>
      </View>
    );
  }

  function RadioType(props) {
    return (
      <Radio.Group
        mt="10"
        mb="10"
        name="myRadioGroup"
        colorScheme="warning"
        size="md"
        accessibilityLabel="favorite number"
        value={responses[index][0]}
        onChange={updateResponse}>
        {props.choices.map((value, index) => {
          return (
            <Radio key={index} value={value} my={1}>
              {value}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }

  function TypeRendering(props) {
    const currentType = props.currentType;
    switch (currentType) {
      case 'text':
        return <TextType />;

      case 'checkBox':
        return <CheckboxType choices={choices} />;
      case 'radio':
        return <RadioType choices={choices} />;
      default:
        return <TextType />;
    }
  }

  function testDependency() {
    let i = index;
    let found = false;
    while (found == false && i > 0) {
      i = i - 1;
      let {dependencyResponse, questionDependency} =
        surveyToAnswer.questionsReturned[i];
      found =
        questionDependency == 0 ||
        (responses[questionDependency - 1].length != 0 &&
          responses[questionDependency - 1].includes(dependencyResponse));
    }
    if (found) {
      setIndexNextQuestion(i);
    }
  }

  function sendResponses() {
    for (let i = 0; i < surveyToAnswer.questionsReturned.length; i++) {
      surveyToAnswer.questionsReturned[i].response = responses[i].join('/');
    }

    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        let data = {
          token: token,
          responses: surveyToAnswer,
        };
        api
          .answerSurvey(surveyToAnswer)
          .then(response => {})
          .catch(e => {
            Alert.alert("veuillez contacter l'administrateur");
          });
      }
    });
  }

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  return (
    <>
      <View>
        <View style={{height: HEIGHT / 3.5}}>
          <MenuHeaders
            navigation={navigation}
            userInfo={userInfo}
            title="CADEAUX"
          />
        </View>
      </View>

      {/* <NativeBaseProvider config={config}  >
      {surveyToAnswer.length !== 0 && responses && (
        <Center flex={1} bg="indigo.400">
          <Box
            width="90%"
            bg="white"
            style={styles.borderBox}
            p={4}
            shadow={4}
            _text={{
              fontSize: "lg",
              fontWeight: "bold",
              color: "#fff",
              marginTop: "5",
            }}
          >
            {surveyToAnswer.questionsReturned[index].title ? surveyToAnswer.questionsReturned[index].title : ""}
            <TypeRendering
              currentType={surveyToAnswer.questionsReturned[index].type}
            />
          </Box>
          <Button.Group
            variant="solid"
            space={60}
            mt="10"
            mx={{
              base: "auto",
              md: 0,
            }}
          >
            <Button
              colorScheme="warning"
              startIcon={<ChevronLeftIcon />}
              _text={{
                fontWeight: "bold",
                color: "white",
              }}
              onPress={previousQuestion}
              isDisabled={index == 0}
            >
              Précédent
            </Button>

            <Button
              colorScheme="warning"
              endIcon={<ChevronRightIcon />}
              _text={{
                fontWeight: "bold",
                color: "white",
              }}
              onPress={textButton == "Suivant" ? nextQuestion : sendResponses}
              isDisabled={responses[index].length == 0}
            >
              {textButton}
            </Button>
          </Button.Group>
        </Center>
      )}
    </NativeBaseProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  box1: {
    flex: 5,
    alignItems: 'center',
  },
  //content
  box2: {
    flex: 1,
  },
  headerText: {
    color: 'blue',
  },
  clr: {
    color: 'white',
  },
  borderBox: {borderRadius: 20},
});
