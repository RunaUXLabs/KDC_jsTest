class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    // 검색결과 갤러리리스트
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "searchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }
  // 상태값
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // // 마지막 요소가 보이면 다음요소 로딩, 스크롤이벤트 쓰지말 것
  // // 이벤트가 너무 빈번하게 일어나 사용성이 좋지 않음, 리팩토링 해야함.
    // isElementInViewport(el) {
    //   const rect = el.getBoundingClientRect(); // 객체 좌표정보 출력
    //   return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //   ); // 화면에 보여지고 있다 여부 반환할 수 있음, 하지만 복잡하고 번거로움
    // }
  // // IntersectionObserver객체의 isIntersecting키값을 이용할 것, 뷰포트에 등장하면 true


    // // 요소에 이벤트 적용
    // applyEventToElemnt = (items) => {
    //   document.addEventListener('scroll', () => {
    //     items.forEach((el, index) => {
    //       if(this.isElementInViewport(el) && items.length -1 === index) this.onNextPage()
    //       // 해당 요소가 화면에 다 보여지는데 그게 마지막 요소일때 다음페이지 불러와라
    //     })
    //   })
    // }

// // IntersectionObserver 리팩토링
  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item => {
      if(item.isIntersecting){
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;
        // 아이템이 화면에 보일때, lazy loading적용(주소바꿔치기)
        let dataIndex = Number(item.target.dataset.index)
        if(dataIndex-1 === this.data.length) this.onNextPage()
        // 마지막 요소찾아내면 다음페이지 호출
      }
    })
  })

  render() {
    // 결과 리스트 삽입
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src='http://via.placeholder.com/200x200' data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");
    
    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      // 클릭시 상세정보 모달연결
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      // 마지막 요소가 보이면 다음요소 로딩, IntersectionObserver 리팩토링
      this.listObserver.observe($item)
    });

    // let listItems = this.$searchResult.querySelectorAll('.item');
    // this.applyEventToElemnt(listItems)
  }
}
