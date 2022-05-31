import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import CartList from '.'
import mockItems from './mock'

describe('<CartList />', () => {
  it('should render the cart list', () => {
    const { container } = renderWithTheme(
      <CartList items={mockItems} total="R$ 330" />
    )

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 330')).toHaveStyle({ color: '#F231A5' })
    expect(screen.getByText('R$ 330')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
