import MoreIcon from './icons/MoreIcon.jsx'

const Card = ({ name, description, onMoreButtonClicked }) => {
  return (
    <div className="relative w-[320px] h-[320px] p-4 m-1 bg-[#40434E] rounded-md">
      <button
        onClick={onMoreButtonClicked}
        className="absolute flex items-center justify-center w-8 h-8 m-2 top-2 right-2"
      >
        <MoreIcon />
      </button>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p>{description || 'No description...'}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
