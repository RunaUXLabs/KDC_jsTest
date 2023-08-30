const TEMPLATE = '<input type="text">';

class SearchInput {
  $searchInput = null;
  data = null;

  constructor({ $form, onSearch }) {
    // 검색창과 키워드히스토리 그룹핑
    const $wrap = document.createElement("div");
    this.$wrap = $wrap;
    this.$wrap.className = "wrap";
    $form.appendChild($wrap);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.className = "searchInput";
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.setAttribute("autofocus", true);

    $wrap.appendChild($searchInput);

    $searchInput.addEventListener("keypress", e => {
      /** keyup과 keydown은 이벤트 요청을 할 때 한글일 경우 두번 요청하게된다.
       *  메모리 문제도 생기게 되고 API 요청 과부하가 걸릴 수 있으니 1번만 넘기려면 keypress가 적당하다.
       *  엔터치면 onSearch()로 키워드 검색하고 로컬스토리지에 키워드를 배열로 저장한다.
       *  form에 넣었기때문에 엔터 submit기능 막음
       */
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch(e.target.value);
        // 로컬스토리지에 키워드 저장하여 KeywordHistory에서 연동, 부모컴포넌트에 작성했던 기능 이관
        this.keywordHistory.addKeyword(e.target.value);
      };
    });

    // 키워드를 입력한 상태에서 input 을 클릭할 시 키워드 삭제
    $searchInput.addEventListener("click", e => e.target.value = '');
    // console.log("SearchInput created.", this);

    // 키워드 히스토리 생성
    this.keywordHistory = new KeywordHistory({
      $wrap,
      onSearch
      // constructor에서 받는 파라미터 꼭 적어줘야 함!
    });

  }
  render() { }
}
