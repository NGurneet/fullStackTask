import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadSongMutation } from '../../api/apiSlice'; // Adjust the import path to your apiSlice
import { Button, TextField, Typography, Snackbar, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  songTitle: string;
  songArtist: string;
  songFile: FileList;
};

const UploadSongPage = () => {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [uploadFile] = useUploadSongMutation();

  const onSubmit = async (data: FormData) => {
    const { songTitle, songArtist, songFile } = data;

    if (!songFile || songFile.length === 0) {
      setMessage('Please choose a file to upload.');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', songTitle);
    formData.append('artist', songArtist);
    formData.append('file', songFile[0]);

    try {
      setLoading(true);
      await uploadFile(formData).unwrap();
      setMessage('Song uploaded successfully');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Failed to upload song. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Upload Song</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="songTitle"
          control={control}
          defaultValue=""
          rules={{ required: 'Song title is required' }}
          render={({ field }) => (
            <TextField
              label="Song Title"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.songTitle}
              helperText={errors.songTitle?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="songArtist"
          control={control}
          defaultValue=""
          rules={{ required: 'Artist name is required' }}
          render={({ field }) => (
            <TextField
              label="Artist"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.songArtist}
              helperText={errors.songArtist?.message}
              {...field}
            />
          )}
        />

        {/* <Controller
          name="songFile"
          control={control}
          rules={{ required: 'Please select a song file' }}
          render={({ field }) => (
            // <input
            //   type="file"
            //   accept="audio/*"
            //   {...field}
            // />
          )}
        /> */}
        {errors.songFile && <p style={{ color: 'red' }}>{errors.songFile?.message}</p>}
        
        <div style={{ marginTop: 10 }}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Upload Song'}
          </Button>
        </div>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </div>
  );
};

export default UploadSongPage;
