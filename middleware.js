import { MiddlewareRequest } from "@netlify/next";

export const config = {
	matcher: '/'
};

export const middleware = async (request) => {
	const middlewareRequest = new MiddlewareRequest(request);
	const response = await middlewareRequest.next();

	response.cookies.set(
		'currentCoords',
		`${request.geo.latitude ?? "32.77807830133121"}, ${request.geo.longitude ?? "-79.92519141494746"}`
	);
	return response;
};
