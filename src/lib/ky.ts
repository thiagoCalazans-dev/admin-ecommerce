import ky from "ky";

// On https://my-site.com

export const api = ky.create({ prefixUrl: "https://localhost:3000/api/" });
