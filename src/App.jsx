import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import './ReactToastify.css';

function App() {
	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={1500}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<Router>
				<Routes>
					<Route path='/' element={<DefaultLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
