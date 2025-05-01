import Card from './Card.jsx'

const Cards = ({ items, onMoreButtonClicked }) => {
  return (
    <div className="flex">
      {items &&
        items.map((item) => {
          return (
            <Card
              key={item._id}
              name={item.name}
              description={item.description}
              onMoreButtonClicked={(e) => onMoreButtonClicked(e, item._id)}
            />
          )
        })}
    </div>
  )
}

export default Cards
