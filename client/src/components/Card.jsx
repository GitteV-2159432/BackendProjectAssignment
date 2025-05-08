import { useCard } from '../context/CardContext.jsx'
import CardOverlay from './CardOverlay.jsx'
import BookmarkAddedIcon from './icons/BookmarkAddedIcon.jsx'
import MoreIcon from './icons/MoreIcon.jsx'

const Card = ({
  id,
  name,
  description,
  equipment,
  isActive,
  bookmarked,
  displayOverlay,
  setOverlayCardId,
}) => {
  const { endpoint } = useCard()

  return (
    <li
      className={`relative w-[250px] h-[160px] flex-shrink-0 flex-grow-0 rounded-2xl overflow-hidden ${
        isActive ? 'border-2 border-[#C297B8]' : ''
      }`}
      tabIndex={0}
      aria-labelledby={`card-title-${id}`}
      role="region"
    >
      <div className="relative w-full h-full px-5 py-3.5 bg-[#40434E]">
        {isActive && (
          <p id="card_active_desc" className="sr-only">
            active plan
          </p>
        )}
        {bookmarked && (
          <div
            role="img"
            aria-label="This item is bookmarked."
            className="absolute left-3.5 top-3"
          >
            <BookmarkAddedIcon />
          </div>
        )}
        <div className="flex flex-col justify-between h-full text-[#FAF9F6]">
          <div>
            <h2
              id={`card-title-${id}`}
              aria-level={2}
              className={`text-lg font-[Work_Sans] font-semibold leading-tight break-words w-[185px] ${
                bookmarked ? 'ml-6' : ''
              }`}
            >
              {name}
            </h2>
            {!equipment && (
              <p className="mt-2 text-sm" id={`card-desc-${id}`}>
                {description || 'No description...'}
              </p>
            )}
            {equipment && equipment.length === 0 && (
              <p className="mt-2 text-sm">{'No equipment needed...'}</p>
            )}
            {equipment && equipment.length > 0 && (
              <div
                className="mt-2 text-sm"
                aria-labelledby={`equipment-for-${id}`}
              >
                <span>Equipment</span>
                <ul className="list-disc list-inside">
                  {equipment.map((eq) => (
                    <li
                      key={eq}
                      className="ml-1"
                      aria-label={`Equipment item: ${eq}`}
                    >
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setOverlayCardId(id)}
          aria-label={`Display more actions for the ${endpoint.substring(
            0,
            endpoint.length - 1
          )} ${name}.`}
          className="absolute w-8 h-8 top-1 right-1 flex items-center justify-center rounded-full hover:bg-[#C297B840]"
        >
          <MoreIcon />
        </button>
      </div>
      {displayOverlay && (
        <CardOverlay
          isActive={isActive}
          bookmarked={bookmarked}
          onClose={() => setOverlayCardId(null)}
        />
      )}
    </li>
  )
}

export default Card
