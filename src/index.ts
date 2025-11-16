export interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		// Serve static assets from the public folder
		try {
			const asset = await env.ASSETS.fetch(request);
			if (asset.status !== 404) {
				return asset;
			}
		} catch (error) {
			console.error('Error fetching asset:', error);
		}

		// Default 404 response
		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
