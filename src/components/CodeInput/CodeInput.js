import React, { useState } from 'react';
import { Animated, Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontFamily, FontSize, Color, Border, Padding } from "../../../GlobalStyles";
import LottieView from 'lottie-react-native';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const CELL_BORDER_RADIUS = 30;
const CELL_SIZE = 40;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({ hasValue, index, isFocused }) => {
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

export const CodeInput = ({ sendCode, resend_code }) => {
    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);

        return (
            <AnimatedText
                key={index}
                style={styles.cell}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    return (
      
          <View style={styles.otpInner}>
              
              <Text style={styles.tonCodeOtp}>Ton Code OTP</Text>
              
              <Text style={styles.tapeIciLeContainer}>
                  <Text style={styles.tapeIciLe}>{`Tape ici le `}</Text>
                  <Text style={styles.codeOtp}>Code (OTP)</Text>
                  <Text style={styles.tapeIciLe}> que tu viens de recevoir</Text>
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
  
              <TouchableOpacity style={[styles.buttons, styles.wrapperFlexBox]} onPress={() => {
                  if (value.length === 6) {
                      sendCode(value);
                  }
              }}>
              <Text style={[styles.text9, styles.textTypo]}>Valider</Text>
              </TouchableOpacity>
  
              <View style={styles.textGroup}>
            <Text style={styles.text8}>
              <Text style={styles.jeNaiPas}>Je n’ai pas reçu de code.</Text>
                  <Text style={styles.resendText} onPress={resend_code}> renvoyer le code</Text>
              </Text>
  
              <View style={[styles.otpChild, styles.otpIconLayout, { width: 300, height: 300 }]}>
  <LottieView
    source={require('../../assets/animated/otpa.json')}
    autoPlay
    loop
  />
</View>


      <Image
        style={[styles.otpItem, styles.otpIconLayout]}
        resizeMode="cover"
        source={require("../../assets/assetsnew/group-6356360.png")}
      />
   
 
          </View>
          </View>
  );
};
  

const styles = StyleSheet.create({

  buttonsFlexBox: {
    justifyContent: "center",
    marginTop: 24,
  },
  textPosition: {
    width: "15%",
    height: "100%",
    bottom: "0%",
    top: "0%",
    justifyContent: "center",
    position: "absolute",
  },
  wrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.nums_size,
    lineHeight: 24,
    textAlign: "left",
  },
  otpIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  tonCodeOtp: {
    fontSize: FontSize.size_13xl,
    lineHeight: 39,
    fontFamily: FontFamily.poppinsBold,
    width: 240,
    textAlign: "left",
    fontWeight: "700",
    color: Color.black,
  },
  tapeIciLe: {
    fontFamily: FontFamily.customBody1,
  },
  codeOtp: {
    color: Color.accent,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  tapeIciLeContainer: {
    width: 315,
    marginTop: 24,
    lineHeight: 24,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  text1: {
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    left: "0%",
    top: "0%",
    color: Color.accent,
    lineHeight: 24,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  text: {
    width: 40,
    height: 24,
  },
  text2: {
    display: "none",
    color: Color.black,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  icons: {
    width: 24,
    display: "none",
    height: 24,
  },
  wrapper: {
    alignSelf: "stretch",
    borderRadius: Border.br_11xl,
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    borderWidth: 1,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: "row",
  },
  textField1: {
    right: "68.13%",
    left: "16.88%",
    bottom: "0%",
  },
  textField2: {
    right: "85%",
    bottom: "0%",
    left: "0%",
  },
  textField3: {
    right: "51.25%",
    left: "33.75%",
    bottom: "0%",
  },
  textField4: {
    right: "34.38%",
    left: "50.63%",
    bottom: "0%",
  },
  textField5: {
    right: "18.13%",
    left: "66.88%",
    bottom: "0%",
  },
  textField6: {
    right: "0.63%",
    left: "84.38%",
    bottom: "0%",
  },
  buttonsLayout: {
    height: 48,
    width: 320,
  },
  textFieldWrapper: {
    marginTop: 16,
  },
  textParent: {
    alignItems: "center",
    justifyContent: "center",
  },
  jeNaiPas: {
    fontFamily: FontFamily.customBody1,
  },
  renvoyer: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  text8: {
    fontSize: FontSize.nums_size,
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
  },
  text9: {
    color: Color.primary,
  },
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    height: 48,
    width: 320,
    justifyContent: "center",
    marginTop: 24,
  },
  textGroup: {
    marginTop: 32,
  },
  otpInner: {
    top: 80,
    left: 20,
    position: "absolute",
  },
  otpChild: {
    height: 200,
    width: "100.83%",
    top: 70,
    right: "11.11%",
    bottom: "8.96%",
    left: "3.06%",
  },
  otpItem: {
    height: "1008.19%",
    top: "1200.81%",
    right: "0%",
    bottom: "0%",
    left: "-50%",
    width: "200%",
    maxWidth: "100%",
  },
  groupIcon: {
    height: 100,
    width: 100,
    top: 200,
    right: "18.06%",
    bottom: "21.19%",
    left: "4.44%",
  },
  vectorIcon: {
    height: "3.06%",
    width: "12.13%",
    top: "81.51%",
    right: "17.63%",
    bottom: "15.44%",
    left: "70.25%",
  },
  vectorIcon1: {
    height: "3.23%",
    width: "5.99%",
    top: "80.43%",
    right: "16.65%",
    bottom: "16.34%",
    left: "77.35%",
  },
  otp: {
    height: 800,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },

   
   
    codeFieldRoot: {
        marginTop: 20,
        paddingHorizontal: 10,
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      lineHeight: CELL_SIZE - 5,
      fontSize: 24,
      textAlign: 'center',
      margin: 5,
      borderRadius: CELL_BORDER_RADIUS,
      backgroundColor: 'white',
      
      // Shadow configurations
      shadowColor: '#FFA500', // Orange
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5, // for Android
    },
  
    resendCodeText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    resendText: {
        color: '#FFC700',
    },
});

export default CodeInput;
