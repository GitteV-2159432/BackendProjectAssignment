import SelectOption from './SelectOption'

const CategorySelect = ({ categories, setCurrentCategory }) => {
  const handleChange = (e) => {
    setCurrentCategory(e.target.value)
  }

  return (
    <>
      <label htmlFor="exerciseCategorySelect">Exercise category</label>
      <select
        id="exerciseCategorySelect"
        className="bg-[#070707] border-2 border-[#FAF9F666] rounded-full px-4 py-2 text-[#FAF9F6] text-sm"
        onChange={handleChange}
      >
        {categories &&
          categories.map((cat) => {
            return <SelectOption key={cat.id} id={cat.id} name={cat.name} />
          })}
      </select>
    </>
  )
}

export default CategorySelect
