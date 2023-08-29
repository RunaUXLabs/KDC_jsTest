console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // 다크모드 토글 생성
    this.darkModeToggle = new DarkModeToggle({
      $target,
    });
    // 로딩중 생성
    this.loading = new Loading({
      $target,
    });
    this.searchInput = new SearchInput({
      $target,
      // 키워드 검색
      onSearch: keyword => {
        console.log('로딩중show');
        this.loading.show(); // 로딩중 show
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          console.log('로딩중hide');
          this.loading.hide(); // 로딩중 hide
        });
      },
      // 랜덤고양이버튼
      onRandomSearch: () => {
        console.log('랜덤?');
        console.log('로딩중show');
        this.loading.show(); // 로딩중 show
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          console.log('로딩중hide');
          this.loading.hide(); // 로딩중 hide
        });
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      // 클릭시 상세정보
      onClick: cat => {
        console.log(cat)
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
