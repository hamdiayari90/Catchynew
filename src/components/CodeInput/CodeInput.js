import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CostumButton} from '../Button/CostumButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import ErrorMessage from '../ErrorMessage';


const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export const CodeInput = ({sendCode, resend_code}) => {
  const [error, setError] = useState('');

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subTitle}>
        entrez le code de vérification S'il vous plait {'\n'}
        nous envoyons à votre adresse e-mail
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
     
     <TouchableOpacity style={styles.customButton}     onPress={() => {
            if (value.length == 6) {
              sendCode(value);
            } 
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                letterSpacing: 1.2,
                color: '#fff',
                paddingRight: '4%',
                fontSize: 18,
              }}>
              Envoyer
            </Text>
            <View style={{backgroundColor: 'blue', borderRadius: 30}}>
              <AntDesign name="arrowright" color="white" size={22} />
            </View>
          </View>
        </TouchableOpacity>

      <View style={styles.resendCode}>
        <Text>vous n'avez pas reçu le code? </Text>
        <Text style={styles.nextButtonText} onPress={() => resend_code()}>
          renvoyer le code
        </Text>
      </View>
    </SafeAreaView>
  );
};
