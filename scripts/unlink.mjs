import request from './request.mjs';

const token = process.env.BOT_TOKEN;

if (!token) throw new Error('BOT_TOKEN or HOST is unset');

const url = `https://api.telegram.org/bot${token}/deleteWebhook`;

request(url);
