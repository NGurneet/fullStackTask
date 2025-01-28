import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller from react-hook-form
import { showSuccessToast, showErrorToast } from '../../utils/toast-utils/toast.utils'; // Import success toast

type FormData = {
  playlistName: string;
};

const CreatePlaylistPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  // Handler to submit the new playlist
  const onSubmit = (data: FormData) => {
    const { playlistName } = data;

    // Check for valid playlist name
    if (!playlistName.trim()) {
      setError('Playlist name is required!');
      return;
    }
    
    // Mock save to localStorage or database (for now, we log it to the console)
    const existingPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
    existingPlaylists.push(playlistName);
    localStorage.setItem('playlists', JSON.stringify(existingPlaylists));

    // Show success toast notification after successful playlist creation
    showSuccessToast('Playlist created successfully!');

    // Navigate to user dashboard after playlist creation
    navigate('/user-dashboard');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Playlist
      </Typography>

      {/* Form to create a new playlist */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="playlistName"
          control={control}
          rules={{
            required: "Playlist name is required",
          }}
          render={({ field }) => (
            <TextField
              label="Playlist Name"
              fullWidth
              variant="outlined"
              {...field}
              error={!!errors.playlistName}
              helperText={errors.playlistName?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />

        {/* Display custom error message if present */}
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Create Playlist
        </Button>
      </form>
    </Box>
  );
};

export default CreatePlaylistPage;
