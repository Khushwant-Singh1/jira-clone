import { hc } from 'hono/client'
import { AppType } from "@/app/api/[[...route]]/route";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

console.log('API_URL:', API_URL); // Debug log

export const client = hc<AppType>(API_URL);