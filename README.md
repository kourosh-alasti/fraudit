# Fraudit: A Next.JS Reddit Clone

Fraudit is a web application built with Next.js, a popular React framework, designed to server as a Reddit-like platform for discussing and reviewing all forms of activities across various industries. The application aims to provide a user-friendly interface for users to create and participate in discussions, and access various topics.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open your browser and navigate to http://localhost:3000 to see the Fraudit Application in action.

### Project Structure

The project structure is organized as follows:

- `public`: contains static assets like images and icons.
- `src`: contains the main source code directory, contains the following sub-directories:

  - `components`: contains resusable UI components
  - `db`: contains database-related files and schemas
  - `lib`: contains utility functions
  - `app`: contains the pages for the frontend
  - `actions`: contains the Next.js server actions
  - `store`: contains the state management hooks

### Code Snippets

Here's an example of how you can use the `logDir` variable from the provided code snippet:

File: `/src/components/changelog.tsx`

Code:

```typescript
import path from "path";

const logDir = path.join(process.cwd(), "changelogs");

export const Changelog = () => {
  // redacted
};
```

In this example, the logDir variable is used to define the path to the directory containing the changelog files. You can modify this variable to suit you specific project requirements.

### Technologies Used

Fraudit is built using the following technologies:

- Next.js: A React framework for building server-rendered or statis applications
- Clerk: A universal identity and access management platform for web applications
- React: A Javascript library for building User Interfaces
- Drizzle-ORM: A Typescript ORM for PostgreSQL
- TailwindCSS: A utility-first CSS framework for rapid and modern website design
- Typescript: A typed superset of Javascript that compiles to vanilla JS

### Package Managers

The project uses the following package managers:

- npm: A package manager for Javascript and Node.js
- yarn: A package manager for Javascript and Node.js, similar to npm but with improved performance and features
- pnpm: A fast, disk-space-efficient package manager for Javascript and Node.js
- bun: A fast, all-in-one Javascript runtime for Node.js

### Scripts

The project includes the following scripts:

- `dev`: Starts the Next.js development server
- `build`: Builds the Next.js application for production
- `start`: Starts the Next.js production server
- `lint`: Lints the codebase using ESLint following config from `.eslintrc.json`
- `ngrok`: Sets up an ngrok tunnel to expose the local development server to the internet
- `db:studio`: Starts the drizzle-kit studio for managing and visualizing database schema
- `db:push`: Pushes Schema changes to hosted database

### Changelog

The project maintains a detailed changelog in the `changelogs` directory, which contains a series of changelog files. Each file represents a specific version of the application and includes a list of changes, bug fixes, and new features introduced in respective version.

### License

Fraudit is licensed under the MIT License. You can find the full license text in the `LICENSE` file in the root directoy of the project.
