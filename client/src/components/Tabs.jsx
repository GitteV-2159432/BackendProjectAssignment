import tabs from '../enums/tabs'

const Tabs = ({ currentPath, activeTab, setActiveTab }) => {
  const tabStyle = (tabName) =>
    `px-4 py-2 rounded-full text-[#FAF9F6] text-sm transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-[#C297B880]'
        : 'bg-[#FAF9F666] hover:bg-[#FAF9F650]'
    }`

  return (
    <div role="tablist" className="flex justify-center space-x-4">
      {currentPath !== '/exercises' && (
        <button
          id="tab-personal"
          onClick={() => setActiveTab(tabs.personal)}
          className={tabStyle(tabs.personal)}
          role="tab"
          aria-selected={activeTab === tabs.personal}
          aria-controls="tabpanel-personal"
        >
          Personal
        </button>
      )}
      <button
        id="tab-bookmarks"
        onClick={() => setActiveTab(tabs.bookmarked)}
        className={tabStyle(tabs.bookmarked)}
        role="tab"
        aria-selected={activeTab === tabs.bookmarked}
        aria-controls="tabpanel-bookmarks"
      >
        Bookmarks
      </button>
      <button
        id="tab-public"
        onClick={() => setActiveTab(tabs.public)}
        className={tabStyle(tabs.public)}
        role="tab"
        aria-selected={activeTab === tabs.public}
        aria-controls="tabpanel-public"
      >
        Public
      </button>
    </div>
  )
}

export default Tabs
