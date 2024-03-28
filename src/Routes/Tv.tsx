import React from 'react';
import { useQuery } from 'react-query';
import { IGetSeriesResult, TV_TYPE, getSeriesOntheAir, getSeriesPopular, getSeriesTopRated } from '../api.ts';
import styled from 'styled-components';
import { makeImagePath } from '../utils.ts';
import Sliders from '../Components/TV/slider.tsx';

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background: cover;
`;

const Overview = styled.p`
    font-size: 20px;
    width: 50%;
`;

const Title = styled.h2`
    font-size: 48px;
    margin-bottom: 10px;
`;
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

/////////

function Tv() {
    const { data: nowSeries, isLoading: nowIsloading } = useQuery<IGetSeriesResult>('nowSeries', getSeriesOntheAir);
    const { data: popularSeries, isLoading: popularIsloading } = useQuery<IGetSeriesResult>(
        'popularSeries',
        getSeriesPopular
    );
    const { data: topRatedSeries, isLoading: topRatedIsloading } = useQuery<IGetSeriesResult>(
        'topRatedSeries',
        getSeriesTopRated
    );

    return (
        <Wrapper>
            {nowIsloading && popularIsloading && topRatedIsloading ? (
                <Loader>로딩중...</Loader>
            ) : (
                <>
                    <Banner bgPhoto={makeImagePath(topRatedSeries?.results[8].backdrop_path || '')}>
                        <Title>{topRatedSeries?.results[8].name}</Title>
                        <Overview>{topRatedSeries?.results[8].overview}</Overview>
                    </Banner>
                    <Sliders
                        data={topRatedSeries as IGetSeriesResult}
                        title={'잊혀 지지 않는 명작들'}
                        tvType={TV_TYPE[0]}
                    />
                    <Sliders data={nowSeries as IGetSeriesResult} title={'현재 나오는 시리즈'} tvType={TV_TYPE[0]} />
                    <Sliders
                        data={popularSeries as IGetSeriesResult}
                        title={'현재 인기있는 시리즈'}
                        tvType={TV_TYPE[0]}
                    />
                </>
            )}
        </Wrapper>
    );
}

export default Tv;
