import React from 'react';
import { View, Button } from 'react-native';

const NewDrawer = ({ openDrawer }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View>
      <Button
        title="New Filter"
        onPress={() => {
          setVisible(true);
        }}
      />
      {visible && (
        <View>
          <h1>New Filter Menu</h1>
        </View>
      )}
    </View>
  );
};

export default NewDrawer;