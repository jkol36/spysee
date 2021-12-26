import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Circularbtn from '../../Components/CircularBtn';
import HomeHeader from '../../Components/HomeHeader';
import RoundImg from '../../Components/RoundImg';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import { moderateScale } from '../../styles/responsiveSize';
import { getAddressFromLatLong, getUri, getStatusText } from '../../utils/helperFunctions';
import { data } from './data';


// create a component
const Map = () => {
    const [curLoc, setCurLoc] = useState({
        latitude: 39.952583,
        longitude: -75.165222,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [address, setAddress] = useState('')

    const mapRef = useRef(null)

    const onCenter = () => {
        console.log(mapRef)
        mapRef.current.animateToRegion(curLoc)
    }

    const onRegionChange = async(props) =>{
        // console.log("props==>>>",props)
        const {latitude, longitude} = props
        const res = await getAddressFromLatLong(`${latitude}, ${longitude}`)
        console.log("res==>>>>>",res)
        setAddress(res.address)

    }
    return (
        <View style={{ flex: 1, }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={curLoc}
                onRegionChangeComplete={onRegionChange}
            >

                {data.map((val, i) => {
                    return (
                        <Marker
                            coordinate={val.coords}
                            image={val.img}
                            calloutOffset={[0, 0]}
                            tappable
                            flat={false}
                        >
                          <Callout>
                            <View> 
                              <Text><Image style={{width: 10, postion: 'absolute', left: 10, height: 10}} source={{uri:getUri(val.status)}}/>  {val.name} </Text>
                              <TouchableOpacity style={{borderRadius: 10, marginLeft: 10, backgroundColor: 'grey', height: 25}}> 
                                <Text style={{fontWeight: 100, textAlign: 'center', color: colors.white}}> {getStatusText(val.status, val.name)} </Text>
                              </TouchableOpacity>
                            </View>
                          </Callout>
                        </Marker>
                    )
                })}
            </MapView>

            <View style={styles.headerView}>
                <HomeHeader
                    setting={imagePath.icSetting}
                    centerText={address}
                />
            </View>
            <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Circularbtn
                        text={strings.MY_BITMOJI}
                    />

                    <TouchableOpacity onPress={onCenter} style={styles.navigationView}>
                        <Image source={{uri: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/s320x320/122132213_765825297311604_170610126647065313_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=Y6ziVuUIB28AX_hwbDW&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT8j0xTGy2gryUodxAWPctJ7k2KC49PGJe8yugtf-4_2dg&oe=61D00ADD&_nc_sid=7bff83'}} />
                    </TouchableOpacity>

                    <Circularbtn
                        text={strings.FRIENDS}
                    />
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    headerView: {
        position: 'absolute',
        top: 36,
        left: 24,
        right: 24,
    },
    navigationView: {
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: moderateScale(35 / 2),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default Map;