import { NavLink } from 'react-router-dom'

const NavbarItem = ({ title, icon, to }) => {
  return (
    <NavLink to={to} className="block">
      {({ isActive }) => (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`px-6 py-2 rounded-full 
              ${isActive ? 'bg-[#C297B8]/50' : ''}`}
          >
            {icon({ isActive })}
          </div>
          <span className={'text-sm font-semibold'}>{title}</span>
        </div>
      )}
    </NavLink>
  )
}

export default NavbarItem
