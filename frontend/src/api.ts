import type { Todo } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? `${window.location.protocol}//${window.location.hostname}:3000`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getTodos() {
  return request<Todo[]>('/todos');
}

export function createTodo(input: { title: string }) {
  return request<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateTodo(id: string, input: Partial<Pick<Todo, 'title' | 'completed'>>) {
  return request<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
}
