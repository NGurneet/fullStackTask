
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, logout } from './authSlice'; // Assuming you have authSlice for token management
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * A wrapper around `baseQuery` that will attempt to refresh the token if a `401` is received.
 *
 * If the refresh is successful, the original request will be retried with the new token.
 * If the refresh fails, the user will be logged out.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/users/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newToken = (refreshResult.data as { token: string }).token;
      localStorage.setItem('authToken', newToken);
      api.dispatch(setToken(newToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  /**
   * Defines the API endpoints exposed by the server.
   *
   * The endpoints are as follows:
   * - `login`: Logs in a user and returns a token.
   * - `refreshToken`: Refreshes the token for a user.
   * - `signup`: Creates a new user and returns a token.
   * - `uploadSong`: Uploads a song to the server.
   * - `fetchSongs`: Fetches all songs from the server.
   * - `fetchSongsInAlbum`: Fetches all songs in a given album.
   * - `deleteSong`: Deletes a song from the server.
   * - `likeSong`: Likes a song.
   * - `dislikeSong`: Dislikes a song.
   */
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<{ token: string }, void>({
    /**
     * Makes a POST request to `/users/refresh-token` to refresh the user's token.
     *
     * Returns a new token if the refresh is successful, and logs out the user if it fails.
     */
      query: () => ({
        url: '/users/refresh-token',
        method: 'POST',
      }),
    }),
    signup: builder.mutation<{ token: string }, { name: string; email: string; password: string }>({
    /**
     * Makes a POST request to `/users` to create a new user.
     *
     * The request body should contain the user's name, email, and password.
     *
     * Returns a new token if the user creation is successful.
     */
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    uploadSong: builder.mutation<void, FormData>({
/**
 * Constructs a POST request configuration for uploading a song.
 *
 * @param formData - The FormData object containing the file and any additional data needed for upload.
 * @returns An object with the URL endpoint, HTTP method, and request body for the song upload.
 */

      query: (formData) => ({
        url: '/songs/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    fetchSongs: builder.query<any[], void>({
      query: () => '/songs',
    }),
    fetchSongsInAlbum: builder.query<any[], string>({
      query: (albumId) => `/songs/album/${albumId}`,
    }),
    deleteSong: builder.mutation<void, string>({
      /**
       * Makes a DELETE request to `/songs/:songId` to delete a song.
       *
       * @param songId - The ID of the song to delete.
       * @returns An object with the URL endpoint and HTTP method for the song deletion.
       */
      query: (songId) => ({
        url: `/songs/${songId}`,
        method: 'DELETE',
      }),
    }),
    likeSong: builder.mutation<void, string>({
      /**
       * Makes a POST request to `/songs/:songId/like` to like a song.
       *
       * @param songId - The ID of the song to like.
       * @returns An object with the URL endpoint and HTTP method for the like request.
       */
      query: (songId) => ({
        url: `/songs/${songId}/like`,
        method: 'POST',
      }),
    }),
    dislikeSong: builder.mutation<void, string>({
      /**
       * Makes a POST request to `/songs/:songId/dislike` to dislike a song.
       *
       * @param songId - The ID of the song to dislike.
       * @returns An object with the URL endpoint and HTTP method for the dislike request.
       */
      query: (songId) => ({
        url: `/songs/${songId}/dislike`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useSignupMutation,
  useUploadSongMutation,
  useFetchSongsQuery,
  useFetchSongsInAlbumQuery,
  useDeleteSongMutation,
  useLikeSongMutation,
  useDislikeSongMutation,
} = apiSlice;
