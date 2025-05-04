import tabs from '../enums/tabs'

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabStyle = (tabName) =>
    `px-4 py-2 rounded-full text-[#FAF9F6] text-sm transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-[#C297B880]'
        : 'bg-[#FAF9F666] hover:bg-[#FAF9F650]'
    }`

  return (
    <div className="flex justify-center mb-5 space-x-4">
      <button
        onClick={() => setActiveTab(tabs.personal)}
        className={tabStyle(tabs.personal)}
      >
        Personal
      </button>
      <button
        onClick={() => setActiveTab(tabs.bookmarked)}
        className={tabStyle(tabs.bookmarked)}
      >
        Bookmarks
      </button>
      <button
        onClick={() => setActiveTab(tabs.public)}
        className={tabStyle(tabs.public)}
      >
        Public
      </button>
    </div>
  )
}

export default Tabs
