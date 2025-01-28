import React from 'react';
import { useFetchSongsQuery } from '../../api/apiSlice';
import { Card, CardContent, Typography } from '@mui/material';
import SongPlayer from '../SongPlayer'; // Assuming the SongPlayer component is in the same directory

const SongList = () => {
  const { data, isLoading, isError } = useFetchSongsQuery();
  const songs = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <Typography>Loading songs...</Typography>;
  if (isError) return <Typography>Error fetching songs. Please try again later.</Typography>;

  if (!songs.length) return <Typography>No songs available</Typography>;

  return (
    <div style={{ display: 'grid', gap: '16px', padding: '16px' }}>
      {songs.map((song) => (
        <Card
          key={song.id || song.title} // Ensure a unique key, using `id` or `title` as a fallback
          sx={{ backgroundColor: '#f5f5f5', borderRadius: 8, boxShadow: 1 }}
        >
          <CardContent>
            <Typography variant="h6">{song.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {song.artist}
            </Typography>
            {/* Add the SongPlayer component to play songs */}
            <SongPlayer audioSrc={song.audioUrl} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SongList;
