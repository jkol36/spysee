import React from 'react';
import { View, Text } from 'react-native';


const Following = ({ navigation }) => {
    console.log('yooo following mounted')

    const moveToScreen = (screen) => () => {
        navigation.navigate(screen)
    }
    return (
         <Text> Following </Text>
    );
};

export default Following;
