import React from 'react';
import { View, Text } from 'react-native';


const GoLive = ({ navigation }) => {
    console.log('yooo go live mounting')

    const moveToScreen = (screen) => () => {
        navigation.navigate(screen)
    }
    return (
         <Text> Go Live </Text>
    );
};

export default GoLive;
