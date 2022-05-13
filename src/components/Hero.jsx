import { useSelector } from 'react-redux';
import startWarsLogo from '../assets/images/star_wars_logo.png';
import MovieSelect from './MovieSelect';

const Hero = () => {
	const state = useSelector((state) => state.movie);

	const collapseLogo = state.selectedMovie;

	return (
		<div
			className={`${
				collapseLogo ? 'h-[40vh]' : 'h-screen'
			} bg-black w-screen transition-[height]`}
		>
			<div
				className={`${
					collapseLogo ? 'w-[80%] md:w-[40%]' : 'w-[80%]'
				} mx-auto h-[75%] flex items-center justify-center`}
			>
				<img
					src={startWarsLogo}
					alt='Star Wars Logo'
					className='w-full md:h-[80%]'
				/>
			</div>
			<div className='flex justify-center items-center h-[25%]'>
				<MovieSelect />
			</div>
		</div>
	);
};

export default Hero;
