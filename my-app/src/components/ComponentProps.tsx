function Welcome(props: { name: string }) {
  // 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다
  return <h1>Hello, {props.name}</h1>;
}

function Example() {
  // 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있습니다.
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
