class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild(this.$loading);

    // 초기 data상태 설정
    this.data = {
      show: false
    };

    this.render();
  }
  show() {
    this.setState({
      show: true
    });
  }
  hide() {
    this.setState({
      show: false
    });
  }
  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    // 초기 data의 show 상태에 따라 렌더링 여부 결정
    if (this.data.show) {
      this.$loading.innerHTML = `
        <div class='loading'>🔥로딩중🔥</div>
      `;
    } else {
      this.$loading.innerHTML = ``;
    }
  }
}
