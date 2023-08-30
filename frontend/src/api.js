import { API_ENDPOINT } from './utils/config.js'
import { REQUEST_ERROR } from './utils/error.js'

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) return result.json();
    else throw REQUEST_ERROR[result.status];
  } catch (error) {
    alert(error.msg);
    return { data: null }
  }
};

const api = {
  // 키워드검색
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      .then( res => res.json() );
  },
  // 다음페이지로딩
  fetchCatsPage: (keyword, page) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`)
      .then( res => res.json() );
  },
  // 랜덤고양이
  fetchRandomCats: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`)
      .then( res => res.json() );
  },
  // id입력시 상세정보
  fetchCatDetail: id => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`)
      .then(res => res.json() );
  },
};

export default api;