import {Hono} from 'hono';  
import { handle } from 'hono/vercel';


const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
    return c.text('Hello Hono!')
});

export const GET = handle(app)