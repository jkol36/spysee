import axios from "axios";
import { GOOGLE_MAP_KEY } from "../constants";

export const getUri = status => {
  switch(status) {
    case 0: {
      return 'https://lh3.googleusercontent.com/proxy/wAFwebQ2pKm-cDc0xh1mJF3iolyuWaFpcfUX7Hu9_2aoo_YsXzcsnQeA_uydbUkb9oecmaYZRlt0vETc3O3PHLfVOm0CLChsjQFZa8386QapyO6NAl8g9714pPE9gPaf2fZBq1fpAFrZhfHIvu2CWkCo64qwOQIvn9YTCB7r1zVZj4lAnWhodRwAPGFQxppP'
    }
    case 1: {
      return 'https://lh3.googleusercontent.com/proxy/wAFwebQ2pKm-cDc0xh1mJF3iolyuWaFpcfUX7Hu9_2aoo_YsXzcsnQeA_uydbUkb9oecmaYZRlt0vETc3O3PHLfVOm0CLChsjQFZa8386QapyO6NAl8g9714pPE9gPaf2fZBq1fpAFrZhfHIvu2CWkCo64qwOQIvn9YTCB7r1zVZj4lAnWhodRwAPGFQxppP'
    }
    case 2: {
      return 'https://www.pngfind.com/pngs/m/180-1807233_location-dot-grey-grey-colour-circle-png-transparent.png'
    }
  }
}

export const getStatusText = (status, name) => {
  console.log('got status', status)
  switch(status) {
    case 0: {
      return `ask ${name} to stream`
    }
    case 1: {
      
      return `${name} is currently offline`
    }
    case 2: {
      return `${name} is away`
    }
  }

}
export const getAddressFromLatLong = (latlng, language = 'en') =>
    axios({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            latlng,
            key: GOOGLE_MAP_KEY,
            language,
        },
    })
        .then(response => {
            // console.log("success resp==>>", response)
            if (response.data.results && response.data.results.length > 0) {
                let filterData = response.data.results.filter(address => {
                    // console.log(address, 'the addres aofdjoi');
                    if (
                        address.types.includes('locality') ||
                        address.types.includes('sublocality') ||
                        address.types.includes('postal_code') ||
                        address.types.includes('administrative_area_level_2')
                    ) {
                        return true;
                    }
                });

                let dataToGetCity = {};
                if (filterData.length > 0) {

                    dataToGetCity = filterData[filterData.length - 1];
                } else {
                    dataToGetCity = [
                        response.data.results[response.data.results.length - 2],
                    ];
                }

                let cityText = dataToGetCity.address_components[0].long_name;
                const dataToSend = {
                    city: cityText,
                    address: response.data.results[0].formatted_address,
                };

                return dataToSend;
            }
            return '';
        })
        .catch(error => {
            error;
            console.log("error==>>>", error)
        });