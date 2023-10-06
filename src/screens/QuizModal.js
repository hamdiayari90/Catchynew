import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { baseUrl } from '../atom/responseSurveyState';
import { useRecoilValue } from 'recoil';

const updateLoyaltyPoints = async (user, points) => {
  let userPoint = user.loyaltyPoints + points;
  let id = user.id;

  const requestOptions = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    body: JSON.stringify({
      id: id,
      loyaltyPoints: userPoint,
    }),
  };
  const url = useRecoilValue(baseUrl);
  const [userPromotion, setUserPromotion] = useState({});
  const updatePoints = await fetch(`${url}/user/updateLoyltiPoint`, requestOptions);
  const checkUpdated = updatePoints.status;

  return checkUpdated;
};

const QuizModal = ({ onClose, onQuizFinish, user }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState([
    // Define your quizzes with their questions and answers here
    {
      questions: ['Aimez-vous Coca Cola Zero (Quiz 1 - Question 1) ?'],
      answers: ['Pas trop', 'Bien', 'Oui', 'Non'],
    },
    {
      questions: ['Aimez-vous la nouvelle canette de coca cola ?'],
      answers: ['Oui', 'Non', 'Pas trop', 'Trop'],
    },
    {
      questions: ['Aimez-vous les produits coca cola 2023 ?'],
      answers: ['Oui', 'Non', 'Pas trop', 'Trop'],
    },
    // Add more quizzes as needed
  ]);

  const [answers, setAnswers] = useState(Array(quizzes.length).fill(''));
  const [showMessage, setShowMessage] = useState(false); // State to show the message

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuizIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNextQuiz = () => {
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    setShowMessage(false); // Reset showMessage state when moving to the next quiz
  };

  const handleFinishQuiz = async () => {
    onQuizFinish(answers);
    if (currentQuizIndex === quizzes.length - 1) {
      // Show the message after finishing the last quiz
      setShowMessage(true);

      // Add 10 loyalty points to the user when they finish the quiz
      try {
        await updateLoyaltyPoints(user, 10);
      } catch (error) {
        console.error('Error updating loyalty points:', error);
        // Handle error if needed
      }
    }
  };

  const renderQuiz = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    return (
      <>
        {currentQuiz.questions.map((question, questionIndex) => (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
            {currentQuiz.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  answers[currentQuizIndex] === answer && styles.selectedAnswerButton, // Apply selected style
                ]}
                onPress={() => handleAnswer(answer)}
                disabled={showMessage} // Disable the options when the message is shown
              >
                <Text style={styles.answerButtonText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {renderQuiz()}
        {showMessage ? (
          <View>
            <Text style={styles.completedMessage}>
              Quizz terminée avec succès! Vous avez gagné 10 points
            </Text>
            <Button color="blue" onPress={onClose}>
              Fermer
            </Button>
          </View>
        ) : (
          <>
            {currentQuizIndex < quizzes.length - 1 && (
              <Button color="blue" onPress={handleNextQuiz}>
                Suivant
              </Button>
            )}
            {currentQuizIndex === quizzes.length - 1 && (
              <View style={{ marginTop: 16, flexDirection: 'row' }}>
                <Button color="blue" onPress={onClose}>
                  Annuler
                </Button>
                <Button mode="contained" onPress={handleFinishQuiz}>
                  Valider
                </Button>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
  questionContainer: {
    marginBottom: 16,
    flexDirection: 'column',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answerButton: {
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  selectedAnswerButton: {
    backgroundColor: 'blue', // Selected answer button background color
  },
  answerButtonText: {
    fontSize: 16,
  },
  completedMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 16,
  },
});

export default QuizModal;
