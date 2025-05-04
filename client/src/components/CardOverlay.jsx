import CardOverlayItem from './CardOverlayItem'
import CloseIcon from './icons/CloseIcon'
import AddIcon from './icons/AddIcon'
import ToggleOnIcon from './icons/ToggleOnIcon'
import ToggleOffIcon from './icons/ToggleOffIcon'
import BookmarkAddIcon from './icons/BookmarkAddIcon'
import BookmarkRemoveIcon from './icons/BookmarkRemoveIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import { useCard } from '../context/CardContext'
import tabs from '../enums/tabs'
import endpoints from '../enums/endpoints'

const CardOverlay = ({ isActive, bookmarked }) => {
  const { activeTab, endpoint, higherLevelEndpoint } = useCard()

  return (
    <>
      <div className="absolute bg-[#070707] opacity-70 w-full h-full top-0 right-0"></div>
      <div className="absolute bg-[#FDCFF3] w-3/4 h-full top-0 right-0">
        <div className="flex flex-col">
          <button className="absolute w-8 h-8 top-2.5 right-1">
            <CloseIcon />
          </button>

          <ul className="flex flex-col">
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
              <CardOverlayItem
                icon={<BookmarkAddIcon />}
                label={`Add bookmark`}
              />
            )}

            {/* unbookmark exercise, workout or plan */}
            {activeTab === tabs.public && bookmarked && (
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
              <CardOverlayItem
                icon={<DeleteIcon />}
                label={`Delete ${endpoint}`}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CardOverlay
