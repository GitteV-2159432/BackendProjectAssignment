const Card = ({ name, description }) => {
  return (
    <div className="w-1/2 m-1 border ">
      <h2>{name}</h2>
      <p>{description || 'No description...'}</p>
    </div>
  )
}

export default Card
