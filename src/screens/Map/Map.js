import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image, Text, Dimensions, NativeModules } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Circularbtn from '../../components/CircularBtn';
import HomeHeader from '../../components/HomeHeader';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import { moderateScale } from '../../styles/responsiveSize';
import { getAddressFromLatLong, getUri, getStatusText } from '../../utils/helperFunctions';
import SwipeablePanel from 'react-native-sheets-bottom';
import { Octicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import ApiVideoPlayer from '@api.video/react-native-player';
import { WatchStreamButton, ButtonText, InfoName, StreamingText, Bold, LastStreamDate, MapStyle  } from './styles';
import { data } from './data';

const StreamPreview = ({height}) => {
  return (
    <View style={{flex: 1}}>
      <ApiVideoPlayer style={{height: 250, marginBottom: 20, width: 370, padding: 10, margin: 10}} videoId="vi4SzIk2QlYWQpSpe5fUMTst" />
      <WatchStreamButton><ButtonText>Watch the full stream <Entypo name="arrow-bold-right" size={12} color="white" /> </ButtonText></WatchStreamButton>
          
    </View>
  );
};


const getColor = status => {
  switch(status) {
    case 0: {
      return 'red'
    }
    case 1: {
      return 'green'
    }
    case 2: {
      return 'yellow'
    }
      
  }
}
const OnlineStatus = ({status}) => {
  console.log('uri', getUri(status), status)
  return (
    <Octicons name="primitive-dot" size={24} style={styles.statusIndicator} color={getColor(status)} />  )
}
const Info = data => {
  const { name, lastStreamDate, status, streaming } = data.data
  console.log('got status', status)
  return (
    <>
      {status === 3 ? <SimpleLineIcons name="camrecorder" style={styles.streamIcon} size={24} color="red" />:  <OnlineStatus status={status} /> }
      <InfoName>{ name }</InfoName>
      {streaming ?
        <>
          <Bold style={{textAlign: 'center'}}> Live Now </Bold>
          <StreamingText> cheese steak reviews
        </StreamingText>
        </>
        : <LastStreamDate> last stream { lastStreamDate }</LastStreamDate>
      }
    </>
  )
}
const Map = () => {
    const [engine, setEngineInstance] = useState(null)
    const [curLoc, setCurLoc] = useState({
        latitude: 39.952583,
        longitude: -75.165222,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [showDrawer, setShowDrawer] = useState(false)
    const [panelData, setPanelData] = useState({})
    const [ height, setHeight ] = useState(600)
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

    const handleMarkerClick = (data) => {
      console.log('clicked', data)
      setPanelData(data)
      setShowDrawer(!showDrawer)
    }

    return (
        <View style={{ flex: 1, }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                customMapStyle={MapStyle}
                initialRegion={curLoc}
                onRegionChangeComplete={onRegionChange}
            >

                {data.map((val, i) => {
                  console.log('got val', val)
                    return (
                        <Marker
                            coordinate={val.coords}
                            image={val.img}
                            calloutOffset={[0, 0]}
                            tappable
                            flat={false}
                            onPress={() => handleMarkerClick(val)}
                        >
                        <Callout> 
                          <Info data={val} />
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
            <SwipeablePanel
              fullWidth
              isActive={showDrawer}
              onClose={setShowDrawer}
              onPressCloseButton={setShowDrawer}
              style={{height: 700}}
            >
              <StreamPreview />
            </SwipeablePanel>
            <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Circularbtn
                        text={'something here'}
                    />

                    <TouchableOpacity onPress={onCenter} style={styles.navigationView}>
                        <Image source={{uri: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/s320x320/122132213_765825297311604_170610126647065313_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=Y6ziVuUIB28AX_hwbDW&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT8j0xTGy2gryUodxAWPctJ7k2KC49PGJe8yugtf-4_2dg&oe=61D00ADD&_nc_sid=7bff83'}} />
                    </TouchableOpacity>

                    <Circularbtn
                        text={'something here'}
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
    },
    statusIndicator: {
      marginLeft: '40%',
      position: 'absolute',
      marginTop: -3
      
    },
    streamIcon: {
      marginLeft: '25%',
      fontSize: 15,
      position: 'absolute',

    },

});

//make this component available to the app
export default Map;