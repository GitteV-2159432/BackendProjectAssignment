import { useEffect, useState } from 'react'
import useAuth from '../context/useAuth.js'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import Cards from './Cards.jsx'
import PageContainer from './PageContainer.jsx'
import Tabs from './Tabs.jsx'
import { CardProvider } from '../context/CardContext.jsx'
import tabs from '../enums/tabs.js'

const CardPageContainer = ({ heading, endpoint }) => {
  const [activeTab, setActiveTab] = useState(tabs.personal)
  const [items, setItems] = useState()
  const { logout } = useAuth()

  useEffect(() => {
    fetchWithAuth(endpoint, logout, { query: { filter: activeTab } }).then(
      (res) => {
        res.result ? setItems(res.result) : setItems([])
      }
    )
  }, [activeTab, endpoint, logout])

  return (
    <CardProvider activeTab={activeTab} endpoint={endpoint}>
      <PageContainer heading={heading}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {items?.length > 0 ? (
          <Cards items={items} />
        ) : (
          <p className="text-center">{`No ${activeTab} ${heading.toLowerCase()} available...`}</p>
        )}
      </PageContainer>
    </CardProvider>
  )
}

export default CardPageContainer
