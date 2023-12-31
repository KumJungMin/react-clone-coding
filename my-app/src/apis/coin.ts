const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const data = await fetch(`${BASE_URL}/coins`);
  return data.json();
}

export async function fetchCoinInfo(coinId: string) {
  const data = await fetch(`${BASE_URL}/coins/${coinId}`);
  return data.json();
}

export async function fetchCoinTickers(coinId: string) {
  const data = await fetch(`${BASE_URL}/tickers/${coinId}`);
  return data.json();
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}