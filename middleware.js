import { NextResponse } from 'next/server';

export const config = {
	matcher: '/'
};

export const middleware = async request => {
	const response = NextResponse.next();
	response.cookies.set(
		'currentCoords',
		`${request.geo.latitude ?? "32.77807830133121"}, ${request.geo.longitude ?? "-79.92519141494746"}`
	);
	return response;
};
