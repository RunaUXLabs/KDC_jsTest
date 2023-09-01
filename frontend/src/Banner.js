import api from './api.js';

class Banner {
  $banner = null;
  data = null;
  current = 0;

  constructor({ $target }) {
    this.$target = $target;

    const $wrapper = document.createElement('div');
    this.$wrapper = $wrapper;
    this.$wrapper.className = 'banner';

    const $banner = document.createElement('ul');
    this.$banner = $banner;

    const $prevButton = document.createElement('button');
    this.$prevButton = $prevButton;
    this.$prevButton.textContent = 'PREV';
    this.$prevButton.className = 'prev';
    this.$prevButton.addEventListener('click', (e) => {
      let prev = this.current - 1;
      if(prev === 0) return
      this.changeCurrent(prev)
    })

    const $nextButton = document.createElement('button');
    this.$nextButton = $nextButton;
    this.$nextButton.textContent = 'NEXT';
    this.$nextButton.className = 'next';
    this.$nextButton.addEventListener('click', (e) => {
      let next = this.current + 1;
      if(next === this.data.length) return
      this.changeCurrent(next)
    })

    this.$wrapper.appendChild($banner);
    this.$wrapper.appendChild($prevButton);
    this.$wrapper.appendChild($nextButton);
    this.$target.appendChild($wrapper);

    this.getRandom();
  }

  // 현재슬라이드변경
  changeCurrent(index){
    this.current  = index;
    this.moveTo(index)
  }

  // 슬라이드이동값
  moveTo(index){
    let leftpos = - (Number(this.$wrapper.clientWidth)) * index;
    this.$banner.style.left = leftpos + 'px';
  }

  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // 랜덤추출
  getRandom() {
    api.fetchRandomCats().then(({ data }) => {
      this.setState(data ? data.slice(0, 5) : []);
      // 데이터가 있으면 5개로 제한해서 넣고, 없으면 빈배열로 넣기
    });
  }

  render() {
    this.$banner.innerHTML = this.data
      .map((banner) => `
        <li style="background-image:url(${banner.url})"></li>
      `
      ).join('');

    this.$banner.querySelectorAll('li').forEach(item => {
      item.style.width = this.$wrapper.clientWidth + 'px'
    });
  }
}

export default Banner;