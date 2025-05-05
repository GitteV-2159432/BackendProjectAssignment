import PageContainer from '../components/PageContainer.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import Workouts from '../components/dashboard/Workouts.jsx'
import BarChart from '../components/dashboard/BarChart.jsx'

const Dashboard = () => {
  return (
    <PageContainer heading={'Dashboard'}>
      <div className="flex flex-col md:flex-row flex-wrap justify-around gap-16">
        <SectionContainer heading={'Todays Session'}>
          <button className="rounded-full px-3 py-2 mb-6 w-80 bg-[#FDCFF3] hover:bg-[#C297B8] text-[#070707] font-medium transition-colors duration-200">
            Start now
          </button>
          <Workouts />
        </SectionContainer>
        <SectionContainer heading={'Weekly Workout Frequency'}>
          <BarChart />
        </SectionContainer>
      </div>
    </PageContainer>
  )
}

export default Dashboard
