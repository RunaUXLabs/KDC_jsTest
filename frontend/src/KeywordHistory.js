class KeywordHistory {
    $keywordHidtory = null;
    data = null;

    constructor({ $wrap }) {
        const $keywordHidtory = document.createElement('ul');
        this.$keywordHidtory = $keywordHidtory;
        this.$keywordHidtory.className = 'keywordHistory';
        $wrap.appendChild(this.$keywordHidtory);
    }
}