import { useState } from 'react'
import CardOverlay from './CardOverlay.jsx'
import MoreIcon from './icons/MoreIcon.jsx'

const Card = ({ name, description, isActive, bookmarked }) => {
  const [displayOverlay, setDisplayOverlay] = useState(false)

  return (
    <li className="relative w-[300px] h-[150px] flex-shrink-0 flex-grow-0 rounded-2xl overflow-hidden">
      <div className="relative w-full h-full px-5 py-3.5 bg-[#40434E]">
        <button
          onClick={() => setDisplayOverlay(true)}
          className="absolute w-8 h-8 top-1 right-1 flex items-center justify-center rounded-full hover:bg-[#C297B840]"
        >
          <MoreIcon />
        </button>
        <div className="flex flex-col justify-between h-full text-[#FAF9F6]">
          <div>
            <h2 className="text-xl font-[Work_Sans] font-semibold leading-tight break-words w-11/12">
              {name}
            </h2>
            <p className="text-base mt-2">
              {description || 'No description...'}
            </p>
          </div>
        </div>
      </div>
      {displayOverlay && (
        <CardOverlay
          isActive={isActive}
          bookmarked={bookmarked}
          onClose={() => setDisplayOverlay(false)}
        />
      )}
    </li>
  )
}

export default Card
