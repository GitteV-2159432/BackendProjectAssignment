import Card from './Card.jsx'

const Cards = ({ items }) => {
  return (
    <div className="flex">
      {items &&
        items.map((item) => {
          return (
            <Card
              key={item._id}
              name={item.name}
              description={item.description}
            />
          )
        })}
    </div>
  )
}

export default Cards
