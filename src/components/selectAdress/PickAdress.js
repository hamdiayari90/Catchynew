import React, {useState, useEffect} from 'react';

import {Alert, StyleSheet, View} from 'react-native';
import {Button as PaperButton, Headline} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import {WIDTH} from '../../utils/Dimension';

export const selectValidator = value => {
  if (!value || value.length <= 0) {
    return 'Please select a value.';
  }

  return '';
};

export const PickAdress = () => {
  const address = [
    {_id: '099dc121-f29f-464d-b522-266ec5e3edc0', value: 'Sousseee'},
    {_id: '0c919260-27f7-46c6-be62-faf4291ada46', value: 'Kairouan'},
    {_id: '1fd0918c-9a13-4e7a-82e5-a18b3e341cec', value: 'Sousse'},
    {_id: '2098ebab-c4c6-4ee6-b411-2a994ebdd8e3', value: 'Ariana'},
    {_id: '2fffec98-1c5e-43b6-89c3-4b5ce38fc918', value: 'Tunis'},
    {_id: '346a62b9-c9b4-4339-affa-6e62c2cd9439', value: 'Manouba'},
    {_id: '68dea673-23a8-49cb-a7e1-51cf646ee48a', value: 'Sousse'},
    {_id: 'b0a4d788-e487-4714-8563-d996ec3dfdcb', value: 'Mahdia'},
    {_id: 'b3d3eb08-c36a-4d7d-bbc0-0f44f0839954', value: 'Sousse'},
    {_id: 'e55001d0-42ea-45c5-83d1-fdcfce7617fa', value: 'Sousse'},
  ];
  const [gender, setGender] = useState({
    value: '',
    list: address,
    selectedList: [],
    error: '',
  });

  const [colors, setColors] = useState({
    value: '',
    list: [
      {_id: '1', value: 'BLUE'},
      {_id: '2', value: 'RED'},
      {_id: '3', value: 'GREEN'},
      {_id: '4', value: 'YELLOW'},
      {_id: '5', value: 'BROWN'},
      {_id: '6', value: 'BLACK'},
      {_id: '7', value: 'WHITE'},
      {_id: '8', value: 'CYAN'},
    ],
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    let isMounted = true;
    let _getData = async () => {
      if (isMounted) {
        setGender({
          ...gender,
          value: '',
          selectedList: [],
        });

        setColors({
          ...colors,
          value: 'BLUE,RED',
          selectedList: [
            {_id: '1', value: 'BLUE'},
            {_id: '2', value: 'RED'},
          ],
        });
      }
    };

    _getData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <PaperSelect
        label="Selectionner votre  adress"
        value={gender.value}
        onSelection={value => {
          setGender({
            ...gender,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...gender.list]}
        selectedArrayList={[...gender.selectedList]}
        errorText={gender.error}
        multiEnable={false}
        dialogTitleStyle={{color: 'black'}}
        checkboxColor="blue"
        checkboxLabelStyle={{color: 'black', fontWeight: '700'}}
        textInputStyle={{fontWeight: '700'}}
        hideSearchBox={false}
        outlineColor="black"
        theme={{
          colors: {
            placeholder: 'black',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
  box: {
    width: 60,
    height: 20,
    marginVertical: 20,
  },
});
