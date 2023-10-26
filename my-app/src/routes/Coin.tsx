import { useLocation, useParams, Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../apis/coin";

import Chart from "./Chart";
import Price from "./Price";

// useRouteMatch는 
// match객체의 값에 접근할 수 있게 해주는 hook
// 인자로 컴포넌트의 프로퍼티들(path, strict, sensitive, exact)을 가진 객체를 넘길 수 있으며
// -> 만약 path프로퍼티와 현재 페이지의 URL이 일치할 경우 해당 path의 match객체를 반환하고 일치하지 않을 경우 null을 반환한다.
// -> 만약 아무 인자도 넘겨주지 않으면 제일 가까운 부모 컴포넌트의 match값을 리턴한다.


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

// props 값을 받아서 css를 적용할 수 있다.
const Tab = styled.span<{ isActive: boolean }>`
  text-algin: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    padding: 7px 0px;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string
}

interface RouteParams {
  coinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}


function Coin() { 
  const { coinId } = useParams<RouteParams>(); 
  // useLocation은 현재 URL의 정보를 가져온다.(route state를 가져올 수 있음)
  const { state } = useLocation<RouteState>();
  
  // useRouteMatch는 인자(path)와 일차하는 URL의 정보를 가져온다.
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data:infoData } = useQuery<InfoData>(["coinInfo", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data:tickersData } = useQuery<PriceData>(["coinTickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;

  return (<Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              {/* Link는 a태그와 비슷하다. */}
              {/* a태그와 다른 점은 Link는 페이지를 새로고침하지 않고 페이지를 이동시켜준다. */}
              {/* Link는 to라는 프로퍼티를 가진다. */}
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/* Switch는 한 번에 하나의 Route만 렌더링하도록 도와준다. */}
          {/* Route는 URL을 가져와서 해당하는 컴포넌트를 렌더링한다. */}
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`:coinId/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;