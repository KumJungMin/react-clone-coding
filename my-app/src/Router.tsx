import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./routes/Coin"; 
import Coins from "./routes/Coins";

interface IRouterProps {}


// Route는 URL을 가져와서 해당하는 컴포넌트를 렌더링한다.
// Switch는 한 번에 하나의 Route만 렌더링하도록 도와준다.
function  Router({}: IRouterProps) {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/:coinId">
        <Coin />
      </Route>
        <Coins />
    </Switch>
  </BrowserRouter>
}

export default Router;