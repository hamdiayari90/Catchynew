import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize, Padding } from "../../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HEIGHT, WIDTH } from '../utils/Dimension';

export default function Step1Profile({ route, navigation }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // For iOS, you'll want to keep it true
    setFormData(prevState => ({ ...prevState, birthDay: currentDate.toLocaleDateString('en-GB') }));
};

  const { data } = route.params;
  const [formData, setFormData] = useState({
    ...data,
    firstname: '',
    lastname: '',
    birthDay: '',
    sex: ''
  });

  const genders = ['Male', 'Female'];
  const [selectedGender, setSelectedGender] = useState(null);
  const validateForm = () => {
    const { firstname, lastname, birthDay, sex } = formData;

    // Ensure the first name and last name only contain letters
    const nameRegex = /^[a-zA-Z]+$/;

    if (!firstname || !firstname.match(nameRegex)) {
        alert('Veuillez saisir un prénom valide');
        return false;
    }

    if (!lastname || !lastname.match(nameRegex)) {
        alert('Veuillez saisir un nom de famille valide');
        return false;
    }

    if (!birthDay) {
        alert('Veuillez sélectionner votre date de naissance.');
        return false;
    }

    if (!sex) {
        alert('S\'il vous plait selectionnez votre genre.');
        return false;
    }

    return true;
};

  return (
    <View style={styles.step1Profile}>
      <View style={styles.frameParent}>
        <View>
          <View>
            <View>
              <View>
                <View style={styles.frameWrapper1}>
                  <View>
                    <Text style={[styles.salut, styles.salutFlexBox]}>
                      Salut,
                    </Text>
                    <Text
                      style={[styles.onFaitConnaissance, styles.salutFlexBox]}
                    >
                      On fait connaissance ? 😺
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.stepper}>
            <View style={styles.stepperInner}>
              <View style={[styles.frameChild, styles.childLayout]} />
            </View>
            <View style={[styles.stepperChild, styles.childLayout]} />
            <View style={[styles.stepperChild, styles.childLayout]} />
          </View>
        </View>
        <View style={styles.textFieldWrapper}>
          <View style={styles.textLayout}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
              <View style={styles.wrapperInner}>
                <View style={styles.iconsParent}>
                  <Image
                    style={styles.icons}
                    resizeMode="cover"
                    source={require("../assets/assetsnew/icons15.png")}
                  />
                  <TextInput placeholder="Prénom"        color='gray'
 placeholderTextColor="gray"
onChangeText={text => setFormData({...formData, firstname: text})} style={styles.textWrapper} />

                  <View style={styles.textWrapper}>
                  </View>
                  <TextInput placeholder="Nom"      color='gray'
   placeholderTextColor="gray"
onChangeText={text => setFormData({...formData, lastname: text})} style={styles.textWrapper} />

                  <View style={styles.textWrapper}>
                  </View>
                  
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.textFieldWrapper}>
          <Text style={[styles.text1, styles.textTypo]}>
            Sélectionner votre sexe
          </Text>
          <View style={styles.instanceParent}>
            <View style={[styles.frameWrapper2, styles.wrapperBorder]}>
           
              <View style={styles.groupFlexBox}>
              <Pressable
onPress={() => {
  setSelectedGender('Male');
  setFormData({...formData, sex: 'h'});
}}
style={{position: 'relative'}}
>
{selectedGender === 'Male' && (
  <View style={[styles.frameItem, styles.grayOverlay]}></View>
)}
<Image
  style={styles.frameItem}
  resizeMode="cover"
  source={require("../assets/assetsnew/group-63563301.png")}
