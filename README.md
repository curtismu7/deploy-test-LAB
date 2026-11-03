# Deploy Test LAB

Tier: Tool. A throwaway app whose only job is to exercise the demo shelf's one-click
Deploy (clone the repo, build the image, run the container). Serves one page and
`GET /api/health` returning `demo-health/1` on 127.0.0.1:5590.

Run: from the shelf press Deploy, or `docker compose up -d`. Not part of any demo story.
