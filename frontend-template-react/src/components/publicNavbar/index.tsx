import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Button, Typography, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PublicNavbar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /**
   * Handle search button click.
   * This function currently logs the search query to the console.
   * In the future, it should navigate to a search results page.
   */
  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  const handleHamburgerMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1a1a1a" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6" sx={{ color: 'gold' }}>
              Amplify
            </Typography>
          </motion.div>

          {/* Search Bar - Centered */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2, justifyContent: 'center', flexGrow: 1 }}>
            <motion.input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search songs, albums..."
              style={{
                padding: '10px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                width: '300px',
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            <IconButton onClick={handleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Sign In Button - Rightmost */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </motion.div>

          {/* Hamburger Menu for Mobile (Optional) */}
          <IconButton
            edge="start"
            sx={{ display: { sm: 'none' }, color: 'white' }}
            onClick={handleHamburgerMenu}
          >
            {/* Can add an icon here for hamburger menu */}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu for Navigation */}
      {mobileMenuOpen && (
        <Box sx={{ position: 'absolute', top: 64, right: 0, backgroundColor: '#333', padding: 2 }}>
          {/* Map through menu items if needed */}
        </Box>
      )}
    </AppBar>
  );
};

export default PublicNavbar;
