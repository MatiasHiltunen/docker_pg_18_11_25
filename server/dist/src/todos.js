import { Hono } from "hono";
import sql from "./db.js";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
const todoRoute = new Hono()
    .get("/", async (c) => {
    const rows = await sql `
                select id, title, description, is_completed, created_at, updated_at
                from todo_items
                order by created_at desc
            `;
    return c.json(rows);
})
    .post("/", zValidator('json', z.object({
    title: z.string().min(2).max(200),
    description: z.string().nullable()
})), async (c) => {
    const { title, description } = c.req.valid('json');
    const inserted = await sql `
                insert into todo_items (title, description)
                values (${title}, ${description})
                returning id, title, description, is_completed, created_at, updated_at
            `;
    return c.json(inserted[0], 201);
})
    .get("/:id", zValidator('param', z.object({
    id: z.coerce.number()
})), async (c) => {
    const { id: idNum } = c.req.valid('param');
    const rows = await sql `
                select id, title, description, is_completed, created_at, updated_at
                from todo_items
                where id = ${idNum}
            `;
    if (rows.length === 0) {
        return c.json({ error: "not found" }, 404);
    }
    return c.json(rows[0]);
})
    .patch("/:id", zValidator('param', z.object({
    id: z.coerce.number()
})), zValidator('json', z.object({
    title: z.string().min(2).max(200),
    description: z.string().nullable(),
    is_completed: z.boolean()
})), async (c) => {
    const { id: idNum } = c.req.valid('param'); //c.req.param();
    const { title, description, is_completed } = c.req.valid('json');
    // Check: https://neon.com/postgresql/postgresql-tutorial/postgresql-coalesce
    const updated = await sql `
                update todo_items
                set
                    title = coalesce(${title}, title),
                    description = coalesce(${description}, description),
                    is_completed = coalesce(${is_completed}, is_completed),
                    updated_at = now()
                where id = ${idNum}
                returning id, title, description, is_completed, created_at, updated_at
            `;
    if (updated.length === 0) {
        return c.json({ error: "not found" }, 404);
    }
    return c.json(updated.at(0));
})
    .delete("/:id", zValidator('param', z.object({
    id: z.coerce.number()
})), async (c) => {
    const { id } = c.req.valid('param');
    const deleted = await sql `
                delete from todo_items
                where id = ${id}
                returning id
            `;
    if (deleted.length === 0) {
        return c.json({ error: "not found" }, 404);
    }
    return c.body(null, 204);
});
export default todoRoute;
