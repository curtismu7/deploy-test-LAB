# deploy-test-LAB

A throwaway app whose only job is to exercise the demo shelf's one-click Deploy
(clone the repo, build the image, run the container). Serves one page and
`GET /api/health` returning `demo-health/1` on 127.0.0.1:5590.

Tier: Tool

Repo: https://github.com/curtismu7/deploy-test-LAB

## What it is

- No demo story, no simulation: a health endpoint and a page.
- Run from the shelf's Deploy button, or `docker compose up -d`.
- Not part of any demo narrative; safe to delete and re-clone at any time.

## Commands

```
docker compose up -d        # the shelf does this on Deploy
curl http://127.0.0.1:5590/api/health
docker compose down
```

`npm ci && npm start` also works on the host (binds 127.0.0.1).
