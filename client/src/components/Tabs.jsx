import tabs from '../enums/tabs'

const Tabs = ({ currentPath, activeTab, setActiveTab }) => {
  const tabStyle = (tabName) =>
    `px-4 py-2 rounded-full text-[#FAF9F6] text-sm transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-[#C297B880]'
        : 'bg-[#FAF9F666] hover:bg-[#FAF9F650]'
    }`

  return (
    <div className="flex justify-center space-x-4">
      {currentPath !== '/exercises' && (
        <button
          onClick={() => setActiveTab(tabs.personal)}
          className={tabStyle(tabs.personal)}
          aria-label={`Personal ${currentPath.substring(1)}`}
        >
          Personal
        </button>
      )}
      <button
        onClick={() => setActiveTab(tabs.bookmarked)}
        className={tabStyle(tabs.bookmarked)}
        aria-label={`Bookmarked ${currentPath.substring(1)}`}
      >
        Bookmarks
      </button>
      <button
        onClick={() => setActiveTab(tabs.public)}
        className={tabStyle(tabs.public)}
        aria-label={`Public ${currentPath.substring(1)}`}
      >
        Public
      </button>
    </div>
  )
}

export default Tabs
