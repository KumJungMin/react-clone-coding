import styled from "styled-components";

import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils/format";
import { useState } from "react";
import { useMovies } from "../hooks/movie";
import type { IMoviesResult } from "../apis/movie";
import { useHistory, useRouteMatch } from "react-router-dom";
// !! useHistory는 history 객체를 반환한다.
// -> history 객체는 브라우저의 history 스택에 접근할 수 있는 메서드를 제공한다.
// !! useRouteMatch는 현재 URL과 일치하는지 여부를 확인할 수 있다.
// -> useRouteMatch는 match 객체를 반환한다.

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

// !! 재사용되지 않는 스타일의 타입은 <{props명: string}>으로 바로 지정해줘도 된다.
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  // !! first-child란, 해당 컴포넌트의 첫번째 자식을 의미한다.(태그 무관)
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const OFFSET = 6;

function Home() {
  const history = useHistory(); // useHistory는 history 객체를 반환한다.
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId"); // useRouteMatch는 현재 URL과 일치하는지 여부를 확인할 수 있다.
  const { scrollY } = useViewportScroll();

  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const slicedData = (data: IMoviesResult) => {
    return data.results.slice(1).slice(OFFSET * index, OFFSET * index + OFFSET);
  };

  const { data, isLoading } = useMovies({ select: slicedData });

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  const increaseIndex = () => {
    if (data) {
      if (isLeaving) return;
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / OFFSET) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setIsLeaving((prev) => !prev);

  // !! history.push는 history 스택에 새 항목을 추가한다.
  // -> 새 항목이 현재 항목이 되고, 브라우저는 새 항목을 표시한다.
  // -> 뒤로가기를 누르면 이전 항목이 현재 항목이 되고, 브라우저는 이전 항목을 표시한다.
  const onBoxClicked = (movieId: number) => history.push(`/movies/${movieId}`);
  const onOverlayClick = () => history.push("/");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data[0].backdrop_path || "")}
          >
            <Title>{data[0].title}</Title>
            <Overview>{data[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data.map((movie) => (
                  <Box
                    layoutId={movie.id + ""}
                    key={movie.id}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    onClick={() => onBoxClicked(movie.id)}
                    transition={{ type: "tween" }}
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
