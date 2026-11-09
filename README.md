# Deploy Test LAB

Repo: https://github.com/curtismu7/deploy-test-LAB

Tier: Tool. A throwaway app whose only job is to exercise the demo shelf's one-click
Deploy (clone the repo, build the image, run the container). Serves one page and
`GET /api/health` returning `demo-health/1` on 127.0.0.1:5590.

Run: from the shelf press Deploy, or `docker compose up -d`. Not part of any demo story.

## Run from a clone

Prerequisites: Node 26. Docker (OrbStack) only for the Docker form.

```
git clone https://github.com/curtismu7/deploy-test-LAB.git
cd deploy-test-LAB
npm ci
npm run build
npm run doctor
npm start
```

## Ports, and what to do if the port is taken

```
Ports: deploy-test-LAB listens on 5590 (set with PORT, default 5590).
Port range for this app: 5590.

If the port is taken:
1. Find what is using it:
   lsof -iTCP:5590 -sTCP:LISTEN -n -P
2. If it is an old copy of this app, stop that process: kill <PID>.
3. If it is something else, stop it, or start this app on another port:
   PORT=<other port> npm start
```

Other variable: `HOST_PORT=5590` (Docker host port). Keep both inside 5590.

