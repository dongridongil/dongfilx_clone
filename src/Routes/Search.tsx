import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { IGetMoviesSearch, getMoviesSearch, getTvsSearch } from '../api.ts';
import styled from 'styled-components';
import React from 'react';
import Modal from '../Components/search/modal.tsx';

const Wrapper = styled.div`
    margin-top: 100px;
    width: 100%;
    height: 100%;
    padding: 20px;
`;
const WrapperForm = styled.div`
    display: flex;
    justify-content: space-around;
`;
const Form = styled.form``;
const SearchTvMovie = styled.input`
    width: 300px;
    padding: 10px 20px;
    color: white;
    background-color: transparent;
    font-size: 20px;
`;
const SearhResult = styled.span`
    font-size: 30px;
`;

interface ISearchForm {
    searchTvMovie: string;
}

function Search() {
    const location = useLocation(); //현재위치를알수있다
    const search = new URLSearchParams(location.search).get('keyword'); //검색한 값을 가져오기
    // console.log('로케이션', location);
    // console.log('써치', search);
    const { register, handleSubmit } = useForm<ISearchForm>();

    const history = useNavigate();

    const { data: moviesData, isLoading: moviesLodaing } = useQuery<IGetMoviesSearch>(`searchMovie${search}`, () =>
        getMoviesSearch(search || '')
    );
    const { data: tvsData, isLoading: tvsLodaing } = useQuery<IGetMoviesSearch>(`searchTv${search}`, () =>
        getTvsSearch(search || '')
    );

    const onVaild = (dataSearch: ISearchForm) => {
        history(`/search?keyword=${dataSearch.searchTvMovie}`);
    };

    return (
        <Wrapper>
            <WrapperForm>
                <Form onSubmit={handleSubmit(onVaild)}>
                    <SearchTvMovie
                        type="text"
                        {...register('searchTvMovie', { required: true, minLength: 2 })}
                        placeholder="제목을 입력해주세요."
                    />
                </Form>
                <SearhResult>
                    {tvsData?.total_pages === 0 && moviesData?.total_pages === 0
                        ? `Movies, Tv 모두 검색 결과가 없습니다.`
                        : tvsData?.total_pages === 0 && moviesData?.total_pages !== 0
                        ? `${search}(으)로 검색한 결과입니다. 영화 검색 결과는 없습니다.`
                        : tvsData?.total_pages !== 0 && moviesData?.total_pages === 0
                        ? `${search}(으)로 검색한 결과입니다. TV 프로그램 검색 결과는 없습니다.`
                        : `${search}(으)로 검색한 결과입니다.`}
                </SearhResult>
            </WrapperForm>
            <Modal data={moviesData} option={'MOVIE'} keyword={search} menu={'movie'} />
            <Modal data={tvsData} option={'SERIES'} keyword={search} menu={'tv'} />
        </Wrapper>
    );
}

export default Search;
