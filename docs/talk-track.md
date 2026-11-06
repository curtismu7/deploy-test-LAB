# Talk track: Deploy Test LAB

Each `##` heading is one presenter step. This is a throwaway Tool-tier app with no demo story: it exists to exercise the demo shelf's one-click Deploy. A talk track here is mostly "how to demo the shelf, using this app as the payload".

## Why this app exists

Be upfront: there is nothing to see here. One page and `GET /api/health`. Its only job is to be the thing the shelf clones, builds and runs, so the shelf's Deploy path gets exercised end to end. It is safe to delete and re-clone at any time.

## Press Deploy on the shelf

Open the demo shelf, find this card, and press Deploy. Narrate what the shelf does: clones the repo from GitHub, builds the image, runs the container. No commands typed by hand.

## Watch it come up

The card flips to Running when the health probe answers. Behind the scenes the shelf polls `GET /api/health`, which returns the `demo-health/1` contract, on 127.0.0.1:5590 (loopback only).

## Open the page

Click through to the app. One page — that is the whole UI. Say it: the point was the deploy, not the app.

## Prove the health contract

In a terminal: `curl http://127.0.0.1:5590/api/health`. The `demo-health/1` field in the response is what the shelf's status light is built on; this app is the minimal example of that contract.

## The Docker form without the shelf

The same thing by hand: `docker compose up -d`, then the health curl, then `docker compose down`. Or on the host: `npm ci && npm start` (binds 127.0.0.1). Both forms do the identical thing.

## Reset

`docker compose down` — and that is the entire reset. Nothing is stored, no state is kept, and re-deploying from the shelf rebuilds it from the repo. The takeaway: the shelf's one-click Deploy is a full clone-build-run cycle with nothing manual in the middle.
