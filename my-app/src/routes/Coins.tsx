import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
// useSetRecoilState는 atom의 값을 변경할 수 있는 함수를 반환한다.
import { isDarkAtom } from "../atoms/theme";

import { Helmet } from "react-helmet"; 
// Helmet은 리액트 앱의 head태그를 수정할 수 있게 해주는 라이브러리

import { fetchCoins } from "../apis/coin";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid #fff;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// interface에 접두사 I를 붙여, 인터페이스임을 명시한다.
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // useQuery(키, 비동기함수) 형식으로 API를 호출한다.
  // 키 값은 캐시를 위한 값이다. 
  const { isLoading, data = [] } = useQuery<ICoin[]>("totalCoins", fetchCoins); 
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  // setDarkAtom에서 인자로 이전 값을 받아서, 이전 값의 반대 값을 반환한다.

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={ toggleDarkAtom }>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ): 
        <CoinsList>
          {data
            .slice(0, 100)
            . map((coin) => (
              <Coin key={coin.id}>
                <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}>
                  <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  <span>
                    {coin.name} &rarr
                  </span>
                </Link>  
              </Coin>
            ))}
        </CoinsList>
      }
    </Container>
  );
}
export default Coins;