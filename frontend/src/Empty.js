class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "empty";
    $target.appendChild(this.$empty);

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
  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  
  render() {
    // 초기 data의 show 상태에 따라 렌더링 여부 결정
    if (this.data.show) {
      this.$empty.style.display = 'flex';
      this.$empty.innerHTML = `🐱‍🚀검색 결과가 없습니다🐱‍🚀`;
    } else {
      this.$empty.style.display = 'none';
      this.$empty.innerHTML = ``;
    }
  }
}

export default Empty;