import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FilterScreen from '../../src/screens/FilterScreen'; // Import the screen component for the Filter screen

const Drawer = createDrawerNavigator();

const NewDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="FilterScreen" component={FilterScreen} />
      {/* Add other screens in the drawer navigator if needed */}
    </Drawer.Navigator>
  );
};

export default NewDrawerNavigator;
