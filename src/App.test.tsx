import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import './test/setup'

describe('TideGlyph app', () => {
  it('renders the sample load and progressbar', () => { render(<App />); expect(screen.getByRole('heading', { name: 'Low Water Census' })).toBeInTheDocument(); expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40'); expect(screen.getByText('2 of 5 pieces logged')).toBeInTheDocument() })
  it('keeps selection when a status filter hides it', async () => { const user = userEvent.setup(); render(<App />); await user.click(screen.getByRole('checkbox', { name: 'Select Blue mussel colony' })); await user.click(screen.getByRole('radio', { name: 'Queued' })); expect(screen.getByText('1 selected (3 visible)')).toBeInTheDocument(); await user.click(screen.getByRole('radio', { name: 'All' })); expect(screen.getByRole('checkbox', { name: 'Select Blue mussel colony' })).toBeChecked() })
  it('marks selected observations logged', async () => { const user = userEvent.setup(); render(<App />); await user.click(screen.getByRole('checkbox', { name: 'Select Ribbon kelp' })); await user.click(screen.getByRole('button', { name: 'Mark logged' })); expect(screen.getByRole('checkbox', { name: 'Select Ribbon kelp' })).not.toBeChecked(); expect(screen.getByText('3 of 5 pieces logged')).toBeInTheDocument() })
  it('adds a new piece row', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText('Observation name'), 'Dawn cup'); await user.click(screen.getByRole('button', { name: /Add to load/ })); expect(screen.getByText('Dawn cup')).toBeInTheDocument() })
  it('hides non-priority rows with priority-only', async () => { const user = userEvent.setup(); render(<App />); const table = screen.getByRole('table'); expect(within(table).getByText('Ribbon kelp')).toBeInTheDocument(); await user.click(screen.getByRole('checkbox', { name: 'Priority only' })); expect(within(table).queryByText('Ribbon kelp')).not.toBeInTheDocument(); expect(within(table).getByText('Shore crab')).toBeInTheDocument() })
})
