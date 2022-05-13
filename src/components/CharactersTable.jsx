import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Table, { SelectColumnFilter } from './AppTable';
import ScrollingText from './ScrollingText';

const CharactersTable = () => {
	const { selectedMovie } = useSelector((state) => state.movie);

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Gender',
				accessor: 'gender',
				Cell: ({ value }) => (
					<span className='text-xs text-yellow'>{value.toUpperCase()}</span>
				),
				Filter: SelectColumnFilter,
				filter: 'includes',
			},
			{
				Header: 'Height',
				accessor: 'height',
				Cell: ({ value }) => (
					<span className='text-xs text-yellow'>{value + ' cm'}</span>
				),
			},
		],
		[]
	);

	return (
		<div className='text-gray-900 overflow-hidden'>
			<main className='overflow-hidden'>
				<div className='mt-4 w-[95%] max-w-[600px] mx-auto'>
					{selectedMovie && (
						<div className='mb-5'>
							<ScrollingText>{selectedMovie.movie.opening_crawl}</ScrollingText>
						</div>
					)}
					{selectedMovie?.characters && (
						<Table columns={columns} data={selectedMovie.characters} />
					)}
				</div>
			</main>
		</div>
	);
};

export default CharactersTable;
