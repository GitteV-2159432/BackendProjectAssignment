import { useState } from 'react'
import Card from './Card.jsx'

const Cards = ({ items }) => {
  const [overlayCardId, setOverlayCardId] = useState(null)

  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap justify-center gap-6 max-w-[1096px]">
        {items &&
          items.map((item) => {
            return (
              <Card
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                equipment={item.equipment}
                isActive={item.isActive}
                bookmarked={item.bookmarked}
                displayOverlay={item._id === overlayCardId}
                setOverlayCardId={setOverlayCardId}
              />
            )
          })}
      </ul>
    </div>
  )
}

export default Cards
