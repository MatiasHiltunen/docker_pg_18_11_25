import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import sql from "./db.js";
import todoRoute from './todos.js'

async function init() {
  await sql`
    create table if not exists todo_items (
      id bigint primary key generated always as identity,
      title text not null,
      description text,
      is_completed boolean not null default false,
      created_at timestamp with time zone not null default now(),
      updated_at timestamp with time zone not null default now()
    );
  `;
  await sql`create index if not exists idx_todo_items_created_at on todo_items (created_at desc);`;
}


await init();

const app = new Hono();

// Allow cross-origin requests if needed, in prod specify allowed hosts
app.use("*", cors());

app.get("/health", (c) => c.json({ status: "ok" }));

const routes = app.route("/todos", todoRoute)


serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof routes

