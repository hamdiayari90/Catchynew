
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
      let data = loyaltyPoints.json();
      return data;
    } catch (e) {}
  };