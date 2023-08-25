const API_ENDPOINT = 
  // "http://192.168.0.51:8080";
  // "http://127.0.0.1:8080";
  "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
      res.json()
    );
  }
};
