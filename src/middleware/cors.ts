import { originsList } from "../main";

export const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "token",
    "Authorization",
  ],
  exposedHeaders: ["Content-Type"],
};
