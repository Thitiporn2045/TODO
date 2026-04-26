import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, Circle, ListTodo, Plus, Trash2, WifiOff } from 'lucide-react';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api';
import type { Todo, TodoFilter } from './types';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<TodoFilter>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('เชื่อมต่อ backend ไม่ได้ ตรวจว่า NestJS เปิดอยู่ที่ port 3000'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    if (filter === 'ACTIVE') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'COMPLETED') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [filter, todos]);

  const doneCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - doneCount;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    try {
      const created = await createTodo({ title: cleanTitle });
      setTodos((current) => [created, ...current]);
      setTitle('');
      setError(null);
    } catch {
      setError('เพิ่มงานไม่สำเร็จ ตรวจว่า backend และ database เปิดอยู่');
    }
  }

  async function toggleTodo(todo: Todo) {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      setError(null);
    } catch {
      setError('อัปเดตงานไม่สำเร็จ');
    }
  }

  async function removeTodo(id: string) {
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo.id !== id));
      setError(null);
    } catch {
      setError('ลบงานไม่สำเร็จ');
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-moss">Local Todo</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">My tasks</h1>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:w-80">
            <Metric label="Tasks" value={todos.length} />
            <Metric label="Active" value={activeCount} />
            <Metric label="Done" value={doneCount} />
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 rounded-lg border border-ink/10 bg-white p-3 shadow-sm sm:grid-cols-[1fr_48px]">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="เพิ่มงาน เช่น ซื้อของ หรือ โทรหาลูกค้า"
            className="min-h-12 rounded-md border border-ink/15 px-3 text-base outline-none focus:border-moss focus:ring-2 focus:ring-mint"
          />
          <button
            aria-label="Add todo"
            className="flex min-h-12 items-center justify-center rounded-md bg-moss text-white transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-coral"
          >
            <Plus size={22} />
          </button>
        </form>

        {error ? (
          <div className="mt-4 flex items-center gap-2 rounded-md border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-ink">
            <WifiOff size={18} />
            <span>{error}</span>
          </div>
        ) : null}

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <FilterButton active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="All" />
          <FilterButton active={filter === 'ACTIVE'} onClick={() => setFilter('ACTIVE')} label="Active" />
          <FilterButton active={filter === 'COMPLETED'} onClick={() => setFilter('COMPLETED')} label="Done" />
        </nav>

        <section className="mt-5 flex-1 space-y-3">
          {isLoading ? <EmptyState title="Loading tasks..." /> : null}
          {!isLoading && visibleTodos.length === 0 ? <EmptyState title="ยังไม่มีงาน" /> : null}
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onRemove={removeTodo} />
          ))}
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-ink/50">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`h-10 shrink-0 rounded-md border px-3 text-sm font-medium transition ${
        active ? 'border-moss bg-moss text-white' : 'border-ink/10 bg-white text-ink hover:border-moss'
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-ink/20 bg-white px-4 py-10 text-center text-ink/60">
      <ListTodo className="mx-auto mb-3 text-moss" size={28} />
      {title}
    </div>
  );
}

function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  return (
    <article data-testid="todo-item" className="rounded-lg border border-ink/10 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <button
          aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
          onClick={() => void onToggle(todo)}
          className="mt-1 rounded-full text-moss transition hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral"
        >
          {todo.completed ? <Check size={24} /> : <Circle size={24} />}
        </button>
        <div className="min-w-0 flex-1">
          <h2 className={`break-words text-base font-semibold ${todo.completed ? 'text-ink/45 line-through' : ''}`}>{todo.title}</h2>
          <p className="mt-1 text-sm text-ink/50">{new Date(todo.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          aria-label="Delete todo"
          onClick={() => void onRemove(todo.id)}
          className="rounded-md p-2 text-ink/50 transition hover:bg-coral/10 hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
