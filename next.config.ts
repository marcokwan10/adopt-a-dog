import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "frontend-take-home.fetch.com",
			},
		],
	},
};

export default nextConfig;
