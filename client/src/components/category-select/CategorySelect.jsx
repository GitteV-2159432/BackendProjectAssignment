import SelectOption from './SelectOption'

const CategorySelect = ({ categories, setCurrentCategory }) => {
  const handleChange = (e) => {
    setCurrentCategory(e.target.value)
  }

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="exerciseCategorySelect"
        style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}
      >
        Exercise category
      </label>
      <select
        id="exerciseCategorySelect"
        className="bg-[#070707] border-2 border-[#FAF9F666] rounded-full px-4 py-2 text-[#FAF9F6] text-sm"
        onChange={handleChange}
      >
        {categories &&
          categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cat) => {
              return <SelectOption key={cat.id} id={cat.id} name={cat.name} />
            })}
      </select>
    </div>
  )
}

export default CategorySelect
