class RandomButton {
    $randomButton = null;
    data = null;

    constructor({ $form, onRandomSearch }) {
        // 랜덤버튼
        const $randomButton = document.createElement("button");
        this.$randomButton = $randomButton;
        $randomButton.className = "randomButton";
        $randomButton.type = "button";
        $randomButton.textContent = "랜덤👀출력";

        $form.appendChild($randomButton);

        // 랜덤버튼 실행
        $randomButton.addEventListener("click", e => onRandomSearch());
    }
}

export default RandomButton;