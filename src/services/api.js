import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { baseUrl } from '../atom/responseSurveyState';
// IMPORTANT NOTICE: We did not use a state management library in this app due the tight time and stressed schedule!

//let API = axios.create({baseURL: 'http://192.168.0.4:8082'});
//let API = axios.create({baseURL: 'http://192.168.0.8:8082'});
//let API = axios.create({baseURL: 'http://192.168.0.4:8082'});
let API = axios.create({baseURL: 'http://94.237.82.88:8082'});
let wheelApi = axios.create({baseURL: 'http://145.239.166.14:8086'});
/*API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });*/

export const userLogin = user => API.post('/authenticate', user);

export const createUser = newUser => API.post('/user', newUser);

export const sendToken = token => API.post('/register', token);

export const getGifts = id => API.get(`/products/gifts/${id}`);
export const uploadProfilePicture = async (userId, imageBase64) => {
  try {
    const response = await axios.post(`http://94.237.82.88:8082/addImageToUser/${userId}`, {
      image: imageBase64,
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    const responseData = await response.json();
    console.log('Upload response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const getNotifications = data =>
  API.get(`/notifications/user/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const getSurveyToAnswer = data =>
  API.post(
    '/surveys/responses',
    {id: data.id, name: data.surveyId},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const getUserById = id => API.get(`/user/userById/${id}`);
export const getUser = id => API.get(`/user/${id}`);

export const modifyUserProfile = data => API.put(`/user`, data);

export const blockUser = (id, status) => API.put(`/user/block`, {id, status});

export const getInterests = () =>
  API.get(`/interests`).then(res => {
    return res.data;
  });

export const resetPAssword = (mobilePhone, password) =>
  API.put(`/user/resetPassword`, {mobilePhone, password});

//  export const setClientToken = token => {
//     APIKit.interceptors.request.use(function(config) {
//       config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     });
//   };

export const getEvent = (id, token) => API.get(`/events/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
 }
);
export const getPartners = (token) => API.get(`/partners/`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
 }
);


export const getProducts = () => API.get(`/products`);

export const getUserByUserName = username => API.get(`/username/${username}`);

export const getUserEvents = id => API.get(`/events/user/${id}`);

export const buyProduct = data => API.post(`/products/buyProduct`, data);
export const setStatus = id=> API.put(`/user/${id}`);
export const sendMedia = (media, token)=>API.post(`/requestphoto/addMedia`,media, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
 }
);
export const getUserMedia = id =>  API.get(`/requestphoto/getUserMedia/${id}`);


export const forgotPassword = data => API.post(`/forgot?email=${data}`);
export const confirmUser = data => API.post(`/confirm?email=${data}`);
export const verifyPassword = data => API.post(`/verify?code=${data}`);
export const verifyCode = data => API.post(`/verifyCode?code=${data}`);
export const savePassword = data => API.post(`/reset?email=${data.email}`,{password : data.password});


export const ListSurvey = surveys => API.get(`/surveys`, surveys);
export const getSurveyById = id => API.get(`/surveys/${id}`);
export const getUserSurvey = id => API.get(`/surveys/user/${id}`);
export const verifMail = mail => API.get(`/verifMail2/${mail}`);
export const verifcin = cin => API.get(`/verifCin/${cin}`);
export const confirm = mail => API.get(`/confirm/${mail}`);


export const verifusername = username => API.get(`/verifUsername2/${username}`);
export const answerSurvey = (userId, surveyId, responses) => API.post(`/surveys/user/${userId}/answer-survey/${surveyId}`, responses);

export const getUserPromotions = id => API.get(`/promotion/promotionById/${id}`, {
  headers: {
    Authorization: `Bearer ${id}`,
  },
});
export const getUserPromotion = token => API.get(`/promotion/all`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const displayFile = id => API.get(`/file/${id}` );




// export user data from local storage
export const Storage = {
  getLoyaltyPoints: async function (key) {
    let item = await AsyncStorage.getItem('profile');
    if (item !== null) {
      const token = JSON.parse(item);
      return jwt_decode(token);
    }
  },
  userData:async function(){
    let item = await AsyncStorage.getItem('profile');
    if (item !== null) {
      const token = JSON.parse(item);
      let user= jwt_decode(token);
      return user;
    }
  }
};
export const checkEmail = async (email) => {
  try {
    const response = await fetch(`http://94.237.82.88:8082/verifMail2/${email}`);
    const result = await response.json();

    return result; // Returns true if email exists, false otherwise
  } catch (error) {
    console.error('Error verifying email:', error);
    return true; // Default to "exists" if there's an error, to be safe
  }
};

export const wheelInscription = user => wheelApi.post(`inscription`, {
  firstName: user.firstname,
  lastName: user.lastname,
  email: user.email,
  mobilePhone: user.mobilePhone,
  cin: user.cin,
});

export const wheelGifts = cin => wheelApi.get(`gift/${cin}`);

export const getWheelUserByCin = cin => wheelApi.get(`user/find/${cin}`);


