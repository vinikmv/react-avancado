import OrdersList, { OrdersListProps } from 'components/OrdersList'
import ordersMock from 'components/OrdersList/mock'
import { GetServerSidePropsContext } from 'next'
import Profile from 'templates/Profile'
import protectedRoutes from 'utils/protected-routes'

export default function ProfileOrders({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  return {
    props: {
      session,
      items: ordersMock
    }
  }
}
