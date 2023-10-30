function Jsx() {
  // 1. 표현식을 html에 표현할 때는 {}로 감싼다.
  // JSX는 컴파일이 끝나면, JS 객체로 인식되므로,
  // if문, for문 등의 제어문을 사용할 수 있다.
  const name = "react";

  function formatName(name: string) {
    return name + "님";
  }

  return <span>{name ? formatName(name) : ""}</span>;
}

function JsXAttribute() {
  // 2. html 속성에 값을 중괄호로 감싸면, JS 표현식으로 취급된다.
  const imgSrc = "";
  return <img src={imgSrc} />;
}

function ClassNames() {
  // 3. JSX는 HTML보다 JS에 가깝기에, HTML 속성을 camelCase로 작성한다.
  // ex) class -> className, tabindex -> tabIndex
  return;
  <div className="hello">하하</div>;
}

// html to jsx 변환기
// https://transform.tools/html-to-jsx
