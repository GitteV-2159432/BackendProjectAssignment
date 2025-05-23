const CardOverlayItem = ({ icon, label }) => {
  return (
    <li className="px-3.5 py-2">
      <button className="flex items-center gap-3 text-base text-[#070707] hover:cursor-pointer">
        {icon}
        {label}
      </button>
    </li>
  )
}

export default CardOverlayItem
