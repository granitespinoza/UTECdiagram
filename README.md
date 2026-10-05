# UTEC Diagram

**Diagram-as-code frontend · Cloud Computing hackathon · React + TypeScript**

A web interface for writing diagram code, requesting an image from a backend and previewing the result. Developed in the context of a UTEC Cloud Computing hackathon.

## Explore the project

- Code editor and diagram-type selection.
- Registration and login flows connected to an HTTP API.
- Diagram generation with loading and error states.
- Preview and download controls for PNG, SVG and PDF.

The controls are implemented in this repository; rendering and file conversion depend on an external backend, whose source is not included here.

## Stack

React 18 · TypeScript · Vite · React Router · Tailwind CSS · shadcn/ui

## Run locally

```bash
git clone https://github.com/granitespinoza/UTECdiagram.git
cd UTECdiagram
npm ci
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run build
npm run lint
npm run preview
```

These commands are defined in package.json. Running the frontend alone does not provide a local backend.

## Repository map

| Path | Responsibility |
| --- | --- |
| src/pages/EditorPage.tsx | Editor, generation requests and download interaction |
| src/components/CodeEditor.tsx | Diagram code input |
| src/components/DiagramViewer.tsx | Preview, loading/error states and download menu |
| src/services/auth.ts | Registration, login and browser session storage |
| src/services/diagrams.ts | Generation and download HTTP requests |

## API integration

The two service files currently contain a fixed AWS API Gateway development URL. To connect another backend, update API_BASE consistently in both files.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | /auth/register | Register with email and password |
| POST | /auth/login | Obtain a token and user data |
| POST | /diagrams/generate | Send code and diagram type |
| POST | /diagrams/download | Request a file by diagram ID and format |

Diagram requests use a bearer token. Session data is stored in localStorage.

## Current scope and follow-up

This is an academic frontend, not a claim of a production service or a verified live demo. Backend availability and end-to-end conversion have not been checked in this documentation update.

Two integration details need attention before demonstrating the full flow:

- The editor presents anonymous-mode messaging, but the generation service requires authentication.
- The download handler passes imageUrl while the service expects diagramId; the generation response exposes an optional id that the editor does not retain.

Future work: reconcile those contracts, configure the API through environment variables and add reproducible screenshots once the full flow is validated.
