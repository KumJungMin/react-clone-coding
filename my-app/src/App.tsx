import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

// BrowserRouter는 HTML5의 History API를 사용하여 주소를 관리한다.
// Switch는 한번에 오직 하나의 Route만 Render하게 해준다.
// Route는 path에 해당하는 컴포넌트를 렌더링한다.

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* path에 array를 사용하면, 두 가지 path일 때 띄울 컴포넌트를 지정할 수 있다 */}
      <Switch>
        <Route path={["/", "/movies/:moveId"]}>
          <Home />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
