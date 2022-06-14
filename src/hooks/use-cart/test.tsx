import { MockedProvider } from '@apollo/client/testing'
import { renderHook } from '@testing-library/react-hooks'
import { CartProvider, useCart, CartProviderProps } from 'hooks/use-cart'
import { cartItems, gamesMock } from 'hooks/use-cart/mock'
import { setStorageItem } from 'utils/localStorage'

describe('useCart', () => {
  it('should return items and its info if there are any items in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper
    })

    await waitForNextUpdate()

    expect(result.current.items).toStrictEqual(cartItems)
  })
})
