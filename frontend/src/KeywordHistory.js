import uniqueArray from "./utils/uniqueArray.js";

class KeywordHistory {
    $keywordHidtory = null;
    data = null;

    constructor({ $wrap, onSearch }) {
        const $keywordHidtory = document.createElement('ul');
        this.$keywordHidtory = $keywordHidtory;
        this.$keywordHidtory.className = 'keywordHistory';
        $wrap.appendChild(this.$keywordHidtory);

        // 초기화
        this.init();
        this.onSearch = onSearch;
        this.render();
    }
    // 초기화, 로컬스토리지에서 키워드 가져오기, SearchInput에서 엔터를 치는 시점에 키워드를 로컬스토리지에 문자열로 저장하라고 하고 그것을 불러온다
    init() {
        let data = this.getHistory();
        // console.log(data)
        this.setState(data);
    }

    // 키워드 저장
    addKeyword(keyword) {
        // 로컬스토리지에 키워드 저장하여 키워드 히스토리에서 연동
        let keywordHistory = this.getHistory();
        keywordHistory.unshift(keyword); // 키워드 앞으로 추가
        keywordHistory = uniqueArray(keywordHistory); // 중복제거
        keywordHistory = keywordHistory.slice(0, 5); // 키워드갯수 5개 제한
        localStorage.setItem('keywordHistory', keywordHistory.join(',')); // 문자열로 변환

        // 초기화하여 실시간 반영
        this.init();
    }

    // 값 가져오기, 리팩토링
    getHistory() {
        // 로컬스토리지 keywordHistory 값이 null이면 빈배열 반환, 있으면 배열로 변환
        return localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
    }

    // 상태값
    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        // 최근검색어 구현
        this.$keywordHidtory.innerHTML = this.data
            .map(
                keyword => `
                    <li><button type='button'>${keyword}</button></li>
                `
            ).join('');
        // 최근검색어 검색연동
        this.$keywordHidtory.querySelectorAll('li button').forEach(
            ($button, index) => {
                $button.addEventListener('click', () => {
                    // console.log(this.data[index])
                    this.onSearch(this.data[index]);
                });
            });

    }
}

export default KeywordHistory;