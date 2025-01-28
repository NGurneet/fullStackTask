import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Menu, MenuItem, IconButton, Typography, Avatar, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false); // for scroll effect

  // Initialize navigate from react-router-dom
  const navigate = useNavigate();

  // Navigation menu items
  const menuItems = ["Songs", "Playlists", "Admin"];
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHamburgerMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to the login page (or any page you'd like)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const onScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: "#1a1a1a",
        transition: "background-color 0.3s ease",
        boxShadow: sticky ? '0 4px 8px rgba(0,0,0,0.2)' : 'none', // Apply box-shadow for sticky effect
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'gold' }}>
            Amplify
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search songs, albums..."
              style={{
                padding: '10px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                width: '200px',
                transition: 'width 0.3s ease',
              }}
            />
            <IconButton onClick={handleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: 'white',
                  transition: 'color 0.3s ease', // Added transition on hover
                  '&:hover': { color: 'gold' }
                }}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton edge="end" onClick={handleProfileMenuOpen}>
              <Avatar alt="Admin" src="/static/images/avatar/1.jpg" sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.3s ease' } }} />
            </IconButton>
          </Box>

          <IconButton
            edge="start"
            sx={{
              display: { sm: 'none' },
              color: 'white',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'rotate(90deg)' }
            }}
            onClick={handleHamburgerMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {profileMenu}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Box sx={{ position: 'absolute', top: 64, right: 0, backgroundColor: '#333', padding: 2, animation: 'slide-in 0.5s ease-in-out' }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={() => navigate(`/${item.toLowerCase()}`)}>
              {item}
            </MenuItem>
          ))}
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
