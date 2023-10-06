import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { Border, FontFamily, Color, Padding, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Step3({ route }) {
  const navigation = useNavigation();

  const { data } = route.params;

  // Consolidate the formData state
  const [formData, setFormData] = useState({
    ...data,
    interestIds: [],  // this will store an array of selected interest IDs
    loyalityPoints: 0,
    status: false
  });

  const [interests, setInterests] = useState([]);

  useEffect(() => {
    fetch('http://94.237.82.88:8082/interests')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInterests(data);
        } else {
          console.warn("Expected an array but received a different type for interests.");
        }
      })
      .catch(error => console.error('Error fetching interests:', error));
  }, []);

  const submitData = () => {
    if (!formData.username || !formData.password || !formData.email || !formData.mobilePhone || 
      !formData.firstname || !formData.lastname || !formData.birthDay || !formData.sex ||
      !formData.address || !formData.zipCode || (formData.interestIds && formData.interestIds.length === 0)) {
    // Alert user to complete all fields or handle error accordingly.
    alert("Remplissez tous les champs, s'il vous plaît.");
    return;
  }
  
    // Make the API POST request to your server.
    fetch('http://94.237.82.88:8082/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Here, navigate to a success screen or show a success message. 
      alert('Inscription réussie! Vous allez être redirigés vers la page de connexion');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // 5000 milliseconds = 5 seconds
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Échec de l\'enregistrement. Veuillez réessayer.');
    });
  };

  return (
    <View style={[styles.step3Preferences, styles.step3Layout]}>
      <View style={styles.step3PreferencesInner}>
        <View>
          <View>
            <View>
              <View>
                <View>
                  <View>
                    <View>
                      <Text style={styles.cestQuoiTes}>{`C’est quoi tes
préférences ?`}</Text>
                    </View>
                  
                </View>
              </View>
            </View>
            <View style={styles.stepper}>
              <View style={[styles.stepperChild, styles.childLayout]} />
              
              <View style={styles.stepperItem} />
              
              <View style={styles.stepperInner}>
                <View style={[styles.frameChild, styles.childLayout]} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Image
        style={[styles.step3PreferencesChild, styles.step3Layout]}
        resizeMode="cover"
        source={require("../assets/assetsnew/group-63563605.png")}
      />
      <View
        style={[
          styles.step3PreferencesInner1,
          styles.pillsButtonsParentFlexBox,
        ]}
      >
        <View>
        <View style={styles.container}>
      <View style={styles.line}>
        {interests.map((interest, index) => (
          <Pressable
            key={interest.id}
            style={[
              styles.listItem,
              formData.interestIds.includes(interest.id) && styles.selectedItem
            ]}
            onPress={() => {
              if (!formData.interestIds.includes(interest.id)) {
                setFormData((prevState) => ({
                  ...prevState,
                  interestIds: [...prevState.interestIds, interest.id],
                }));
              }
            }}
          >
            <Text style={styles.listItemText}>{interest.name}</Text>
          </Pressable>
        ))}
      </View>
          <View
            style={[
              styles.pillsButtonsParent,
              styles.pillsButtonsParentFlexBox,
            ]}
          >
            
          <TouchableOpacity
            style={styles.buttons}
            onPress={submitData}          >
            <Text style={[styles.text12, styles.textLayout]}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Image
        style={styles.step3PreferencesItem}
        resizeMode="cover"
        source={require("../assets/assetsnew/group-6356391.png")}
      />
    </View>
    </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childLayout: {
    height: 8,
    borderRadius: Border.br_41xl,
    overflow: "hidden",
  },
  pillsButtonsParentFlexBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  textTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    color: Color.black,
  },
  pillsFlexBox: {
    justifyContent: "center",
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.whitesmoke_100,
    borderRadius: Border.br_11xl,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  pillsSpaceBlock1: {
    marginLeft: 13,
    justifyContent: "center",
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.whitesmoke_100,
    borderRadius: Border.br_11xl,
    alignItems: "center",
    flexDirection: "row",
  },
  textLayout: {
    lineHeight: 24,
    textAlign: "left",
  },
  container: {
    padding: 0,
  },
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to next line if there are too many
    justifyContent: 'space-between', // Distributes items evenly on a line
    alignItems: 'stretch', // Makes items stretch vertically
  },
  listItem: {
    flexGrow: 1, // Allows item to grow and take up available space
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Curved border
    padding: 10,
    margin: 5, // Spacing between items
    backgroundColor: '#fff',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  selectedItem: {
    backgroundColor: 'gray', // Gray overlay when selected
  },
  listItemText: {
    fontSize: 16,
  },
  pillsSpaceBlock: {
    marginLeft: 18,
    paddingHorizontal: 13,
    paddingVertical: Padding.p_xs,
    height: 48,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    backgroundColor: Color.whitesmoke_100,
    alignItems: "center",
    flexDirection: "row",
  },
  cestQuoiTes: {
    fontSize: FontSize.size_13xl,
    lineHeight: 39,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 240,
    textAlign: "left",
    color: Color.black,
  },
  stepperChild: {
    backgroundColor: Color.gainsboro,
    height: 8,
    borderRadius: Border.br_41xl,
    flex: 1,
  },
  stepperItem: {
    marginLeft: 16,
    height: 8,
    backgroundColor: Color.gainsboro,
    borderRadius: Border.br_41xl,
    overflow: "hidden",
    flex: 1,
  },
  frameChild: {
    alignSelf: "stretch",
    backgroundColor: Color.accent,
    height: 8,
    borderRadius: Border.br_41xl,
  },
  stepperInner: {
    width: 99,
    alignItems: "center",
    marginLeft: 16,
  },
  stepper: {
    marginTop: 32,
    width: 320,
    flexDirection: "row",
  },
  step3PreferencesInner: {
    zIndex: 0,
    width: 320,
  },
  step3PreferencesChild: {
    width: 500,
    height: 500,
    top: 400,
    left: -100,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    textAlign: "left",
  },
  icons: {
    width: 18,
    height: 18,
    marginLeft: 6,
    display: "none",
  },
  pillsButtons1: {
    marginLeft: 8,
  },
  pillsButtons8: {
    width: 158,
    height: 40,
    marginLeft: 13,
  },
  pillsButtonsGroup: {
    marginLeft: 8,
    flexDirection: "row",
  },
  pillsButtons11: {
    height: 37,
  },
  pillsButtonsParent: {
    width: 316,
  },
  text12: {
    fontSize: FontSize.nums_size,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.primary,
  },
  buttons: {
    backgroundColor: Color.black,
    paddingHorizontal: Padding.p_base,
    marginTop: 16,
    paddingVertical: Padding.p_xs,
    height: 48,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    flexDirection: "row",
  },
  step3PreferencesInner1: {
    top: 150,
    left: 0,
    width: 318,
    zIndex: 2,
    position: "absolute",
  },
  text13: {
    fontSize: 19,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    color: Color.black,
  },
  icons12: {
    width: 24,
    height: 24,
    marginLeft: 8,
    display: "none",
  },
  pillsButtons12: {
    zIndex: 3,
  },
  pillsButtons13: {
    zIndex: 4,
  },
  step3PreferencesItem: {
    top: 400,
    left: 300,
    width: 100,
    height: 100,
    zIndex: 5,
    position: "absolute",
  },
  step3Preferences: {
    backgroundColor: Color.white,
    height: 800,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_45xl,
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
});

