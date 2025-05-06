import PageContainer from '../components/PageContainer.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import TodaysSession from '../components/dashboard/TodaysSession.jsx'
import BarChart from '../components/dashboard/BarChart.jsx'

const Dashboard = () => {
  return (
    <PageContainer heading={'Dashboard'}>
      <div className="flex flex-row flex-wrap justify-around gap-14">
        <SectionContainer heading={'Todays Session'}>
          <TodaysSession />
        </SectionContainer>
        <SectionContainer heading={'Weekly Workout Frequency'}>
          <BarChart />
        </SectionContainer>
      </div>
    </PageContainer>
  )
}

export default Dashboard
