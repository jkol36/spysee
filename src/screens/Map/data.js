import imagePath from "../../constants/imagePath";
import { DateTime, Interval } from 'luxon';

export const statusMapper = {
    0: 'offline',
    1: 'online',
    2: 'away',
    3: 'streaming'

}

export const data = [
    {
        id: 0,
        coords: {
            latitude: 40.02545,
            longitude: -75.22392,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        img: imagePath.emoji1,
        name: 'Jessica',
        status: 3, //streaming
        streaming: true,
        lastStreamDate: DateTime.now().setZone('America/New_York').minus({weeks: 1}).toLocaleString(DateTime.DATETIME_MED)

    },
    {
        id: 1,
        coords: {
            latitude: 39.900767,
            longitude: -75.167464,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        img: imagePath.emoji2,
        name: 'Eli',
        status: 0,
        streaming: false,
        lastStreamDate: DateTime.now().setZone('America/New_York').minus({days: 1}).toLocaleString(DateTime.DATETIME_MED)


    },
    {
        id: 3,
        coords: {
            latitude: 39.951817,
            longitude: -75.160339,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        img: imagePath.emoji3,
        name: 'jkol36',
        status: 3,
        streaming: true,
        lastStreamDate: DateTime.now().setZone('America/New_York').toLocaleString(DateTime.DATETIME_MED)


    },
    
]