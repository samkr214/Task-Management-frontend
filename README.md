# TaskFlow — React Frontend for WA-2

Responsive React frontend for the Task Management REST API built in WA-2.

## Requirements covered

- React + Vite
- React Router with multiple pages
- Real API data from the WA-2 Node/Express API
- JWT authentication
- Protected task routes
- Loading spinner and visible error states
- Client-side form validation
- React Context + useState for state management
- Responsive mobile/desktop UI

## Pages / routes

- `/login` — login
- `/register` — register
- `/tasks` — task list
- `/tasks/:id` — task detail
- `/tasks/new` — create task
- `/tasks/:id/edit` — edit task

## Run

```bash
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Then:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## Backend

Start the WA-2 API first:

```bash
node server.js
```

The backend must be available at `http://localhost:3000`.

Because the React app and API use different ports, enable CORS in the WA-2 backend.

Install:

```bash
npm install cors
```

Then in `server.js`:

```js
const cors = require("cors");
```

and after creating the Express app:

```js
app.use(cors());
app.use(express.json());
```

## Test flow

1. Register a new user.
2. Login.
3. Create a task.
4. Confirm it appears in `/tasks`.
5. Open the task detail page.
6. Edit the title/status.
7. Delete the task.
8. Stop the backend and reload the task page to verify the visible API error state.
