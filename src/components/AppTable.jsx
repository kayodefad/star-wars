import React from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	usePagination,
} from 'react-table';
import {
	ChevronDoubleLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import { Button, PageButton } from '../shared/button';
import { classNames, heightConverter } from '../shared/utils';
import { SortIcon, SortUpIcon, SortDownIcon } from '../shared/icons';

export function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<label className='flex gap-x-2 items-baseline'>
			<span className='text-[#878787] text-sm'>{render('Header')}: </span>
			<select
				className='rounded-md shadow-sm focus:border-none focus:ring-0 text-sm'
				name={id}
				id={id}
				value={filterValue}
				onChange={(e) => {
					setFilter(e.target.value || undefined);
				}}
			>
				<option value=''>All</option>
				{options.map((option, i) => (
					<option key={i} value={option}>
						{option[0].toUpperCase() + option.slice(1)}
					</option>
				))}
			</select>
		</label>
	);
}

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,

		state,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 5 },
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	// Calculate the sum of heights
	const sumOfHeights = page
		.map(({ values }) => +values.height)
		.reduce((row1, row2) => row1 + row2, 0);

	const heightInFeetAndInches = heightConverter(sumOfHeights);

	// Render the UI for your table
	return (
		<>
			<div className='sm:flex sm:gap-x-2'>
				{headerGroups.map((headerGroup) =>
					headerGroup.headers.map((column) =>
						column.Filter ? (
							<div className='mt-2 sm:mt-0' key={column.id}>
								{column.render('Filter')}
							</div>
						) : null
					)
				)}
			</div>
			<div className='flex flex-col overflow-auto'>
				<div className='my-2'>
					<div className='py-2 align-middle inline-block min-w-full'>
						<div className='sm:rounded-lg'>
							<table {...getTableProps()} className='min-w-full'>
								<thead className=''>
									{headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column) => (
												<th
													scope='col'
													className='group px-6 py-3 text-left text-xs font-medium text-[#878787] tracking-wider'
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
												>
													<div className='flex items-center justify-between'>
														{column.render('Header')}
														<span>
															{column.isSorted ? (
																column.isSortedDesc ? (
																	<SortDownIcon className='w-4 h-4 text-gray-400' />
																) : (
																	<SortUpIcon className='w-4 h-4 text-gray-400' />
																)
															) : (
																<SortIcon className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100' />
															)}
														</span>
													</div>
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody {...getTableBodyProps()} className='bg-black'>
									{page.map((row, i) => {
										prepareRow(row);
										return (
											<tr className='odd:bg-[#272b30]' {...row.getRowProps()}>
												{row.cells.map((cell) => {
													return (
														<td
															{...cell.getCellProps()}
															className='px-6 py-4 whitespace-nowrap text-xs text-yellow'
															role='cell'
														>
															{cell.column.Cell.name === 'defaultRenderer' ? (
																<div>
																	{cell.render('Cell')}
																</div>
															) : (
																cell.render('Cell')
															)}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* Display Sum of Heights */}
			<div className='text-[#878787] text-sm'>
				Sum of Heights: {sumOfHeights + ' cm'}
				{`(${heightInFeetAndInches})`}
			</div>
			{/* Pagination */}
			<div className='py-3 flex items-center justify-between'>
				<div className='flex-1 flex justify-between sm:hidden'>
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</Button>
				</div>
				<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
					<div className='flex gap-x-2 items-baseline'>
						<span className='text-xs text-gray-700'>
							Page <span className='font-medium'>{state.pageIndex + 1}</span> of{' '}
							<span className='font-medium'>{pageOptions.length}</span>
						</span>
						<span>
							<span className='text-gray-700'>| </span>{' '}
							<span className='text-xs text-gray-700'>Go to page:</span>{' '}
							<input
								type='number'
								defaultValue={state.pageIndex + 1}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								className='w-[100px] rounded-md border-gray-300 shadow-sm focus:border-green focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs'
							/>
						</span>{' '}
						<label>
							<span className='sr-only'>Items Per Page</span>
							<select
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs'
								value={state.pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[5, 10, 20].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</label>
					</div>
					<div>
						<nav
							className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
							aria-label='Pagination'
						>
							<PageButton
								className='rounded-l-md'
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
							>
								<span className='sr-only'>First</span>
								<ChevronDoubleLeftIcon
									className='h-3 w-3 text-gray-400'
									aria-hidden='true'
								/>
							</PageButton>
							<PageButton
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
								<span className='sr-only'>Previous</span>
								<ChevronLeftIcon
									className='h-3 w-3 text-gray-400'
									aria-hidden='true'
								/>
							</PageButton>
							<PageButton onClick={() => nextPage()} disabled={!canNextPage}>
								<span className='sr-only'>Next</span>
								<ChevronRightIcon
									className='h-3 w-3 text-gray-400'
									aria-hidden='true'
								/>
							</PageButton>
							<PageButton
								className='rounded-r-md'
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								<span className='sr-only'>Last</span>
								<ChevronDoubleRightIcon
									className='h-3 w-3 text-gray-400'
									aria-hidden='true'
								/>
							</PageButton>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}

export default Table;
