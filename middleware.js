import { MiddlewareRequest } from "@netlify/next";

export const config = {
	matcher: '/'
};

export const middleware = async (request) => {
	const middlewareRequest = new MiddlewareRequest(request);

	const response = await middlewareRequest.next();

	console.log(request.geo); // prints { country: "US", region: "SC", city: "Summerville" }
	console.log(middlewareRequest.geo); // prints { country: "US", region: "SC", city: "Summerville" }

	response.cookies.set(
		'currentCoords',
		`${request.geo.latitude}, ${request.geo.longitude}`
	);
	return response;
};
