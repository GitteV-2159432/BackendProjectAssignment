import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import Cards from './Cards.jsx'
import PageContainer from './PageContainer.jsx'
import Tabs from './Tabs.jsx'

const CardPageContainer = ({ heading, endpoint }) => {
  const [activeTab, setActiveTab] = useState('personal')
  const [items, setItems] = useState()
  const { logout } = useAuth()

  useEffect(() => {
    fetchWithAuth(endpoint, logout, { query: { filter: activeTab } }).then(
      (res) => {
        res.result ? setItems(res.result) : setItems([])
      }
    )
  }, [activeTab])

  const handleMoreButtonClicked = (e, id) => {
    console.log(id)
  }

  return (
    <PageContainer heading={heading}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {items?.length > 0 ? (
        <Cards items={items} onMoreButtonClicked={handleMoreButtonClicked} />
      ) : (
        <p className="text-center">{`No ${activeTab} ${heading.toLowerCase()} available...`}</p>
      )}
    </PageContainer>
  )
}

export default CardPageContainer
