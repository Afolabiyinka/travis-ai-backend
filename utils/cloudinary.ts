import { v2 as cloudinary } from "cloudinary";

const api_key = process.env.API_KEY!;
const api_secret = process.env.API_SECRET!;
const cloud_name = process.env.CLOUD_NAME!;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure_distribution: "mydomain.com",
  upload_prefix: "https://api-eu.cloudinary.com",
});

export default cloudinary;
