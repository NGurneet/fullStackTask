import React, { Suspense, lazy } from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { useFetchSongsQuery } from '../../api/apiSlice';

// Lazy load the SongCard component
const SongCard = lazy(() => import('../SongCard'));

const SongList: React.FC = () => {
  const { data, isLoading, isError } = useFetchSongsQuery();
  const songs = Array.isArray(data) ? data : data?.data || [];

  if (isLoading)
    return (
      <Box sx={{ width: '100%', padding: '16px' }}>
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  if (isError)
    return <Typography>Error fetching songs. Please try again later.</Typography>;

  return (
    <Box sx={{ width: '100%', padding: '16px' }}>
      <Grid container spacing={2}>
        {songs.length === 0 ? (
          <Typography>No songs available</Typography>
        ) : (
          <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={300} />}>
            {songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} key={song.id}>
                <SongCard song={song} />
              </Grid>
            ))}
          </Suspense>
        )}
      </Grid>
    </Box>
  );
};

export default SongList;
