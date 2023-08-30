const API_ENDPOINT =
  // "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";
  "http://localhost:4001";
// 백엔드에서 설정된 포트번호

const api = {
  // 키워드검색
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
      res.json()
    );
  },
  // 다음페이지로딩
  fetchCatsPage: (keyword, page) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`).then(res =>
      res.json()
    );
  },
  // 랜덤고양이
  fetchRandomCats: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then(res =>
      res.json()
    );
  },
  // id입력시 상세정보
  fetchCatDetail: id => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`).then(res =>
      res.json()
    );
  },
};
