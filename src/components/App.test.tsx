import { render, screen } from '@testing-library/react'

import App from 'components/App'

test('app is running', () => {
  render(<App />)
  const linkElement = screen.getByText('round')
  expect(linkElement).toBeInTheDocument()
})
