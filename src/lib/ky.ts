import ky from "ky";

// On https://my-site.com

export const api = ky.create({
  prefixUrl: "http://localhost:3000/api/",
  headers: {
    "content-type": "application/json",
  },
});
