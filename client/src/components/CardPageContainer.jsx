import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CardProvider } from '../context/CardContext.jsx'
import useAuth from '../context/useAuth.js'
import tabs from '../enums/tabs.js'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import Cards from './Cards.jsx'
import PageContainer from './PageContainer.jsx'
import Tabs from './Tabs.jsx'
import CategorySelect from './category-select/CategorySelect.jsx'

const CardPageContainer = ({ heading, endpoint }) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/exercises' ? tabs.public : tabs.personal
  )
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState()
  const { logout } = useAuth()

  useEffect(() => {
    if (location.pathname === '/exercises' && !currentCategory) return

    const query = { filter: activeTab }
    if (location.pathname === '/exercises') {
      query.categoryId = currentCategory
    }

    fetchWithAuth(endpoint, logout, { query }).then((res) => {
      if (res.error) {
        console.error('Request failed:', res.error)
        setItems([])
        return
      }

      if (res.result?.error) {
        console.error('Server returned error:', res.result.error.message)
        setItems([])
        return
      }

      setItems(res.result)
    })
  }, [activeTab, endpoint, logout, currentCategory, location.pathname])

  useEffect(() => {
    if (location.pathname !== '/exercises') return

    fetchWithAuth('/categories', logout).then((res) => {
      if (res.error || res.result?.error) {
        console.error(
          'Failed to fetch categories:',
          res.error || res.result?.error
        )
        return
      }
      setCategories(res.result)
      setCurrentCategory(res.result[0]?.id)
    })
  }, [location.pathname, logout])

  return (
    <CardProvider activeTab={activeTab} endpoint={endpoint}>
      <PageContainer heading={heading}>
        <div className="lg:relative md:flex md:flex-col mb-6">
          <Tabs
            currentPath={location.pathname}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {location.pathname === '/exercises' && (
            <div className="md:flex md:justify-center md:mt-6 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:mr-16">
              <CategorySelect
                categories={categories}
                setCurrentCategory={setCurrentCategory}
              />
            </div>
          )}
        </div>
        {items?.length ? (
          <Cards items={items} />
        ) : (
          <p className="text-center text-sm text-[#FAF9F6]">
            No {activeTab} {heading.toLowerCase()} available...
          </p>
        )}
      </PageContainer>
    </CardProvider>
  )
}

export default CardPageContainer
