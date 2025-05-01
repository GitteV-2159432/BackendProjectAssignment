const Card = ({ name, description }) => {
  return (
    <div className="w-[320px] h-[320px] p-4 m-1 bg-[#40434E]">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>{description || 'No description...'}</p>
    </div>
  )
}

export default Card
