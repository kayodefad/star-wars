import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, fetchSelectedMovie } from '../redux/slices/movieSlice';
import Loader from './Loader';

const MovieSelect = () => {
	const [value, setValue] = useState('dafault');
	const dispatch = useDispatch();
	const { loading, movies } = useSelector(({ movie }) => movie);
	const [disableDefault, setDisableDefault] = useState(false);

	useEffect(() => {
		dispatch(fetchMovies());
	}, []);

	const handleChange = (e) => {
		setDisableDefault(true);
		const { value } = e.target;
		setValue(value);
		if (value === 'default') return;
		dispatch(fetchSelectedMovie(value));
	};

	return (
		<>
			{loading && <Loader />}
			<label>
				<select
					className='bg-yellow focus:ring-0 focus:border-none text-sm rounded'
					value={value}
					onChange={handleChange}
				>
					<option value='default' disabled={disableDefault}>
						Choose a star wars movie
					</option>
					{movies.length &&
						movies.map((movie) => {
							return (
								<option key={movie.created} value={movie.url}>
									{movie.title}
								</option>
							);
						})}
				</select>
			</label>
		</>
	);
};

export default MovieSelect;
