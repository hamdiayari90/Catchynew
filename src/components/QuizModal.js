import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const QuizModal = ({ visible, onClose, questions }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      onClose();  // Close the modal if it's the last question.
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{questions[currentStep]?.title}</Text>
        {questions[currentStep]?.choices.map((choice, index) => (
          <TouchableOpacity key={index}>
            <Text>{choice.content}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          {currentStep > 0 && (
            <TouchableOpacity onPress={handlePrevious} style={{ marginRight: 10 }}>
              <Text>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={{ padding: 20 }}>
        <Text>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};
