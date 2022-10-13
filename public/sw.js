let coords = null;
const channel = new BroadcastChannel('coords-channel');
channel.onmessage = event => {
	switch (event.data.type) {
		case "set-coords":
			coords = event.data.coords;
			console.log("Coords defined in service worker as", coords);
			break;
	}
};

self.addEventListener("install", event => {
	console.log("Service worker registered");
});

self.addEventListener('fetch', async event => {
	if (
		new URL(event.request.url).host.includes("algolia.net")
		&& event.request.method === "POST"
		&& !!coords
	) {
		console.log(`Injecting aroundLatLng into request`);
		/*
			this might seem a little confusing
			basically, we're creating a chain of promises,
				starting with retreiving the json of the original request,
				which means nothing happens before we call event.respondWith.
				everything happens in the promises we pass into it,
				so we avoid the "event handler is already finished" error
		*/
		return event.respondWith(
			event.request.json().then(json =>
				fetch(event.request.url, {
					method: event.request.method,
					headers: event.request.headers,
					body: JSON.stringify({
						...json,
						requests: json.requests.map(request => {
							const params = new URLSearchParams(request.params);
							params.append('aroundLatLng', coords);
							return {
								...request,
								params: params.toString()
							};
						})
					})
				})
			)
		);
	}
});