/>
</Pressable>
                <View style={styles.textContainer}>
                  <Text style={styles.textTypo}>Homme</Text>
                </View>
              </View>
            </View>
            <View style={[styles.frameWrapper2, styles.wrapperBorder]}>
         
              <View style={styles.groupFlexBox}>
              <Pressable
    onPress={() => {
      setSelectedGender('Female');
      setFormData({...formData, sex: 'f'});
    }}
    style={{position: 'relative'}}
  >
    {selectedGender === 'Female' && (
      <View style={[styles.frameInner, styles.grayOverlay]}></View>
    )}
    <Image
      style={styles.frameInner}
      resizeMode="cover"
      source={require("../assets/assetsnew/group-63563281.png")}
    />
  </Pressable>
                <View style={styles.textFrame}>
                  <Text style={styles.textTypo}>Femme</Text>
                </View>
                <View style={styles.rectangleView} />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.textField1, styles.textLayout]}>
          <View style={[styles.wrapper, styles.wrapperBorder]}>
            <View style={styles.wrapperInner}>
              <View style={styles.iconsParent}>
              {showDatePicker && (
    <DateTimePicker
        value={new Date()} // Default to today's date
        mode="date"
        display="default"
        onChange={handleDateChange}
    />
)}
                <Image
                  style={styles.icons}
                  resizeMode="cover"
                  source={require("../assets/assetsnew/icons15.png")}
                />
                <View style={styles.textWrapper}>
                            {/* When this field is pressed, the date picker will show up */}
                            <TextInput 
    placeholder="Date de naissance" 
    placeholderTextColor="gray"
    color='gray'
    value={formData.birthDay} 
    onFocus={() => setShowDatePicker(true)} 
    editable={true} // Prevent manual editing
/>
                                   </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
         style={styles.buttons}
         onPress={() => {
             if (validateForm()) {
                 navigation.navigate('Step2', { data: formData });
             }
         }}
     >
          <Text style={styles.text5}>Suivant</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.step1ProfileChild}
        resizeMode="cover"
        source={require("../assets/assetsnew/group-63563605.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  salutFlexBox: {
    textAlign: "left",
    color: Color.black,
    lineHeight: 39,
  },
  childLayout: {
    height: 8,
    borderRadius: Border.br_41xl,
    overflow: "hidden",
  },
  wrapperBorder: {
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderStyle: "solid",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  textTypo: {
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    fontSize: FontSize.nums_size,
    textAlign: "left",
    color: Color.black,
  },
  textLayout: {
    maxHeight: 48,
    minHeight: 48,
    justifyContent: "center",
    height: 48,
    width: 320,
  },
  salut: {
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
  },
  onFaitConnaissance: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 296,
  },
  frameWrapper1: {
    width: 320,
  },
  frameChild: {
    backgroundColor: Color.accent,
    alignSelf: "stretch",
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: Color.accent,
  },
  stepperInner: {
    width: 99,
    alignItems: "center",
  },
  stepperChild: {
    backgroundColor: Color.gainsboro,
    marginLeft: 16,
    flex: 1,
  },
  stepper: {
    marginTop: 24,
    flexDirection: "row",
    width: 320,
  },
  icons: {
    width: 24,
    height: 24,
  },
  textWrapper: {
    marginLeft: 8,
    justifyContent: "center",
    marginTop:-5,
    color: 'gray',
  },
  iconsParent: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_41xl,
    alignSelf: "stretch",
    flexDirection: "row",
    flex: 1,
  },
  textFieldWrapper: {
    marginTop: 32,
  },
  text1: {
    width: 264,
  },
  frameItem: {
    width: 71,
    height: 101,
    position: 'relative', // Add this
  },
  textContainer: {
    flexDirection: "row",
  },
  groupFlexBox: {
    height: 121,
    justifyContent: "space-between",
    alignItems: "center",
  },
  frameWrapper2: {
    borderRadius: Border.br_xl,
    width: 146,
    height: 140,
    padding: Padding.p_3xs,
    justifyContent: "center",
  },
  frameInner: {
    width: 73,
    height: 87,
    position: 'relative', // Add this
  },
  textFrame: {
    zIndex: 1,
    flexDirection: "row",
  },
  rectangleView: {
    position: "absolute",
    top: 61,
    left: 33,
    width: 3,
    height: 13,
    zIndex: 2,
    borderRadius: Border.br_41xl,
    backgroundColor: Color.white,
  },
  instanceParent: {
    marginTop: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    width: 320,
  },
  textField1: {
    marginTop: 32,
  },
  text5: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.primary,
    lineHeight: 24,
    fontSize: FontSize.nums_size,
    textAlign: "left",
  },
  grayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
        zIndex: 1

},
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    height: 48,
    marginTop: 32,
    flexDirection: "row",
    width: 320,
    alignItems: "center",
  },
 
  step1ProfileChild: {
    width: WIDTH * 1.99,    // 90% of screen width
    height: HEIGHT * 0.99,  // 80% of screen height
    marginTop: -0.02 * HEIGHT, // 2% of screen height
},

  step1Profile: {
    width: "100%",
    height: 800,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.white,
  },
});

