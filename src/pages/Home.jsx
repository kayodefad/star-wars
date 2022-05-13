import { useSelector } from 'react-redux';
import CharactersTable from '../components/CharactersTable';
import Loader from '../components/Loader';

const Home = () => {
	const { loading } = useSelector(({ movie }) => movie);

	return (
		<div>
			{loading && <Loader />}
			<CharactersTable />
		</div>
	);
};

export default Home;
