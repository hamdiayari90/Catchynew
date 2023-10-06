import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import { FontFamily, Padding, Border, FontSize, Color } from "../assets/policy/GlobalStyles";

const Policy = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('Généralités');
    const [expandedItem, setExpandedItem] = useState(null);
    const [contentData, setContentData] = useState({}); // <-- NEW: state to store fetched content
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        fetch('https://www.catchy.tn/policy.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setContentData(data))
        .catch(error => console.error('Error fetching data:', error));
        
    }, []);
    

    const items = [
        'Déclaration générale',
        'Qui sommes-nous ?',
        'Propriété Intellectuelle',
        'Collecte des données',
        'Utilisation des données personnel'
    ];
    const generalitiesContent = [
        'Déclaration générale',
        'Qui sommes-nous ?',
        'Propriété Intellectuelle'
    ];
    
    const dataManagementContent = [
        'Collecte des données',
        'Utilisation des données personnel'
    ];
    let currentContent = selectedTab === 'Généralités' ? generalitiesContent : dataManagementContent;
    
    return (
        <ScrollView style={styles.container}>
 <Text
              style={styles.politiqueDeConfidentialit}
            >{`Politique de Confidentialité
de Catchy`}</Text>
<View style={{ height: 20 }} />

            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tab, selectedTab === 'Généralités' && styles.selectedTab]} onPress={() => setSelectedTab('Généralités')}>
                    <Text style={styles.tabText}>Généralités</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, selectedTab === 'Gestion des Données' && styles.selectedTab]} onPress={() => setSelectedTab('Gestion des Données')}>
                    <Text style={styles.tabText}>Gestion des Données</Text>
                </TouchableOpacity>
            </View>
            {currentContent.map((item, index) => (
    <View key={index} style={styles.listItemContainer}>
        <TouchableOpacity style={styles.listItem} onPress={() => setExpandedItem(expandedItem === item ? null : item)}>
            <Text style={styles.itemText}>{item}</Text>
            <Image style={styles.icons} resizeMode="cover" source={require("../assets/policy/icons.png")} />
        </TouchableOpacity>
        {expandedItem === item && (
            <Text style={styles.contentText}>{contentData[item]}</Text>
        )}
    </View>
))}


            <View style={styles.frameContainer}>
            <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.checkboxes, termsAccepted && styles.checkedCheckbox]}>
        {termsAccepted && <Image 
            style={styles.component116x16filledactioIcon} 
            resizeMode="cover" 
            source={require("../assets/policy/component-116x16filledactioncheck.png")}
        />}
    </View>
    <Text style={[styles.text7, styles.textTypo]}>
        J’ai lu et j’accepte les termes de Catchy.
    </Text>
</TouchableOpacity>



            <TouchableOpacity 
    style={[styles.buttons, !termsAccepted ? { backgroundColor: 'lightgray' } : { backgroundColor: Color.black }]} 
    disabled={!termsAccepted}
    onPress={() => {
        navigation.navigate('OnboardingEvents'); // Navigate to OnBoardingEvents screen
    }}
>
    <Text style={[styles.text8, styles.textTypo1]}>Continuer</Text>
</TouchableOpacity>

          </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f7f7f7',
        borderRadius: 30,
        overflow: 'hidden'
    },
    tab: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
    },
    selectedTab: {
        backgroundColor: '#FFC700',
    },
    tabText: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: 'bold'
    },
    expandIcon: {
        fontSize: 18,
    },
    agreeText: {
        marginVertical: 20,
        fontSize: 16
    },
    listItemContainer: {
        marginBottom: 10,
        borderRadius: 25,
        borderColor: '#e0e0e0',
    },
    
    continueButton: {
        backgroundColor: '#333',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    checkboxesParentFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      textTypo2: {
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
      },
      buttonFlexBox: {
        transform: [
          {
            rotate: "180deg",
          },
        ],
        paddingVertical: Padding.p_xs,
        paddingHorizontal: Padding.p_base,
        justifyContent: "space-between",
        height: 32,
        borderRadius: Border.br_21xl,
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
      },
      textTypo1: {
        fontFamily: FontFamily.customButton1,
        lineHeight: 24,
        textAlign: "left",
        fontWeight: "700",
      },
      textTypo: {
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        color: Color.black,
      },
      accordeonsLayout: {
        paddingVertical: Padding.p_base,
        paddingHorizontal: Padding.p_5xl,
        height: 59,
        backgroundColor: Color.colorWhite,
        justifyContent: "space-between",
        width: 320,
        borderRadius: Border.br_xl,
      },
      politiqueDeConfidentialit: {
        fontSize: 20,
        lineHeight: 32,
        fontFamily: FontFamily.poppinsBold,
        width: 318,
        textAlign: "left",
        color: Color.black,
        fontWeight: "700",
      },
      text: {
        lineHeight: 24,
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
        fontSize: FontSize.size_smi,
        transform: [
          {
            rotate: "180deg",
          },
        ],
        textAlign: "left",
        color: Color.black,
      },
      text1: {
        fontSize: FontSize.size_smi,
        fontFamily: FontFamily.customButton1,
        transform: [
          {
            rotate: "180deg",
          },
        ],
        color: Color.black,
      },
      button1: {
        backgroundColor: Color.primary,
      },
      buttonParent: {
        flex: 1,
        alignItems: "center",
      },
      tabs: {
        backgroundColor: Color.colorWhitesmoke,
        paddingHorizontal: Padding.p_5xs,
        paddingVertical: Padding.p_7xs,
        marginTop: 16,
        width: 320,
        borderRadius: Border.br_xl,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      text2: {
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
      },
      icons: {
        borderRadius: Border.br_41xl,
        width: 32,
        height: 32,
      },
      textParent: {
        width: 282,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      },
      accordeons1: {
        marginTop: 14,
      },
      accordeonsParent: {
        marginTop: 24,
      },
     
    component116x16filledactioIcon: {
        width: 16,
        height: 16,
        overflow: "hidden",
        display: "none",
      },
      checkboxes: {
        borderRadius: 4,
        borderStyle: "solid",
        borderColor: Color.lightGrey3,
        borderWidth: 1,
        padding: 4,
        backgroundColor: "gray", // set default background to gray
        alignItems: "center",
    },
    checkedCheckbox: {
        backgroundColor: "green",
    },
        
      text7: {
        fontFamily: FontFamily.interRegular,
        width: 281,
        height: 19,
        marginLeft: 15,
      },
      text8: {
        fontSize: FontSize.customButton1_size,
        color: Color.primary,
      },
      buttons: {
        backgroundColor: Color.black,
        height: 48,
        paddingVertical: Padding.p_xs,
        paddingHorizontal: Padding.p_base,
        borderRadius: Border.br_21xl,
        marginTop: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 320,
        flexDirection: "row",
      },
      frameContainer: {
        paddingBottom: Padding.p_5xl,
        marginTop: 24,
      },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 25,
        marginBottom: 10,
    },
    footer: {
        marginTop: 20,
    },
    continueButton: {
        backgroundColor: 'black',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    continueText: {
        color: 'white',
        fontWeight: 'bold',
    },
    continueText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Policy;
