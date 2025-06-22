import styled from 'styled-components'
import logo from '../img/youtube.svg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: auto;
  min-height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    flex: 0;
    width: 20vw;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;

  span{
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background: ${({ theme }) => theme.soft};
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};

  @media (max-width: 768px) {
   display: none;
  }
`;

const Login = styled.div`
  padding: 10px 0; 

  @media (max-width: 768px) {
      display: none;
    }
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;


const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logo} alt="VideoTube Logo" />
            <span>VideoTube</span>
          </Logo>
        </Link>


        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeOutlinedIcon />
            <span>Home</span>
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon />
            <span>Explore</span>
          </Item>
        </Link>


        {currentUser && (
          <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <SubscriptionsIcon />
              <span>Subscriptions</span>
            </Item>
          </Link>
        )}

        <Hr />


        {currentUser ? (
          <>
            <Item>
              <VideoLibraryOutlinedIcon />
              <span>Library</span>
            </Item>
            <Item>
              <HistoryToggleOffOutlinedIcon />
              <span>History</span>
            </Item>
          </>
        ) : (

          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  Sign in
                </Button>
              </Link>
            </Login>
          </>
        )}
        <Hr />


        <Title>Best of VideoTube</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          <span>Music</span>
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          <span>Sports</span>
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          <span>Games</span>
        </Item>
        <Item>
          <MovieCreationOutlinedIcon />
          <span>Movies</span>
        </Item>
        <Item>
          <NewspaperOutlinedIcon />
          <span>News</span>
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          <span>Live</span>
        </Item>
        <Hr />


        <Item>
          <SettingsOutlinedIcon />
          <span>Settings</span>
        </Item>
        <Item>
          <OutlinedFlagRoundedIcon />
          <span>Report</span>
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          <span>Help</span>
        </Item>

        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          <span>{darkMode ? "Light" : "Dark"} Mode</span>
        </Item>
      </Wrapper>
    </Container>
  );
};


Menu.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};


export default Menu;