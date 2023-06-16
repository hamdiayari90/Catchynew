import { atom, selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import {fetchUSerInforamtion} from '../services/homePageApi/home'
export const verifyIsSignedIn  = atom({
    key:'verifyIsSignedIn',
    default : false
})


export const userToken = atom({
    key:'userToken',
    default: null
})

export const userInfomation = atom({
    key:'userId',
    default : {}
})

export const checkIsFirstLanch = atom({
    key:'checkIsFirstLanch',
    default : null
})

export const isConnected = atom({
    key:"isConnedToInternet",
    default : true
})
export const globlalUSerInfo = selector({
    key: "globlalUSerInfo",
    get: async ({ get }) => {
      const token = get(userToken)
      const  tokenId = jwtDecode(token)

    const response = await fetchUSerInforamtion(tokenId.id)


     
     return response;
    
    },
  });