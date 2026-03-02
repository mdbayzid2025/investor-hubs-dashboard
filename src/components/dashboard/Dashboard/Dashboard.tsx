import { ChartAreaInteractive } from './chart-area-interactive'
import RecentActivity from './RecentActivity'
import UserRoles from './RoleDistribution'
import StatsCards from './Statics'
import SubscriptionChart from './SubscriptionChart'
import UserGrowthTrend from './Usergrowthtrend'


const Dashboard = () => {
  return (
    <div className='p-5'>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-x-5 mb-5">
        <UserGrowthTrend />
        <UserRoles />
      </div>
        <SubscriptionChart />
      <div className=" flex items-center gap-5 mb-6">
        <ChartAreaInteractive />
        {/* <SalesChart />
        <OrdersChart /> */}
      </div>
      <RecentActivity />
    </div>
  )
}

export default Dashboard