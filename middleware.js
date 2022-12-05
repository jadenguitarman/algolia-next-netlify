import { MiddlewareRequest } from "@netlify/next";

export const config = {
	matcher: '/'
};

export const middleware = async (request) => {
	const middlewareRequest = new MiddlewareRequest(request);
	const response = await middlewareRequest.next();

	response.cookies.set(
		'currentCoords',
		`${request.geo.latitude}, ${request.geo.longitude}`
	);
	return response;
};
