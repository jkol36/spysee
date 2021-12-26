import React from 'react';
import { View, Text } from 'react-native';


const Discover = ({ navigation }) => {
    console.log('yooo discover mounted')

    const moveToScreen = (screen) => () => {
        navigation.navigate(screen)
    }
    return (
         <Text> Discover </Text>
    );
};

export default Discover;
