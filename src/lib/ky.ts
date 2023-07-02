import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

// On https://my-site.com

export const api: KyInstance = ky.create({
  prefixUrl: "http://localhost:3000/api/",
  headers: {
    "content-type": "application/json",
  },
});
