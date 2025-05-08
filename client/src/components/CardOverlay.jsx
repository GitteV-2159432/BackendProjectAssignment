import { useEffect } from 'react'
import { useCard } from '../context/CardContext'
import endpoints from '../enums/endpoints'
import tabs from '../enums/tabs'
import CardOverlayItem from './CardOverlayItem'
import AddIcon from './icons/AddIcon'
import BookmarkAddIcon from './icons/BookmarkAddIcon'
import BookmarkRemoveIcon from './icons/BookmarkRemoveIcon'
import CloseIcon from './icons/CloseIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import ToggleOffIcon from './icons/ToggleOffIcon'
import ToggleOnIcon from './icons/ToggleOnIcon'

const CardOverlay = ({ isActive, bookmarked, onClose }) => {
  const { activeTab, endpoint, higherLevelEndpoint } = useCard()

  useEffect(() => {
    if (isActive) {
      document.getElementById('card-overlay').focus()
    }
  }, [isActive])

  return (
    <div
      id="card-overlay"
      className="absolute bg-[#FDCFF3] w-full h-full top-0 right-0"
      role="dialog"
    >
      <button
        onClick={onClose}
        aria-label="Hide actions."
        className="absolute w-8 h-8 top-1 right-1 flex items-center justify-center rounded-full hover:bg-[#C297B8]"
      >
        <CloseIcon />
      </button>

      <ul className="absolute w-full mt-6">
        {/* add to workout or plan */}
        {(activeTab === tabs.exercises || activeTab === tabs.workouts) && (
          <CardOverlayItem
            icon={<AddIcon />}
            label={`Add to ${higherLevelEndpoint}`}
          />
        )}

        {/* activate plan */}
        {endpoint === endpoints.plans && !isActive && (
          <CardOverlayItem icon={<ToggleOnIcon />} label={`Activate`} />
        )}

        {/* deactivate plan */}
        {endpoint === endpoints.plans && isActive && (
          <CardOverlayItem icon={<ToggleOffIcon />} label={`Deactivate`} />
        )}

        {/* bookmark exercise, workout or plan */}
        {activeTab === tabs.public && !bookmarked && (
          <CardOverlayItem icon={<BookmarkAddIcon />} label={`Add bookmark`} />
        )}

        {/* unbookmark exercise, workout or plan */}
        {(activeTab === tabs.bookmarked ||
          (activeTab === tabs.public && bookmarked)) && (
          <CardOverlayItem
            icon={<BookmarkRemoveIcon />}
            label={`Remove bookmark`}
          />
        )}

        {/* edit personal workout or plan */}
        {activeTab === tabs.personal && (
          <CardOverlayItem icon={<EditIcon />} label={`Edit ${endpoint}`} />
        )}

        {/* delete personal workout or plan */}
        {activeTab === tabs.personal && (
          <CardOverlayItem icon={<DeleteIcon />} label={`Delete ${endpoint}`} />
        )}
      </ul>
    </div>
  )
}

export default CardOverlay
