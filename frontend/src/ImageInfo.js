class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "imageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();
  }

  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // 고양이 상세정보
  async showDetail(data) {
    console.log(data);
    // 상세정보 요청
    await api.fetchCatDetail(data.cat.id).then(({ data }) => {
      // 정보 업데이트
      this.setState({
        visible: true,
        cat: data
      });
    });
  }

  // 모달 닫기
  closeImageInfo() {
    // 정보 업데이트
    this.setState({
      visible: false,
      cat: undefined
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <h2 class="title">
            <span>${name}</span>
            <button type="button" class="close">x</button>
          </h2>
          <img src="${url}" alt="${name}"/>        
          <dl class="description">
            <dt>성격:</dt>
            <dd>${temperament}</dd>
            <dt>태생:</dt>
            <dd>${origin}</dd>
          </dl>
        </div>`;
      this.$imageInfo.style.display = "block";

      // x버튼, 모달 외 영역 클릭시 닫기 이벤트
      this.$imageInfo.addEventListener('click', (e) => {
        // console.log(e.target.className);
        if (e.target.className === 'close' || e.target.className === 'imageInfo') this.closeImageInfo();
      });

      // 키이벤트, 각 키마다 먹는 이벤트가 다름, esc버튼은 keydown
      document.addEventListener('keydown', (e) => {
        // console.log(e.key); // keycode는 이제 사용하지 않는다
        if (e.key === 'Escape') this.closeImageInfo();
      });

    } else {
      this.$imageInfo.style.display = "none";
    }

  }
}
