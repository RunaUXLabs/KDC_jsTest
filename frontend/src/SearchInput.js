const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.setAttribute("autofocus", true)

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
    // 키워드를 입력한 상태에서 input 을 클릭할 시 키워드 삭제
    $searchInput.addEventListener("click", e => e.target.value = '')
    console.log("SearchInput created.", this);
  }
  render() {}
}
