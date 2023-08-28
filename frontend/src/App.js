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
      onSearch: keyword => {
        console.log('show')
        this.loading.show() // 로딩중 show
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data)
          console.log('hide')
          this.loading.hide() // 로딩중 hide
        });
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
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
