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
    this.$searchInput.setAttribute("autofocus", true)

    $wrap.appendChild($searchInput);

    // 엔터치면 실행
    $searchInput.addEventListener("keyup", e => {
      if (e.key === 'Enter') onSearch(e.target.value);
    });

    // 키워드를 입력한 상태에서 input 을 클릭할 시 키워드 삭제
    $searchInput.addEventListener("click", e => e.target.value = '')
    console.log("SearchInput created.", this);

    // 키워드 히스토리 생성
    this.keywordHistory = new KeywordHistory({
      $wrap,
    });
    
  }
  render() {}
}
