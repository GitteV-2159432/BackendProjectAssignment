const Tabs = ({ activeTab, setActiveTab }) => {
  const tabStyle = (tabName) =>
    `px-4 py-2 rounded-full text-white transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-[#C297B880]'
        : 'bg-[#FAF9F666] hover:bg-[#FAF9F650   ]'
    }`

  return (
    <div className="flex justify-center my-6 space-x-4">
      <button
        onClick={() => setActiveTab('personal')}
        className={tabStyle('personal')}
      >
        Personal
      </button>
      <button
        onClick={() => setActiveTab('bookmarked')}
        className={tabStyle('bookmarked')}
      >
        Bookmarks
      </button>
      <button
        onClick={() => setActiveTab('public')}
        className={tabStyle('public')}
      >
        Public
      </button>
    </div>
  )
}

export default Tabs
