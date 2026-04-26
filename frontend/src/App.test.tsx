import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

vi.mock('./api', () => ({
  getTodos: () => Promise.resolve([]),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

describe('App', () => {
  it('renders the todo workspace', async () => {
    render(<App />);

    expect(screen.getByText('My tasks')).toBeInTheDocument();
    expect(await screen.findByText('ยังไม่มีงาน')).toBeInTheDocument();
  });
});
