class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

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
      // 닫기버튼
      const $closeBt = document.querySelector(".close");
      $closeBt.addEventListener('click', () => {
        this.$imageInfo.style.display = "none";
      });

    } else {
      this.$imageInfo.style.display = "none";
    }

  }
}
