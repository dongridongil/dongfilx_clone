import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ISearchMovie, getMovieDetail } from '../../api.ts';
import React from 'react';
import { makeImagePath } from '../../utils.ts';
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
        left: 27em;
    }
`;

const OriginalTitle = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    top: -6.5em;
    left: 27em;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    top: -10.5em;
    left: 26.6em;

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
    left: 26em;
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

const Overview = styled.span`
    display: flex;
    align-items: center;
    position: relative;
    top: -4em;
    left: 27em;
    font-size: 16px;
`;
const Icon = styled.div`
    margin-left: 5px;
    margin-top: 12px;
`;

interface IBigSearchProp {
    id: string;
    menu: string;
    keyword: string | null;
    option: string;
}

function BigScreenSearchMovie({ id, menu, keyword, option }: IBigSearchProp) {
    const history = useNavigate();
    const { data: searchMovie, isLoading } = useQuery<ISearchMovie>(`searchMovie${id}`, () => getMovieDetail(id));
    console.log('searchMovie', searchMovie);

    const onClickBackHome = () => {
        history(`/search?keyword=${keyword}`);
    };
    return (
        <>
            <Overlay onClick={onClickBackHome} />
            <BigMovie>
                <>
                    <BigImg
                        style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                searchMovie?.backdrop_path || searchMovie?.poster_path || '',
                                'w500'
                            )})`,
                        }}
                    ></BigImg>
                    <PosterImg
                        style={{
                            backgroundImage: `url(${makeImagePath(searchMovie?.poster_path || '', 'w500')})`,
                        }}
                    />
                    <ReleaseDate>
                        {' '}
                        {searchMovie?.release_date && searchMovie.release_date.split('-')[0]} 년{' '}
                    </ReleaseDate>
                    <ReleaseDate>{searchMovie?.runtime} 분</ReleaseDate>
                    <DetailBox>
                        <OriginalTitle>
                            <h3>{searchMovie?.original_title}</h3>
                        </OriginalTitle>

                        <TitleBox>
                            <h2>{searchMovie?.title}</h2>

                            <h2> {searchMovie?.vote_average.toFixed(1)}</h2>
                            <Icon>
                                <IoStarSharp size="23px" color="gold" />
                            </Icon>
                        </TitleBox>
                        {searchMovie?.genres.map((data) => (
                            <GenreTag>{data.name}</GenreTag>
                        ))}

                        <Overview>{searchMovie?.overview}</Overview>
                    </DetailBox>
                </>
            </BigMovie>
        </>
    );
}

export default BigScreenSearchMovie;
