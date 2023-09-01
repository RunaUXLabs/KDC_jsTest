console.log("app is running!");

import DarkModeToggle from './DarkModeToggle.js';
import Loading from './Loading.js';
import SearchInput from './SearchInput.js';
import RandomButton from './RandomButton.js';
import Empty from "./Empty.js";
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Banner from './Banner.js';
import api from './api.js';

const DEFAULT_PAGE = 1;
class App {
  $target = null;
  data = [];
  // page = DEFAULT_PAGE;

  constructor($target) {
    this.$target = $target;

    const $form = document.createElement("form");
    this.$form = $form;
    $target.appendChild($form);

    // 다크모드 토글 생성
    this.darkModeToggle = new DarkModeToggle({
      $form,
    });
    // 로딩중 생성
    this.loading = new Loading({
      $target,
    });
    // 검색기능
    this.searchInput = new SearchInput({
      $form,
      // 키워드 검색
      onSearch: (keyword, limit) => {
        this.loading.show(); // 로딩중 show
        api.fetchCatsLimit(keyword, limit).then(({ data }) => {
          this.setState(data ? data : []); // 데이터 없으면 빈 배열 반환
          this.loading.hide(); // 로딩중 hide

          // 마지막 검색결과는 항상 출력, 로컬에 저장
          this.saveResult(data);
        });
      }
    });
    // 랜덤출력버튼 생성
    this.randomButton = new RandomButton({
      $form,
      onRandomSearch: () => {
        this.loading.show(); // 로딩중 show
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.loading.hide(); // 로딩중 hide
        });
      }
    });
    // 랜덤슬라이드 생성
    this.banner = new Banner({
      $target
    })

    // 검색결과출력
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      // 클릭시 상세정보
      onClick: cat => {
        console.log(cat);
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      // 다음페이지 로딩
      onNextPage: () => {
        console.log('다음페이지로딩');
        this.loading.show();
        const keywordHistory = localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
        // console.log(keywordHistory)
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          // console.log(newData)
          this.setState(newData);
          this.page = DEFAULT_PAGE;
          this.loading.hide();
        });
      }
    });
    // 상세모달 기본값
    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
    // 안내문구
    if (this.data === null || this.data.length === 0) {
      // 공백안내(서버에러 or 검색결과없음)
      this.empty = new Empty({
        $target,
      });
    }

    // 초기화
    this.init();
  }

  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
    this.empty.show(nextData.length === 0);
    console.log(this.searchResult);
  }

  // 마지막 검색결과값 저장
  saveResult(result) {
    // console.log(result)
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  // 초기화, 로컬스토리지 lastResult 값이 null이면 빈배열 반환, 있으면 JSON으로 파싱한 값을 파라미터로 넘겨 상태업데이트
  init() {
    const lastResult = localStorage.getItem('lastResult') === null ? [] : JSON.parse(localStorage.getItem('lastResult'));
    // console.log(lastResult)
    this.setState(lastResult);
  }
}

export default App;