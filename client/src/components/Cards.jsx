import Card from './Card.jsx'

const Cards = ({ items }) => {
  return (
    <ul className="flex gap-6">
      {items &&
        items.map((item) => {
          return (
            <Card
              key={item._id}
              name={item.name}
              description={item.description}
              isActive={item.isActive}
              bookmarked={item.bookmarked}
            />
          )
        })}
    </ul>
  )
}

export default Cards
