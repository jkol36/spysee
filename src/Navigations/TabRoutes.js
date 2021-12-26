import React from 'react';
import { Image, View, Text } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import navigationStrings from '../constants/navigationStrings';
import {
    Map,
    GoLive,
    Following,
    Discover
} from '../screens';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import { Foundation, MaterialIcons } from '@expo/vector-icons'; 


const BottomTab = createBottomTabNavigator();


const TabRoutes = () => {
    console.log('got colors tabroutes', colors)
    return (
        <BottomTab.Navigator
            tabBar={(tabsProps) => {
                console.log('got tabbar props', tabsProps)
                return (
                    <>
                        <BottomTabBar style={{backgroundColor: colors.black, color: colors.white}} {...tabsProps} />
                    </>
                )
            }}
            initialRouteName={navigationStrings.MAP}
            screenOptions={{
                tabBarStyle: {backgroundColor: colors.bg},
                headerShown: false,
                showLabel: false
            }}
            sceneContainerStyle={{backgroundColor: colors.white}}
        >
            <BottomTab.Screen
                name={navigationStrings.MAP}
                component={Map}
                screenOptions={{
                    tabBarStyle: {backgroundColor: colors.bg, color: colors.white},
                    showLabel: false
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View>
                            <Image style={{tintColor: focused? colors.purple: colors.white, width: 40, height: 40}} source={imagePath.icLoc} />
                          </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                      return (
                        <View> 
                          <Text style={focused ? {color: colors.purple}: {color: colors.white }}> {navigationStrings.MAP} </Text>
                        </View>
                      )
                    }


                }}
            />
            <BottomTab.Screen
                name={navigationStrings.GOLIVE}
                component={GoLive}
                screenOptions={{
                    tabBarStyle: {backgroundColor: colors.bg, color: colors.white},
                    showLabel: false
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View>
                            <Foundation name="record" size={32} color={colors.red} />
                          </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                      return (
                        <View> 
                          <Text style={focused ? {color: colors.purple}: {color: colors.white }}> {navigationStrings.GOLIVE} </Text>
                        </View>
                      )
                    }


                }}
            />
            <BottomTab.Screen
                name={navigationStrings.FOLLOWING}
                component={Following}
                screenOptions={{
                    tabBarStyle: {backgroundColor: colors.bg, color: colors.white},
                    showLabel: false
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View>
                            <Image style={{tintColor: focused? colors.purple: colors.white, width: 40, height: 40}} source={imagePath.icPeople} />
                          </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                      return (
                        <View> 
                          <Text style={focused ? {color: colors.purple}: {color: colors.white }}> {navigationStrings.FOLLOWING} </Text>
                        </View>
                      )
                    }


                }}
            />
            <BottomTab.Screen
                name={navigationStrings.DISCOVER}
                component={Discover}
                screenOptions={{
                    tabBarStyle: {backgroundColor: colors.bg, color: colors.white},
                    showLabel: false
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View>
                            <MaterialIcons name='explore' size={32} color={focused ? colors.purple: colors.white}/>
                          </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                      return (
                        <View> 
                          <Text style={focused ? {color: colors.purple}: {color: colors.white }}> {navigationStrings.DISCOVER} </Text>
                        </View>
                      )
                    }


                }}
            />
            

        </BottomTab.Navigator>

    )
}

export default TabRoutes