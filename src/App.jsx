import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from "styled-components"
import Menu from "./components/Menu"
import { Navbar } from "./components/Navbar"
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import Home from './pages/Home';
import Video from './pages/Video';
import Signin from './pages/Signin';
import Search from './pages/Search';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  height: auto;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};

  @media (max-width: 768px) {
    flex: 0;
    
  }
  `;

const Wrapper = styled.div`
padding: 22px 96px;
width: auto;


@media (max-width: 768px) {
  padding: 0;
  width: 80vw;;
    }
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home type="random" /> : <Signin />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App