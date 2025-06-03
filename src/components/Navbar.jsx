import { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'; // Import logout icon
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import Upload from './Upload';
import { logout } from '../redux/userSlice'; // Import your logout action
import axios from 'axios'; // Import axios
import AvatarImg from '../assets/avatar.png'; 

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 999; /* Ensure navbar is above other elements */
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  color: ${({ theme }) => theme.text};
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%; 
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover; 
`;

const LogoutButton = styled(Button)` 
  gap: 5px;
  margin-left: 15px; 
  padding: 5px 10px;
`;


export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(logout());
      navigate("/signin"); 
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${q}`);
                }
              }}
            />
            
            <SearchOutlinedIcon 
              style={{ cursor: "pointer" }} 
              onClick={() => navigate(`/search?q=${q}`)} 
            /> 
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon 
                style={{ cursor: "pointer" }} 
                onClick={() => setOpen(true)} 
                title="Upload video"
              />
              
              <Avatar 
                src={currentUser.img || AvatarImg} 
                alt={currentUser.name || "User Avatar"} 
                title={currentUser.name}
              />
              {currentUser.name}
              
              {/* Logout Button */}
              <LogoutButton onClick={handleLogout} title="Logout">
                <ExitToAppOutlinedIcon style={{ fontSize: "18px" }}/>
                LOGOUT
              </LogoutButton>

            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar;