import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./routes/Coin"; 
import Coins from "./routes/Coins";

// Route는 URL을 가져와서 해당하는 컴포넌트를 렌더링한다.
// Switch는 한 번에 하나의 Route만 렌더링하도록 도와준다.
function  Router() {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Coins />
      </Route>
      <Route exact path="/:coinId">
        <Coin />
      </Route>
    </Switch>
  </BrowserRouter>
}

export default Router;