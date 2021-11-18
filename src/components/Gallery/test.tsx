import 'match-media-mock'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Gallery from '.'

import mockItems from './mock'

describe('<Gallery />', () => {
  it('should render thumbnails as buttons', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)
    expect(
      screen.getByRole('button', {
        name: /thumb - Gallery Image 1/i
      })
    ).toHaveAttribute('src', mockItems[0].src)

    expect(
      screen.getByRole('button', {
        name: /thumb - Gallery Image 2/i
      })
    ).toHaveAttribute('src', mockItems[1].src)
  })

  it('should handle open modal', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // verificar se o modal tá escondido
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })

    // clicar na imagem de abrir o modal e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', {
        name: /thumb - Gallery Image 1/i
      })
    )
    expect(modal.getAttribute('aria-hidden')).toBe('false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should handle close  modal when overlay or button clicked', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // clicar na imagem de abrir o modal e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', {
        name: /thumb - Gallery Image 1/i
      })
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: /close modal/i
      })
    )
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should handle close modal when ESC is clicked', () => {
    const { container } = renderWithTheme(
      <Gallery items={mockItems.slice(0, 2)} />
    )

    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // clicar na imagem de abrir o modal e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', {
        name: /thumb - Gallery Image 1/i
      })
    )
    fireEvent.keyUp(container, { key: 'Escape' })
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })
})
