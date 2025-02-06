import { createServerFn } from "@tanstack/start";
import { todosTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/drizzleConnect";

export const getTodos = createServerFn({ method: "GET" }).handler(async () => {
  return db.select().from(todosTable);
});

export const createTodo = createServerFn({ method: "POST" })
  .validator(z.object({ title: z.string().min(1) }))
  .handler(async ({ data }) => {
    const [inserted] = await db
      .insert(todosTable)
      .values({ title: data.title })
      .returning();
    return inserted;
  });

export const getTodoById = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const [todo] = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, data.id));
    if (!todo) {
      throw new Error(`Todo not found: id=${data.id}`);
    }
    return todo;
  });

export const updateTodo = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      completed: z.boolean().optional(),
    })
  )
  .handler(async ({ data }) => {
    const [updated] = await db
      .update(todosTable)
      .set({
        title: data.title,
        completed: data.completed,
      })
      .where(eq(todosTable.id, data.id))
      .returning();
    if (!updated) {
      throw new Error(`Todo not found: id=${data.id}`);
    }
    return updated;
  });

export const deleteTodo = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const [deleted] = await db
      .delete(todosTable)
      .where(eq(todosTable.id, data.id))
      .returning();
    if (!deleted) {
      throw new Error(`Todo not found: id=${data.id}`);
    }
    return { success: true };
  });
