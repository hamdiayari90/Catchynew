import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {multiSelectItems} from '../../atom/responseSurveyState';
import {useRecoilState} from 'recoil';

export const MultiSelect = ({categories}) => {
  const ref = useRef();
  const [selectedItems, setSelectedItems] = useRecoilState(multiSelectItems);

  return (
    <View>
      <SectionedMultiSelect
        uniqueKey="value"
        displayKey="label"
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
        items={categories}
        ref={ref}
        loading={categories == undefined}
        selectText="Selectionez votre centre d'interret"
        confirmText="Confirmer"
        customChipsRenderer={props => (
          <ScrollView
            horizontal
            style={
              {
              }
            }
            contentContainerStyle={{
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 8,
            }}>
          
          </ScrollView>
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
