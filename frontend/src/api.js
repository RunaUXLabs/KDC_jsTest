const API_ENDPOINT =
  // "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";
  "http://localhost:4001";
  // 백엔드에서 설정된 포트번호

const api = {
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
      res.json()
    );
  }
};
