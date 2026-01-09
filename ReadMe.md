# 🧠 AiThink | An Idea Aggregator

A sleek, full-stack web app that brings together top tech ideas from GitHub, X (formerly Twitter), Reddit, and more—making it easier for developers and enthusiasts to stay inspired and discover what's trending in the world of tech and AI.

![Screenshot](./client/public/Wallpaper.png)

##  Features

-  **Unified Search** – Enter a keyword and get curated results from:
  - GitHub Repositories
  - Reddit Posts
  - X Posts
  - Unique Idea Suggestions
- **Idea-First View** – Clean display of the most relevant *idea* for your query
- **Authentication** – Login to access full features
- **Dark Mode** – Comfortable browsing experience
- **Fast and responsive UI**
- **Scalable backend Architecture**

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js, Express
- **Web Scraping/API**: SerpAPI, GitHub API, Reddit API, X (Twitter) Web Scraping
- **Authentication**: bcrypt + JWT-based 
- **Deployment**: [Render](https://render.com) 


## ✨ Getting Started
```
### 1. Clone the repo
- git clone https://github.com/vivek-patel-here/AiThink-idea-aggregator
- cd AiThink-idea-aggregator

## **Backend setup**
- cd backend
- npm install
- Add your .env file with API keys and config
- node app.js ( you can use nodemon for development purpose)

## **Environment variable setup**
.ENV File Format (Environment Variables)
- DB_URL="..." (MongoDb URI)
- JWT_SECRET="..."
- COOKIE_SECRET="..."
- GITHUB_TOKEN="... Github access token ..."
- SERP_API_KEY="... Serp_api key ..."
- NODE_ENV=production
- SERP_API_KEY="google serp api"
- LLMKey1="grok api key1"
- LLMKey2="grok api key2"
- LLMKey3="grok api key3"


**FrontEnd setup**
- cd client
- npm install 
- npm run dev

**Configure CORS Setting**
- /client/src/globalContext.jsx : Change url to your backend URL
- /backend/app.js : Change CORS origin to your fronend URL
- /backend/Socket.Controller.js : Change CORS to your fronend URL

```

## Essential setting to bypass browser restriction 
(In case it doesnot work then , open the Developer Console → Network tab and check whether the request is being sent. Look for any requests marked with an exclamation icon.)
### For Google Chrome
- go to `chrome://settings/cookies` or `Settings > Privacy and security > Third-party cookies`.
- Ensure that `"Block third-party cookies"` or `"Block all cookies"` is NOT selected.
- You might need to select `"Allow third-party cookies"` or, for more fine-grained control, `"Block third-party cookies in Incognito"`.
- Then add `'[*.]onrender.com'` as an allowed site under "Sites that can always use cookies."

