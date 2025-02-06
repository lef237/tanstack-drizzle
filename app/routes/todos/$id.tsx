import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import {
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../../functions/todoServer";

export const Route = createFileRoute("/todos/$id")({
  loader: async ({ params: { id } }) => {
    const todoId = Number(id);
    const todo = await getTodoById({ data: { id: todoId } }).catch(() => null);
    if (!todo) {
      // notFound() を投げると notFoundComponent が表示される
      throw notFound();
    }
    return { todo };
  },

  errorComponent: TodoError,
  notFoundComponent: () => (
    <div style={{ padding: "1rem", color: "red" }}>Todo Not Found</div>
  ),
  component: TodoDetail,
});

function TodoDetail() {
  const { todo } = Route.useLoaderData();
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    // チェックボックスは "on" なら true と判定
    const completed = formData.get("completed") === "on";

    try {
      await updateTodo({
        data: { id: todo.id, title: String(title), completed },
      });
      alert("Updated!");
      router.invalidate();
    } catch (err) {
      alert(String(err));
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this todo?")) return;
    try {
      await deleteTodo({ data: { id: todo.id } });
      router.navigate({ to: "/todos" });
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Todo Detail (ID: {todo.id})</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>
            Title: <input name="title" defaultValue={todo.title} />
          </label>
        </div>
        <div>
          <label>
            Completed:{" "}
            <input
              type="checkbox"
              name="completed"
              defaultChecked={todo.completed}
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: "1rem" }}>
        Delete
      </button>

      <p style={{ marginTop: "1rem" }}>
        <a href="/todos">Back to List</a>
      </p>
    </div>
  );
}

function TodoError({ error }: { error: unknown }) {
  return (
    <div style={{ padding: "1rem", color: "red" }}>
      <h3>Error Loading Todo</h3>
      <p>{String(error)}</p>
    </div>
  );
}
