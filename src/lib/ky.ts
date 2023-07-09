import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

export const prefixUrl = "http://localhost:3000/api/";

export const api: KyInstance = ky.create({
  prefixUrl: prefixUrl,
});
