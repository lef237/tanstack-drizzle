import { createFileRoute } from "@tanstack/react-router";
import { getTodos, createTodo } from "~/functions/todoServer";

import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/")({
  loader: async () => {
    const todos = await getTodos();
    return { todos };
  },

  component: TodosIndex,
});

function TodosIndex() {
  const { todos } = Route.useLoaderData();
  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    if (!title) return;

    try {
      await createTodo({
        data: { title: String(title) },
      });
      form.reset();
      router.invalidate();
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Todo List</h1>

      <form onSubmit={handleCreate}>
        <input type="text" name="title" placeholder="New Todo" />
        <button type="submit">Create</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>
              {todo.completed ? <s>{todo.title}</s> : todo.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
