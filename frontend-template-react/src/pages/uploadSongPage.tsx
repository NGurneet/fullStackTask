import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  MenuItem,
  Fade,
} from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utils/toast-utils/toast.utils'; // Importing toast utils
import { useUploadSongMutation } from '../api/apiSlice'; // Adjust import based on your file structure
import { Navigate } from 'react-router-dom';

const genres = ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Country', 'Electronic'];

const UploadSongPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [uploadFile, { isLoading: isUploading, isError, error }] = useUploadSongMutation();
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSongDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setFile(null);
    setSongDetails({
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
    setUploadComplete(false);  // Reset the success state
  };

  const handleFileUpload = async () => {
    const { title, artist, album, genre } = songDetails;

    // Check for required fields
    if (!file || !title || !artist || !genre) {
      showErrorToast('Please fill in all required fields and select a file to upload.');
      return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('album', album);
    formData.append('genre', genre);

    try {
      // Call the uploadFile mutation using RTK Query
      await uploadFile(formData).unwrap();
      showSuccessToast('File uploaded successfully!');
      setFile(null);
      setUploadComplete(true);
      handleCloseDialog();
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000); // Redirect after 2 seconds of success message/animation
    } catch (err) {
      showErrorToast('File upload failed. Please try again.');
      console.error('Error during file upload:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Upload Song
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Choose Song
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Upload Song</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            {/* File Input */}
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: 'block', margin: '16px 0' }}
            />
            {file && (
              <TextField
                label="Selected Song"
                fullWidth
                disabled
                value={file.name}
                sx={{ mb: 2 }}
              />
            )}

            {/* Song Title */}
            <TextField
              name="title"
              label="Title"
              fullWidth
              required
              value={songDetails.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Artist Name */}
            <TextField
              name="artist"
              label="Artist"
              fullWidth
              required
              value={songDetails.artist}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Album Name */}
            <TextField
              name="album"
              label="Album (Optional)"
              fullWidth
              value={songDetails.album}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Genre Dropdown */}
            <TextField
              name="genre"
              label="Genre"
              fullWidth
              required
              select
              value={songDetails.genre}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleFileUpload}
            color="primary"
            variant="contained"
            disabled={isUploading || !file}
          >
            {isUploading ? <CircularProgress size={24} /> : 'Upload Song'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message or Animation */}
      <Fade in={uploadComplete} timeout={1000}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#4caf50',
            color: '#fff',
            borderRadius: '4px',
          }}
        >
          <Typography variant="body1">Song Uploaded Successfully!</Typography>
        </Box>
      </Fade>

      {/* Optional error display */}
      {isError && <p style={{ color: 'red' }}>{(error as { message: string }).message || 'Something went wrong!'}</p>}
    </Container>
  );
};

export default UploadSongPage;
