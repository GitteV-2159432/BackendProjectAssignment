const CardOverlayItem = ({ icon, label }) => {
  return (
    <li className="h-1/4 p-2.5 hover:bg-[#a787a0] rounded-2xl">
      <button className="flex items-center gap-3 text-base text-[#070707]">
        {icon}
        {label}
      </button>
    </li>
  )
}

export default CardOverlayItem
