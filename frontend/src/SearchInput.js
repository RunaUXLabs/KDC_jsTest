const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $section = document.createElement("section");
    this.$section = $section;

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.setAttribute("autofocus", true)

    $searchInput.className = "searchInput";

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // 랜덤버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    $randomButton.className = "randomButton";
    $randomButton.type = "button";
    $randomButton.textContent = "랜덤고양이👀";
        
    $target.appendChild($section);
    $section.appendChild($searchInput);
    $section.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
      onRandomSearch()
    })

    // 키워드를 입력한 상태에서 input 을 클릭할 시 키워드 삭제
    $searchInput.addEventListener("click", e => e.target.value = '')
    console.log("SearchInput created.", this);
  }
  render() {}
}
