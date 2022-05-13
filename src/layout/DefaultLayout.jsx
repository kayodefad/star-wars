import { Outlet } from 'react-router-dom';
import Hero from '../components/Hero';

const DefaultLayout = () => {
	return (
		<div className='bg-black min-h-screen'>
			<Hero />
			<Outlet />
		</div>
	);
};

export default DefaultLayout;
