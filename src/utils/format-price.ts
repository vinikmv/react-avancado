export default function formatPrice(price: number | bigint): string {
  const newPrice = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  if (newPrice === '$0.00') return 'FREE'
  return newPrice
}
