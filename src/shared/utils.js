export function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function heightConverter(height) {
	const ft = Math.floor(height / 30.48);
	const remainder = height % 30.48;
	const inches = ((remainder / 30.48) * 12).toFixed(1);
	return remainder === 0 ? `${ft}ft` : `${ft}ft/${inches}in`;
}
