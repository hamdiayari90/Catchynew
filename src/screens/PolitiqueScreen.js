import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MenuHeaders } from '../components/menuComponent/MenuHeaders';
import { useNavigation } from '@react-navigation/native';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {FlatList} from 'react-native';

const PolitiqueScreen = ({ navigation }) => {
  const privacyPolicyText = `Dernière mise à jour : 27.07.2023

  Bienvenue dans Catchy ! Votre vie privée est importante pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre application mobile Catchy (ci-après dénommée "l'Application"). En utilisant l'Application, vous acceptez les pratiques décrites dans cette politique de confidentialité.
  
  Informations collectées
  Nous pouvons collecter les types d'informations suivants lorsque vous utilisez notre Application :
  
  a. Informations d'identification personnelle : Lorsque vous vous inscrivez et créez un compte sur l'Application, nous pouvons collecter des informations telles que votre nom, adresse e-mail, âge, sexe, et autres informations similaires.
  
  b. Données d'utilisation : Nous pouvons collecter des informations sur la façon dont vous interagissez avec l'Application, y compris les jeux auxquels vous jouez, les vidéos que vous regardez, les événements auxquels vous participez, les cadeaux que vous avez échangés, et d'autres activités dans l'Application.
  
  c. Données de localisation : Si vous choisissez d'activer les services de localisation de votre appareil, nous pouvons collecter des données de localisation pour améliorer votre expérience dans l'Application et vous fournir des fonctionnalités basées sur la géolocalisation.
  
  Utilisation des informations
  Nous utilisons les informations collectées dans l'Application aux fins suivantes :
  
  a. Pour fournir les services de l'Application : Nous utilisons vos informations pour vous permettre de gagner des points en participant à des événements, en jouant à des jeux, en regardant des vidéos, et pour convertir ces points en cadeaux.
  
  b. Amélioration de l'Application : Nous utilisons les données d'utilisation pour comprendre comment vous interagissez avec l'Application, afin d'améliorer nos fonctionnalités, notre contenu et notre convivialité.
  
  c. Communication avec vous : Nous pouvons utiliser votre adresse e-mail pour vous envoyer des informations sur les mises à jour de l'Application, les nouveaux événements, les offres spéciales et d'autres communications liées à l'Application. Vous pouvez vous désabonner de ces communications à tout moment en suivant les instructions fournies dans les e-mails.
  
  Partage des informations
  Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers à des fins de marketing. Cependant, nous pouvons partager vos informations dans les circonstances suivantes :
  
  a. Partenaires commerciaux : Nous pouvons partager certaines informations avec des partenaires commerciaux qui nous aident à fournir des services dans l'Application, tels que les fournisseurs de cadeaux ou les organisateurs d'événements.
  
  b. Exigences légales : Nous pouvons divulguer vos informations si la loi l'exige ou si nous pensons de bonne foi que cette divulgation est raisonnablement nécessaire pour se conformer à une procédure judiciaire, répondre à des demandes gouvernementales, faire respecter nos politiques ou protéger nos droits, notre sécurité ou celle d'autrui.
  
  Sécurité des données
  Nous prenons des mesures appropriées pour protéger vos informations contre tout accès, divulgation, altération ou destruction non autorisés. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue des informations.
  
  Modifications de la politique de confidentialité
  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Nous vous informerons des modifications importantes en affichant un avis sur l'Application ou en vous envoyant une notification directe. En continuant à utiliser l'Application après de telles modifications, vous acceptez la politique de confidentialité mise à jour.
  
  Contactez-nous
  Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité ou l'utilisation de vos informations, veuillez nous contacter à contact@catchy.tn.
  
  Cette politique de confidentialité est un accord entre vous et Catchy concernant votre utilisation de l'Application et remplace tous les accords antérieurs. En utilisant l'Application, vous consentez à la collecte et à l'utilisation de vos informations conformément à cette politique de confidentialité.`; // Your privacy policy text here

  return (
    <>
    <View style={{ height: HEIGHT / 3.4 }}>
          <MenuHeaders navigation={navigation} title="SONDAGE" />
        </View>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.privacyPolicyText}>{privacyPolicyText}</Text>
        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  privacyPolicyText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 50,
  },
});

export default PolitiqueScreen;
