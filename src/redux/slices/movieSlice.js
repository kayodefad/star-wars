import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchMovies = createAsyncThunk(
	'movie/fetchMovies',
	async (fetch = true, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('https://swapi.dev/api/films/');
			const sortedMovies = data.results.sort((movie1, movie2) => {
				const date1 = new Date(movie1.release_date);
				const date2 = new Date(movie2.release_date);
				return date1 - date2;
			});
			return sortedMovies;
		} catch (error) {
			if (!error.response) {
				toast.error('Network Error');
				return rejectWithValue('Network Error');
			}
			toast.error('An error occurred while fetching movies');
			return rejectWithValue('An error occurred while fetching movies');
		}
	}
);

const fetchMovieCharacters = async (characters) => {
	const res = await Promise.all(
		characters.map(async (character) => {
			const { data } = await axios.get(character);
			return data;
		})
	);
	return res;
};

export const fetchSelectedMovie = createAsyncThunk(
	'movie/fetchSelectedMovie',
	async (url, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(url);
			const { characters: charactersUrls } = data;
			const characters = await fetchMovieCharacters(charactersUrls);
			return { movie: data, characters };
		} catch (error) {
			if (!error.response) {
				return rejectWithValue('Network Error');
			}
			return rejectWithValue('An error occurred while fetching movie');
		}
	}
);

const initialState = {
	movies: [],
	selectedMovie: null,
	loading: false,
	error: '',
};

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.movies = action.payload;
				state.loading = false;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(fetchSelectedMovie.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSelectedMovie.fulfilled, (state, action) => {
				state.selectedMovie = action.payload;
				state.loading = false;
			})
			.addCase(fetchSelectedMovie.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

const { reducer } = movieSlice;

export default reducer;
