# Cating

Install dependencies:
```bash
npm install
```
Creat `.env` file with: 
|Configuration Key|Description|
|-|-|
|`BOT_TOKEN`|Required: The authentication token obtained from [@BotFather](https://t.me/BotFather).|
|`NODE_ENV`|Required: `production` or `development`.|
|`HOST`|Url for linking with bot.|
|`WEB_APP`|Url for Telegram Web App. Forwarding by [ngrok](https://ngrok.com/)|

## Bot
Navigate to `api` folder:
```bash
cd api
```
Run bot:
```bash
pnpm build:watch
pnpm server:watch
```
or 

```bash
pnpm dev
```

For linking bot with Telegram:

```bash
pnpm run link
```
Respectively for unlinking:

```bash
pnpm run unlink
```


## Web App

Run front app in the development mode:

```bash
pnpm dev
```

For preview in Telegram:
 - go to [ngrok](https://ngrok.com/) 
 - after registration, get `authtoken`
 - in `app` folder, create `ngrok.yml` file with `authtoken`

```bash
pnpm expose
```
