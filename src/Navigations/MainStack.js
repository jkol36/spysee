import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';


export default function (Stack) {
    console.log("this is my stack file", navigationStrings)
    return (
        <>
            <Stack.Screen
                name={navigationStrings.MAP}
                component={TabRoutes}
                options={{ headerShown: false}}
            />
    
        </>
    )
}