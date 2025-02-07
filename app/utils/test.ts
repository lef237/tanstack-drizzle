import "dotenv/config";
import { eq } from "drizzle-orm";
import { todosTable } from "~/db/schema";
import { db } from "~/db/drizzleConnect";

async function main() {
  // INSERT
  const inserted = await db
    .insert(todosTable)
    .values({ title: "First Todo" })
    .returning();
  console.log("inserted", inserted);

  // SELECT
  const results = await db.select().from(todosTable);
  console.log("results", results);

  // UPDATE
  const updated = await db
    .update(todosTable)
    .set({ completed: true })
    .where(eq(todosTable.id, inserted[0].id))
    .returning();
  console.log("updated", updated);

  // DELETE
  const deleted = await db
    .delete(todosTable)
    .where(eq(todosTable.id, inserted[0].id))
    .returning();
  console.log("deleted", deleted);
}

main();
