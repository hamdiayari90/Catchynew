
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** OPEN MENU   ************************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
export const getAllProduct = async ()=> {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let products = await fetch(
        `http://145.239.166.14:8082/products`,
        requestOptions,
      );
      let allproducts = products.json();
      return allproducts;
    } catch (e) {}
}


  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** OPEN MENU   ************************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
export const getAllNotification = async (id)=> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let products = await fetch(
      `http://145.239.166.14:8082/notifications/user/${id}`,
      requestOptions,
    );
    let allproducts = products.json();
    return allproducts;
  } catch (e) {}
}


  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** OPEN MENU   ************************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
export const fetchUSerInforamtion = async token => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let loyaltyPoints = await fetch(
      `http://145.239.166.14:8082/user/${token}`,
      requestOptions,
    );
    let response = loyaltyPoints.json();
    return response;
  } catch (e) {}
};