const CardOverlayItem = ({ icon, label }) => {
  return (
    <li className="px-3.5 py-2">
      <button className="flex items-center gap-3 text-base text-[#070707] hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C297B8] rounded">
        {icon}
        {label}
      </button>
    </li>
  )
}

export default CardOverlayItem
