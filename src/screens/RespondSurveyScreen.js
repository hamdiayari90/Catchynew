import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../services/api";
import {
  NativeBaseProvider,
  Text,
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  Radio,
  Checkbox,
} from "native-base";
import { Color, Font } from "../constants/colors/color";
import { HEIGHT, WIDTH } from "../utils/Dimension";
import { SwitchPage } from "../components/SwitchPage/SwitchPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { navigate } from "../navigation/RootNavigation";
export default function ResponseSurveyScreen(props) {
  const [fetching, setFetching] = useState(true);
  const [survey, setSurvey] = useState({});
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [dependent, setDependent] = useState(false);
  const [skipedQuestion, setSkipedQuestion] = useState(0);
  const [path, setPath] = useState([0]);
  const [confirm, setConfirm] = useState(true);
  const [responseValue, setResponseValue] = useState(null);
  const [isLastIndex, setIsLastIndex] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  let resp = "";
  let checkResponseValue = "";

  useEffect(() => {
    api
      .getSurveyById(props.route.params.surveyId)
      .then((res) => {
        setSurvey(res.data);
        let resp = [];
        if (res.data) {
          res.data.questions.forEach(() => resp.push([]));
          setResponses(resp);
        }
        setFetching(false);
      })
      .catch((error) => {
        Alert.alert("check your internet connection !", "no connection", [
          { text: "OK", onPress: () => props.navigation.navigate("Home") },
        ]);
      });
  }, []);

  const prevQuestion = () => {
    //  here i need to check if the question is dependant or not
    // setResponses((prev)=> prev[index] = [])
    let i = index - 1;
    let res = [...responses];
    res[index] = [];
    setResponses(() => res);
    if (confirm === false) {
      setConfirm(true);
    }

    if (path.indexOf(index - 1) !== -1) {
      setIndex(index - 1);
    } else {
      while (path.indexOf() == -1 && index > 0 && i > 0) {
        i = i - 1;
        setIndex(i);
      }
    }
  };
  const nextQuestion = () => {
    if (index < survey.questions.length - 1 === false) {
      setConfirm(false);
    }
    if (resp.length > 0) {
      if (index < survey.questions.length - 1 === false) {
        setConfirm(false);
      }
      setQuestionInput(() => resp);
      updateResponse(resp);

      setIndex(index + 1);
      setPath((prev) => [...prev, index + 1]);
    } else if (responses[index][0] == undefined || responses[index][0] === "") {
      Alert.alert("svp remplissez le champ avant d'avancer");
    } else {
      //  here we should now if it s depanding question or no ??

      if (
        survey.questions[index].dependencyResponse == 1 &&
        responses[index][0] == survey.questions[index].choices[1].id
      ) {
        setConfirm(() => false);
        setIsLastIndex(true);
        setIndex(index + 1);
        setPath((prev) => [...prev, index + 1]);
        if (index < survey.questions.length - 1 === false) {
          setConfirm(false);
          setIsLastIndex(true);
        }
      } else {
        // here we need to check if the current index is greater then the questionDEpendecies
        if (index > survey.questions[index].questionDependency - 1) {
          if (index < survey.questions.length - 1 === false) {
            setConfirm(false);
            setIsLastIndex(true);
          }
          setIndex(index + 1);
          setPath((prev) => [...prev, index + 1]);
        } else {
          // if (survey.questions[index].questionDependency - 1 < survey.questions.length - 1) {
          //   setConfirm(false);
          // }
          setIndex(survey.questions[index].questionDependency - 1);
          setPath((prev) => [
            ...prev,
            survey.questions[index].questionDependency - 1,
          ]);
        }
      }
    }
  };

  const updateResponse = async (value) => {
    setCurrentValue(() => value);
    setCurrentValue(() => value);

    if (value.length > 0 || Array.isArray(value)) {
      if (index < survey.questions.length - 1 === false) {
        setConfirm(false);
        setIsLastIndex(true);
      }

      let newArray = [...responses];
      if (Array.isArray(value)) {
        newArray[index] = value;
      } else {
        newArray[index] = [value];
      }

      setResponses(() => newArray);
    }
  };

  const submit = async () => {
    try {
      const value = await AsyncStorage.getItem("profile");
      const parsedToken = JSON.parse(value);
      const token = jwtDecode(parsedToken);

      if (resp.length > 0) {
        setConfirm(false);
        setQuestionInput(() => resp);
        await updateResponse(resp);
        await updateResponse(resp);

        setFetch(true);
        const data = responses.map((v, i) => {
          let tmp = {
            questionId: survey.questions[i].id,
            response: v.length > 0 ? v : [resp],
          };

          return tmp;
        });

        // console.log("props.route.params:", props.route.params.userId);
        // console.log("survey.id:", survey.id);
        // console.log("data ====>IN ANSWERSURVEY With TEXT INPUT ====>  :", data);

        api
          .answerSurvey(token.id, survey.id, data)
          .then(() => {
            ToastAndroid.show(
              `Félicitation vous avez gagné ${survey.points} points suit a votre participation au sondage.`,
              ToastAndroid.LONG
            );
            props.navigation.goBack();
          })
          .catch((error) => Alert.alert("veuillez contacter l'administrateur"))
          .finally(() => setFetch(false));
      } else {
        setFetch(true);
        const data = responses.map((v, i) => {
          let tmp = {
            questionId: survey.questions[i].id,
            response: v ? v : [currentValue],
          };

          return tmp;
        });
        // console.log("props.route.params:", props.route.params.userId);
        // console.log("survey.id:", survey.id);
        // console.log("data ====>IN ANSWERSURVEY With TEXT INPUT ====>  :", data);

        api
          .answerSurvey(token.id, survey.id, data)
          .then(() => {
            ToastAndroid.show(
              `Félicitation vous avez gagné ${survey.points} points suit a votre participation au sondage.`,
              ToastAndroid.LONG
            );
            props.navigation.goBack();
          })
          .catch((error) =>
          Alert.alert("veuillez contacter l'administrateur")

          )
          .finally(() => setFetch(false));
      }
    } catch (e) {}
  };

  /* --------------- */
  function SurveyQuestion(props) {
    return (
      <Box
        width={WIDTH}
        bg="#d4b7eb"
        style={styles.questionBox}
        p={4}
        shadow={4}
        _text={{
          fontSize: "xs",
          fontWeight: "bold",
        }}
      >
        <Text
          style={{
            fontFamily: Font.primary,
            letterSpacing: 1.2,
            fontWeight: "bold",
          }}
        >
          {props.question.title}
        </Text>
      </Box>
    );
  }

  const SurveyQuestionChoices = (props) => {
    const getChoiceComponent = () => {
      switch (props.type) {
        case "TEXT":
          return (
            <TextChoice
              setConfirm={setConfirm}
              index={index}
              survey={survey}
              choices={props.choices}
            />
          );

        case "RADIO":
          return <RadioChoice choices={props.choices} />;

        case "CHECKBOX":
          return <CheckboxChoice choices={props.choices} />;
      }
      return null;
    };

    return (
      <Box width="90%" bg="#d4b7eb" style={styles.choicesBox} p={4}>
        <ScrollView>{getChoiceComponent()}</ScrollView>
      </Box>
    );
  };

  // ****************************************************************************************************************************
  // ****************************************************************************************************************************
  // *******************************************************EXT CHOISES ***************************************************
  // ****************************************************************************************************************************
  // ****************************************************************************************************************************
  const TextChoice = (props) => {
    const handleChange = (e) => {
      if (props.choices.length === 0) {
        if (props.index < props.survey.questions.length - 1 === false) {
          //e.preventDefault()
          props.setConfirm(false);
        }
      }
      resp = e.nativeEvent.text;
    };

    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Réponse"
          onChange={handleChange}
          value={responses[index][0]}
        />
      </View>
    );
  };

  // ****************************************************************************************************************************
  // ****************************************************************************************************************************
  // *******************************************************EXT CHOISES ***************************************************
  // ****************************************************************************************************************************
  // ****************************************************************************************************************************

  function RadioChoice(props) {
    return (
      <Radio.Group
        mt="5"
        mb="5"
        name="myCheckboxGroup"
        colorScheme="info"
        onChange={updateResponse}
        value={responses[index][0]}
      >
        {props.choices.map((value, index) => (
          <View
            style={{
              borderWidth: 1,
              height: 45,
              borderRadius: 40,
              marginVertical: 8,
              width: "100%",
              backgroundColor: "#9980FA",
              justifyContent: "center",
              alignItems: "flex-start",
              alignSelf: "center",
              paddingTop: 10,
              paddingLeft: 16,
            }}
            key={value.id}
          >
            <Radio
              key={value.id}
              value={value.id}
              _text={{
                fontSize: 15,
                letterSpacing: 1.2,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: Font.primary,
              }}
              marginBottom={2}
            >
              {value.content}
            </Radio>
          </View>
        ))}
      </Radio.Group>
    );
  }

  function CheckboxChoice(props) {
    return (
      <Checkbox.Group
        mt="5"
        mb="5"
        name="myRadioGroup"
        colorScheme="info"
        onChange={updateResponse}
        value={responses[index]}
      >
        {props.choices.map((value, index) => {
          return (
            <View
              style={{
                borderWidth: 1,
                height: 45,
                borderRadius: 40,
                marginVertical: 8,
                width: "100%",
                backgroundColor: "#9980FA",
                justifyContent: "center",
                alignItems: "flex-start",
                alignSelf: "center",
                paddingTop: 10,
                paddingLeft: 16,
              }}
              key={value.id}
            >
              <Checkbox
                value={value.id}
                key={index}
                _text={{
                  fontSize: 15,
                  letterSpacing: 1.2,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: Font.primary,
                }}
                marginBottom={2}
              >
                {value.content}
              </Checkbox>
            </View>
          );
        })}
      </Checkbox.Group>
    );
  }
  /* --------------- */

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {fetch ? (
          <SwitchPage />
        ) : (
          <View style={styles.innerContainer}>
            {!fetching && (
              <>
                <SurveyQuestion question={survey.questions[index]} />
                <SurveyQuestionChoices
                  choices={survey.questions[index].choices}
                  type={survey.questions[index].type}
                />
                <Button.Group
                  style={styles.prevNextBtns}
                  variant="solid"
                  space={100}
                  mt="10"
                  mx={{
                    base: "auto",
                    md: 0,
                  }}
                >
                  <Button
                    isDisabled={index == 0}
                    onPress={prevQuestion}
                    backgroundColor={Color.tertiary}
                    px="5"
                    width={20}
                    startIcon={<ChevronLeftIcon />}
                    _text={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  ></Button>

                  <Button
                    onPress={confirm ? nextQuestion : submit}
                    backgroundColor={Color.tertiary}
                    px="5"
                    width={20}
                    endIcon={
                      confirm ? <ChevronRightIcon /> : <CheckIcon size="xs" />
                    }
                    _text={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  ></Button>
                </Button.Group>
              </>
            )}
          </View>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
  },
  questionBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Color.primary,
    height: HEIGHT / 6,
    // marginVertical: 10,
    width: WIDTH - 50,
    borderWidth: 0.5,
    borderColor: "#ffaf40",
  },
  choicesBox: {
    marginTop: "10%",
    borderRadius: 10,
    width: WIDTH - 50,
    backgroundColor: "#cd84f1",
  },
  prevNextBtns: {
    position: "absolute",
    bottom: 40,
  },
});
