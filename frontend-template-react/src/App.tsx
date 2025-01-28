import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Signup from './pages/signuppage';
import LoginPage from './pages/loginpage';
import AdminDashboardPage from './pages/adminpage';
import UploadSongPage from './pages/uploadSongPage';
import SongsPage from './pages/songlistpage';
import PublicElements from './layouts/public';
import Basic from './layouts/Basic';
import AdminPrivateRoute from './components/AdminPrivateRoutes';
import UserPrivateRoute from './components/UserPrivateRoutes'; // Import UserPrivateRoute component
import UserDashboardPage from './pages/user-dashboard-page';
import PlaylistComponent from './components/Playlist';
import CreatePlaylistPage from './components/CreatePlaylist';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicElements />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* Admin Routes */}
        {/* <Route element={<AdminPrivateRoute />}> */}
          <Route element={<Basic />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/upload" element={<UploadSongPage />} />
            <Route path='/playlists' element= {<PlaylistComponent />} />
            <Route path='/create-playlist'element={<CreatePlaylistPage />} />
          </Route>
        {/* </Route> */}

        {/* User Routes */}
        {/* <Route element={<UserPrivateRoute />}> */}
          <Route element={<Basic />}>
            {/* You can define other user-related routes here */}
            <Route path="/user-dashboard" element={<UserDashboardPage />} /> {/* Add your user dashboard */}
          {/* </Route> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
