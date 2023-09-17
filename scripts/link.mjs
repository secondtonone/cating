import request from './request.mjs';

const token = process.env.BOT_TOKEN;
const host = process.env.HOST

if (!token || !host) throw new Error('BOT_TOKEN or HOST is unset');


const url = `https://api.telegram.org/bot${token}/setWebhook?url=${host}`;

request(url);
