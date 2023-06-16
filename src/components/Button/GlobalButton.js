import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors/color.js';
import {WIDTH, HEIGHT} from '../../utils/Dimension.js';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const GlobalButton = ({onPress, title, diableBtn = false}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={[styles.customButton,{backgroundColor: diableBtn? "#ccc": Color.primary}]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.iconContainer,{backgroundColor: diableBtn ? "#ccc": 'blue'}]}>
            <AntDesign name="arrowright" color={Color.light} size={22} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    borderRadius: 8,
    width: WIDTH / 2,
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  title: {
    letterSpacing: 1.2,
    color: '#fff',
    paddingRight: '4%',
    fontSize: 18,
  },
  iconContainer: { borderRadius: 30},
});
