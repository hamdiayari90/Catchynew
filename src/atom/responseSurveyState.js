import {atom, selector} from 'recoil';

export const responseTextInput = atom({
  key: 'responseTextInput',
  default: '',
});
export const baseUrl  = atom({
  key:'baseUrl',
  default: 'http://catchy.tn:8082'
})


export const multiSelectItems = atom({
  key: 'multiSelectItems',
  default: [],
});

export const multiAddress = atom({
  key: 'multiAddress',
  default: [],
});

export const selectedInterrest = atom({
  key: 'selectedInterrest',
  default: [],
});

export const selectedAddressAtom = atom({
  key: 'selectedAdress',
  default: {
    value: '',
    list: [],
    selectedList: [],
    error: '',
  },
});


export const selectedIntereestAtom= atom({
  key: 'selectedIntereestAtom',
  default: {
    value: '',
    list: [],
    selectedList: [],
    error: '',
  },
});



// for (let i = 1; i <= 26; i++) {
//   gifArray.push(require(`../assets/design/gif/${i}.gif`));
// }

export const pathAllImageGif = () => {

}

export const pathGif = selector({
  key: "pathGif",
  get: async ({ get }) => {
    const token = get(userToken)
    const  tokenId = jwtDecode(token)

  const response = await fetchUSerInforamtion(tokenId.id)


   
   return response;
  
  },
});