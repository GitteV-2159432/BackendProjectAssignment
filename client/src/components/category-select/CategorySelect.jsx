import SelectOption from './SelectOption'

const CategorySelect = ({ categories, setCurrentCategory }) => {
  const handleChange = (e) => {
    setCurrentCategory(e.target.value)
  }

  return (
    <select className="bg-black" onChange={handleChange}>
      {categories &&
        categories.map((cat) => {
          return <SelectOption key={cat.id} id={cat.id} name={cat.name} />
        })}
    </select>
  )
}

export default CategorySelect
