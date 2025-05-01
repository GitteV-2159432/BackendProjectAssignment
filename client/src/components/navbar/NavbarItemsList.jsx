import NavbarItem from './NavbarItem.jsx'

const NavbarItemsList = ({ items }) => (
  <ul className="flex flex-col w-full gap-4">
    {items.map((item) => (
      <li key={item.to}>
        <NavbarItem {...item} />
      </li>
    ))}
  </ul>
)

export default NavbarItemsList
