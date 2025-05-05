import { createContext, useContext, useEffect, useState } from 'react'
import endpoints from '../enums/endpoints'

const CardContext = createContext()

const CardProvider = ({ activeTab, endpoint, children }) => {
  const [higherLevelEndpoint, setHigherLevelEndpoint] = useState(null)
  const [cardEndpoint, setCardEndpoint] = useState(endpoint.substring(1))

  useEffect(() => {
    if (endpoint === endpoints.exercises) {
      setHigherLevelEndpoint(endpoints.workouts)
    } else if (endpoint === endpoints.workouts) {
      setHigherLevelEndpoint(endpoints.plans)
    }
  }, [endpoint])

  return (
    <CardContext.Provider
      value={{
        activeTab,
        endpoint: cardEndpoint,
        higherLevelEndpoint,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

const useCard = () => {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}

export { CardProvider, useCard }
