import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../../utils.ts';
import React from 'react';
import { ISearchTv, getSeriesDetail } from '../../api.ts';
import { IoStarSharp } from 'react-icons/io5';

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const BigMovie = styled(motion.div)`
    width: 60vw;
    height: 90vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: ${(props) => props.theme.black.lighter};
    border-radius: 50px;
    overflow: hiden;
`;

const BigImg = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 45vh;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
`;

const PosterImg = styled.div`
    width: 15vw;
    height: 43vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 150px;
    left: 20px;
    border-radius: 10px;
`;

const DetailBox = styled.div`
    width: 60%;

    p {
        display: block;
        padding: 20px;
        position: relative;
        top: -2em;
        left: 18em;
    }
`;

const OriginalTitle = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    top: -6.5em;
    left: 19em;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    top: -10.5em;
    left: 18.5em;

    h2 {
        color: ${(props) => props.theme.white.lighter};
        font-size: 30px;
        &:nth-child(2) {
            font-size: 24px;
            color: #e84118;
            margin-left: 25px;
            margin-top: 10px;
        }
    }
`;

const GenreTag = styled.span`
    position: relative;
    top: -7.5em;
    left: 18em;
    opacity: 0.7;
    margin-left: 10px;
    background-color: #273c75;
    padding: 5px 10px;
    border-radius: 10px;
`;

const ReleaseDate = styled.span`
    position: relative;
    background-color: black;
    font-size: 14px;
    top: 11em;
    left: 1.7em;
    opacity: 0.7;
    padding: 0.2em 0.5em;
    border: 1.5px solid whitesmoke;
    border-radius: 5px;
    color: #37ff00;
`;
const Icon = styled.div`
    margin-left: 5px;
    margin-top: 12px;
`;
interface IBigtvProp {
    id: string;
}

function BigSeries({ id }: IBigtvProp) {
    const history = useNavigate();
    const { data: searchSeries } = useQuery<ISearchTv>(['series', `${id}_detail`], () => getSeriesDetail(id));
    const onClickBackHome = () => {
        history('/tv');
    };
    return (
        <>
            <Overlay onClick={onClickBackHome} />
            <BigMovie>
                <>
                    <BigImg
                        style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                searchSeries?.backdrop_path || searchSeries?.poster_path || '',
                                'w500'
                            )})`,
                        }}
                    ></BigImg>
                    <PosterImg
                        style={{
                            backgroundImage: `url(${makeImagePath(searchSeries?.poster_path || '', 'w500')})`,
                        }}
                    />
                    <ReleaseDate>
                        {searchSeries?.first_air_date && searchSeries?.first_air_date.split('-')[0]}
                    </ReleaseDate>

                    <DetailBox>
                        <OriginalTitle>
                            <h3>{searchSeries?.original_name}</h3>
                        </OriginalTitle>

                        <TitleBox>
                            <h2>{searchSeries?.name}</h2>

                            <h2> {searchSeries?.vote_average.toFixed(1)}</h2>
                            <Icon>
                                <IoStarSharp size="23px" color="gold" />
                            </Icon>
                        </TitleBox>
                        {searchSeries?.genres.map((data) => (
                            <GenreTag>{data.name}</GenreTag>
                        ))}
                        <p>{searchSeries?.overview}</p>
                    </DetailBox>
                </>
            </BigMovie>
        </>
    );
}

export default BigSeries;
