import {atom, selector} from 'recoil';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
export const currentPosition = atom({
  key: 'currentPosition',
  default: '',
});

export const currentContry = atom({
  key: 'currentContry',
  default: '',
});

export const currentContryCode = atom({
  key: 'currentContryCode',
  default: '',
});
export const currentLongitude = atom({
  key: 'currentLongitude',
  default: '',
});

export const currentLatitude = atom({
  key: 'currentLatitude',
  default: '',
});

export const locationState = atom({
  key: 'locationState',
  default: {latitude: null, longitude: null},
});
export const coordinatesPolyline = atom({
  key: 'coordinatesPolyline',
  default: [],
});
//   export const locationSelector = selector({
//     key: 'locationSelector',
//     get: ({ get }) => {
//       Geolocation.getCurrentPosition(
//         async(position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('longitude:', longitude)
//           console.log('latitude:', latitude)
//           get(locationState); // This line ensures that the atom is subscribed to changes
//           const address = await Geocoder.geocodePosition({
//             lat: latitude,
//             lng: longitude,
//           });
//           console.log('address:', address[0])

//           return { latitude, longitude };
//         },
//         error => {
//           console.log(error);
//         },
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//       );
//     },
//   });
