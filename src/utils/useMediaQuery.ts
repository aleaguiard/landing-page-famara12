import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches;
		}
		return false;
	};

	const [matches, setMatches] = useState<boolean>(getMatches(query));

	useEffect(() => {
		const matchMedia = window.matchMedia(query);

		const handleChange = () => {
			setMatches(getMatches(query));
		};

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Listen to matchMedia changes
		matchMedia.addEventListener('change', handleChange);

		return () => {
			matchMedia.removeEventListener('change', handleChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return matches;
}

export default useMediaQuery;
