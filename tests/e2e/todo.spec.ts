import { expect, test } from '@playwright/test';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3000';

test.beforeEach(async ({ request }) => {
  const todos = await request.get(`${apiUrl}/todos`);
  expect(todos.ok()).toBe(true);

  for (const todo of await todos.json()) {
    const response = await request.delete(`${apiUrl}/todos/${todo.id}`);
    expect(response.ok()).toBe(true);
  }
});

test('creates, completes, filters, and deletes a todo', async ({ page }) => {
  const title = `Buy milk ${Date.now()}`;

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'My tasks' })).toBeVisible();
  await expect(page.getByText('ยังไม่มีงาน')).toBeVisible();

  await page.getByPlaceholder('เพิ่มงาน เช่น ซื้อของ หรือ โทรหาลูกค้า').fill(title);
  await page.getByRole('button', { name: 'Add todo' }).click();

  const todo = page.getByTestId('todo-item').filter({ hasText: title });
  await expect(todo).toBeVisible();
  await expect(page.getByText('Tasks').locator('..').getByText('1')).toBeVisible();
  await expect(page.getByText('Active').locator('..').getByText('1')).toBeVisible();

  await todo.getByRole('button', { name: 'Mark complete' }).click();
  await expect(todo.getByRole('heading', { name: title })).toHaveClass(/line-through/);

  await page.getByRole('button', { name: 'Done' }).click();
  await expect(todo).toBeVisible();

  await page.getByRole('button', { name: 'Active' }).click();
  await expect(todo).toBeHidden();
  await expect(page.getByText('ยังไม่มีงาน')).toBeVisible();

  await page.getByRole('button', { name: 'All' }).click();
  await todo.getByRole('button', { name: 'Delete todo' }).click();
  await expect(page.getByText(title)).toBeHidden();
  await expect(page.getByText('ยังไม่มีงาน')).toBeVisible();
});
