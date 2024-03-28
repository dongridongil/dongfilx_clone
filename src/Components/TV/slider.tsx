import styled from 'styled-components';
import { IGetMoviesResult, IGetSeriesResult } from '../../api.ts';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { makeImagePath } from '../../utils.ts';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BigSeries from './BigSeries.tsx';

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    gap: 10px;
    align-self: center;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
    /* position: relative; */
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    color: red;
    font-size: 36px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
    display: flex;
    align-items: flex-end;
    cursor: pointer;
`;

const rowVariants = {
    hidden: {
        x: window.innerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.innerWidth - 5,
    },
};
const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            duration: 0.25,
            delay: 0.5,
            type: 'tween',
        },
    },
};

const Info = styled(motion.div)`
    padding: 10px;
    color: white;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: relative;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            duration: 0.1,
            delay: 0.5,
            type: 'tween',
        },
    },
};

const StyledIcon = styled(FontAwesomeIcon)`
    z-index: 99;
    opacity: 0.3;
    &:hover {
        opacity: 1;
    }
    color: #ff7675;
    cursor: pointer;
`;
const SlideBox = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 200px;
`;

const MenuTitle = styled.h2`
    position: absolute;
    font-size: 20px;
    top: -100px;
    margin-left: 20px;
    font-weight: 500;
`;

interface ISlider {
    data: IGetSeriesResult;
    title: string;
    tvType: string;
}

function Sliders({ data, title }: ISlider) {
    const offset = 6;
    const history = useNavigate();
    const bigSeriesMatch: PathMatch<string> | null = useMatch('/tv/:tvId');
    const [index, setIndex] = useState(0);
    const onBoxClicked = (tvId: number) => {
        history(`/tv/${tvId}`);
    };
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);

    const [back, setBack] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setLeaving(true);
            setBack(false);
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.ceil(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            setBack(true);
            setLeaving(true);
            setIndex((prev) => (prev === 0 ? 3 : prev - 1));
        }
    };

    return (
        <>
            <SlideBox>
                <MenuTitle>{title}</MenuTitle>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={{ back }}>
                    <StyledIcon icon={faAngleLeft} size="6x" onClick={decreaseIndex} />
                    <Row
                        custom={{ back }}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: 'tween', duration: 1 }}
                        key={index}
                    >
                        {data?.results
                            .slice(1)
                            .slice(offset * index, offset * index + offset)
                            .map((tv) => (
                                <Box
                                    key={tv.id}
                                    whileHover="hover"
                                    initial="normal"
                                    variants={boxVariants}
                                    onClick={() => onBoxClicked(tv.id)}
                                    transition={{ type: 'tween' }}
                                    bgPhoto={makeImagePath(tv.backdrop_path, 'w500')}
                                >
                                    <Info variants={infoVariants}>
                                        <h4>{tv.name}</h4>
                                    </Info>
                                </Box>
                            ))}
                    </Row>
                    <StyledIcon icon={faAngleRight} size="6x" onClick={increaseIndex} />
                </AnimatePresence>
            </SlideBox>
            <AnimatePresence>
                {bigSeriesMatch ? (
                    <>
                        <BigSeries id={bigSeriesMatch.params.tvId!} />
                    </>
                ) : null}
            </AnimatePresence>
        </>
    );
}
export default Sliders;
