import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import Cards from './Cards.jsx'
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

  return (
    <div className="w-full mx-5 mt-4">
      <h1 className="font-medium text-center text-9xl">{heading}</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {items?.length > 0 ? (
        <Cards items={items} />
      ) : (
        <p>{`No ${heading} available.`}</p>
      )}
    </div>
  )
}

export default CardPageContainer
