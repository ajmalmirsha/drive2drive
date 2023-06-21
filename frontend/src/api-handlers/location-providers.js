



export function getAllStates () {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_X_CSCAPI_KEY);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
      .then(response => response.text())
      .then(result => {
        const stateNames = JSON.parse(result).map(state => state.name);
        return [...stateNames]
      })
      .catch(error => console.log('error', error));
}