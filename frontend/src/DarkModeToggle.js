class DarkModeToggle {
  isDarkMode = null;

  constructor({ $form }) {
    const $darkModeToggle = document.createElement("input");
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = "checkbox";
    this.$darkModeToggle.className = "darkModeToggle";

    const $label = document.createElement("label");
    this.$label = $label;
    this.$label.textContent = 'DarkMode';

    $form.appendChild($darkModeToggle);
    $form.appendChild($label);

    $darkModeToggle.addEventListener("change", e => {
      // console.dir(e.target)
      // console.log(e.target.checked);
      // document.documentElement.setAttribute('color-mode', e.target.checked ? 'dark' : 'light');
      this.setColorMode(e.target.checked);
      // 체크박스 체크 여부를 확인하여 color-mode속성값 제어, 리팩토링
    });
    // console.log("DarkModeToggle created.", this); // 생성여부 확인

    // 초기화
    this.initColorMode();

  }

  // 초기화, OS의 다크모드의 활성화 여부를 기반으로 body에 color-mode속성값 확인
  initColorMode() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // 현재창의 미디어쿼리 매칭여부 true/false
    // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.$darkModeToggle.checked = this.isDarkMode;
    // document.documentElement.setAttribute('color-mode', this.isDarkMode ? 'dark' : 'light');
    this.setColorMode(this.isDarkMode);
    // this.isDarkMode 값을 확인하여 color-mode속성값 제어, 리팩토링

    // 나중에 this.isDarkMode도 state로 변경하기로 한다. 직접 입력은 비추한다.
  }

  // 리팩토링
  setColorMode(color) {
    document.documentElement.setAttribute('color-mode', color ? 'dark' : 'light');
  }

  render() { }
}

export default DarkModeToggle;