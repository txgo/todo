# Minimalist Todo App

A simple, efficient way to manage your tasks using Vue.js and Supabase.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Clean and intuitive user interface
- Serverless architecture

## Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **UI Components**: Element Plus
- **Backend**: Supabase (Authentication, Database, API)
- **Routing**: Vue Router

## Project Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/minimalist-todo-app.git
   cd minimalist-todo-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Supabase Setup

1. Create a new project in Supabase
2. Set up a `todos` table with the following schema:
   - `id` (type: uuid, default: `uuid_generate_v4()`, primary key)
   - `user_id` (type: uuid, foreign key to auth.users)
   - `title` (type: text, not null)
   - `description` (type: text)
   - `is_complete` (type: boolean, default: false)
   - `created_at` (type: timestamp with time zone, default: `now()`)
   - `updated_at` (type: timestamp with time zone)

3. Set up Row-Level Security (RLS) policies:
   - Enable RLS on the "todos" table
   - Add policies for read, insert, update, and delete operations that check `auth.uid() = user_id`

## Building for Production

```
npm run build
```

This will generate a `dist` folder with optimized assets that can be deployed to any static hosting service.

## Deployment

The application can be deployed to services like Netlify, Vercel, or GitHub Pages. Make sure to set up the environment variables for your Supabase credentials in your deployment platform.

## License

MIT
