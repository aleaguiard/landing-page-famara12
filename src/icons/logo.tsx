const Logo = () => {
	return (
		<div className="flex gap-10">
			{' '}
			<a href="/properties">
				<img
					src="/logo.jpeg"
					alt="Famara House 12"
					style={{ width: '50px', height: '50px' }}
				/>
			</a>
			<a href="/properties">
				<img
					src="/logoFL.jpeg"
					alt="Famara Loft 12"
					style={{ width: '50px', height: '50px' }}
				/>
			</a>
		</div>
	);
};

export default Logo;
