import React, {useEffect, useRef, useState} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Color, Font} from '../../constants/colors/color';
import {HEIGHT, WIDTH} from '../../utils/Dimension';
import {
  multiAddress,
  multiSelectItems,
  selectedInterrest,
} from '../../atom/responseSurveyState';
import {useRecoilState} from 'recoil';

export const MultiSelectAddress = ({categories, userInfo}) => {
  const ref = useRef();
  const [selectedItems, setSelectedItems] = useRecoilState(selectedInterrest);
  const [items, setItems] = useState([]);

  useEffect(() => {
    assignValue();
  }, []);

  const assignValue = () => {
    setItems(() => categories);
  };

  const removeAll = () => {
    ref.current?._removeAllItems();
  };
  const toggle = () => {
    ref.current?._toggleSelector();
  };
  return (
    <View>
      <SectionedMultiSelect
        searchPlaceholderText="search"
        uniqueKey="value"
        displayKey="label"
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
        items={categories}
        ref={ref}
        loading={selectedItems == undefined}
        selectText="Selectionez votre centre d'interret"
        confirmText="Confirmer"
        selectedIconOnLeft={false}
        customChipsRenderer={props => (
          <ScrollView
            horizontal
            style={
              {
                //   width: WIDTH,
              }
            }
            contentContainerStyle={{
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 8,
            }}></ScrollView>
        )}
        IconRenderer={Icon}
        icons={{
          check: {
            name: 'check-circle',
            style: {
              color: '#3742fa',
            },
            size: 22,
          },
          search: {
            name: 'search',
            color: '#333',
            size: 22,
          },

          arrowUp: {
            name: 'keyboard-arrow-up', // dropdown toggle
            size: 22,
            color: '#333',
          },
          arrowDown: {
            name: 'keyboard-arrow-down', // dropdown toggle
            size: 22,
            color: '#333',
          },
          selectArrowDown: {
            name: 'keyboard-arrow-down', // select
            size: 24,
            color: '#333',
          },
          close: {
            name: 'close', // chip close
            size: 16,
            color: '#333',
          },

          cancel: {
            name: 'cancel', // cancel button
            size: 18,
            color: '#333',
          },
        }}
      />

      {/* <View style={{ width: width / 2 , justifyContent:'center', alignContent:'center', alignSelf:'center'}}>
        <Button title="Remove All" onPress={removeAll} />
      </View> */}
    </View>
  );
};
