import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
    IGetMoviesResult,
    LIST_TYPE,
    getMovieTopRated,
    getNowMovies,
    getPopularMovies,
    getUpcomingMovies,
} from '../api.ts';
import styled from 'styled-components';
import { makeImagePath } from '../utils.ts';
import Sliders from '../Components/movie/slider.tsx';

const Wrapper = styled.div`
    background: black;
    padding-bottom: 200px;
`;

const Loader = styled.div`
    height: 20vh;
    text-align: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`;

const Title = styled.h1`
    font-size: 48px;
    width: 70%;
    margin-bottom: 20px;
    font-weight: 500;
`;
const Overview = styled.p`
    font-size: 25px;
    width: 50%;
`;

function Home() {
    ///api 데이터 가져오기
    const { data: nowPlayingMovies, isLoading } = useQuery<IGetMoviesResult>('nowPlaying', getNowMovies); //api 에서 data 추출
    const { data: upComingMovies, isLoading: upcomingIsLoading } = useQuery<IGetMoviesResult>(
        'upComing',
        getUpcomingMovies
    );
    const { data: popularMovies, isLoading: popularisLoading } = useQuery<IGetMoviesResult>(
        'popular',
        getPopularMovies
    );
    const { data: topRatedMovies, isLoading: topratedLoading } = useQuery<IGetMoviesResult>(
        'topRated',
        getMovieTopRated
    );

    return (
        <Wrapper>
            {isLoading && popularisLoading && upcomingIsLoading && topratedLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner bgPhoto={makeImagePath(nowPlayingMovies?.results[0].backdrop_path || '')}>
                        <Title>{nowPlayingMovies?.results[0].title}</Title>
                        <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
                    </Banner>

                    <Sliders
                        data={nowPlayingMovies as IGetMoviesResult}
                        title={'현재 상영중인 영화'}
                        listType={LIST_TYPE[0]}
                    />

                    <Sliders
                        data={topRatedMovies as IGetMoviesResult}
                        title={'잊혀 지지 않는 명화들'}
                        listType={LIST_TYPE[3]}
                    />

                    <Sliders
                        data={upComingMovies as IGetMoviesResult}
                        title={'개봉 예정 영화'}
                        listType={LIST_TYPE[1]}
                    />
                    <Sliders data={popularMovies as IGetMoviesResult} title={'인기있는 영화'} listType={LIST_TYPE[2]} />
                </>
            )}
        </Wrapper>
    );
}
export default Home;
