import React,{useState,useEffect} from 'react'
import { StyleSheet, Button, View,Image } from 'react-native'
import Picker from 'react-native-image-picker';

export default function ImagePicker({ image, onImagePicked }) {
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
      if (image) {
        setSelectedImage({ uri: image });
      }
    }, [image])
  
    pickImageHandler = () => {
        Picker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
        response => {
          if (response.error) {
          } else {
            setSelectedImage({ uri: response.uri });
            onImagePicked({ uri: response.uri });
          }
        }
      )
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.previewImage} />
        </View>
        <View styels={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center'
    },
    imageContainer: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '80%',
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
      width: '100%',
      height: '100%'
    }
  })
 