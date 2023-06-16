import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {WIDTH} from '../../../utils/Dimension';
import {Color, Font} from '../../../constants/colors/color';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

export default class SliderEntry extends Component {
  //   Constructor(props){
  //     super(props);
  //     this.state= {
  //       showModal : false
  //     }
  // }
 

  // get image() {
  //   const {
  //     data: {illustration},
  //     parallax,
  //     parallaxProps,
  //     even,
  //   } = this.props;

  // `data:image/png;base64,${picByte}`
  //   return parallax ? (
  //     <ParallaxImage
  //       source={{uri: `data:image/png;base64,${picByte}`}}
  //       containerStyle={[
  //         styles.imageContainer,
  //         even ? styles.imageContainerEven : {},
  //       ]}
  //       style={styles.image}
  //       parallaxFactor={0.35}
  //       showSpinner={true}
  //       spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
  //       {...parallaxProps}
  //     />
  //   ) : (
  //     <Image
  //       source={{uri: `data:image/png;base64,${picByte}`}}
  //       style={styles.image}
  //     />
  //   );
  // }

  render() {
    // const {even} = this.props;
    // const {name, description, price} = this.props.data;
    const {id, title, points, status, endDate, thumbnail} = this.props.data;

    // // const {
    // //   image: {picByte},
    // // } = this.props.data;
    // const uppercaseTitle = name ? (
    //   <Text
    //     style={[styles.title, even ? styles.titleEven : {}]}
    //     numberOfLines={2}>
    //     {name.toUpperCase()}
    //   </Text>
    // ) : (
    //   false
    // );
    // constructor(props) {

    //   }
    return (
      // here make an ohter style for the whole view to see what s happen

      <Card
        style={{
          borderRadius: 30,
          overflow: 'hidden',
        }}>
        <Card.Cover
          source={{uri: `data:thumbnail/png;base64,${thumbnail}`}}></Card.Cover>
      </Card>
    );
  }
}
