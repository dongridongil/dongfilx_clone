import React from 'react';
import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter를 Router로 변경

import Tv from './Routes/Tv.tsx';
import Home from './Routes/Home.tsx';
import Search from './Routes/Search.tsx';
import Header from './Components/Header.tsx';

function App() {
    return (
        <HashRouter>
            <Header />

            <Routes>
                <Route path={'/tv'} element={<Tv />} />
                <Route path={'/tv/:tvId'} element={<Tv />}></Route>
                <Route path="/search" element={<Search />} />
                <Route path={'/search/tv/:id'} element={<Search />}></Route>
                <Route path={'/search/movie/:id'} element={<Search />}></Route>
                <Route path={'/'} element={<Home />} />
                <Route path={'/movies/:movieId'} element={<Home />} />;
            </Routes>
        </HashRouter>
    );
}

export default App;
