import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Auth from '.'

describe('<Auth />', () => {
  it('should render logos, title, children', () => {
    renderWithTheme(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    )

    expect(screen.getAllByLabelText(/Won Games/i)).toHaveLength(2)

    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place/i
      })
    )

    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform/i
      })
    )

    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform/i
      })
    )

    expect(
      screen.getByRole('heading', {
        name: /Auth Title/i
      })
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
