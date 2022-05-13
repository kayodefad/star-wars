import loadingSpinner from '../assets/images/loading_spinner.gif';

const Loader = () => {
	return (
		<div className='fixed top-0 left-0 z-10 h-screen w-screen flex items-center justify-center'>
			<img src={loadingSpinner} alt='loading spinner' />
		</div>
	);
};

export default Loader;
