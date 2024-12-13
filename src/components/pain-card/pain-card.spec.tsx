import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { expect, test, vi } from 'vitest'
import { PainCard } from './pain-card.component'

test('renders pain card data', async () => {
  const pain = { id: '1', notes: 'test', rating: 5, time: dayjs().toString() }
  const handleDelete = vi.fn()

  render(<PainCard handleDelete={handleDelete} pain={pain} />)

  // Click the button
  await userEvent.click(screen.getByTestId('remove-button'))
  expect(handleDelete).toHaveBeenCalledWith(pain)
})
