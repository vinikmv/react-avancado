import { renderHook } from '@testing-library/react-hooks'
import { CartProvider, useCart, CartProviderProps } from 'hooks/use-cart'
import { setStorageItem } from 'utils/localStorage'

describe('useCart', () => {
  it('should return items and its info if there are any items in the cart', () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <CartProvider>{children}</CartProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toStrictEqual(['1', '2'])
  })
})
