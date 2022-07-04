import { GameCardProps } from 'components/GameCard'
import { createContext, useContext } from 'react'

export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}

export const wishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
}

export const WishlistContext = createContext<WishlistContextData>(
  wishlistContextDefaultValues
)

export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishListProvider = ({ children }: WishlistProviderProps) => {
  const isInWishlist = (id: string) => false
  const addToWishlist = (id: string) => {}
  const removeFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{
        isInWishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishListProvider, useWishlist }
