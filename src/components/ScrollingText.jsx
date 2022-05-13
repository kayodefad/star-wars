const ScrollingText = ({ children }) => {
	return (
		<div className='h-10 w-full overflow-hidden relative whitespace-nowrap bg-yellow text-black border border-black'>
			<p className='absolute w-full h-full leading-10 text-center text-xs translate-x-[100%] animate-scrollText'>
				{children}
			</p>
		</div>
	);
};

export default ScrollingText;
