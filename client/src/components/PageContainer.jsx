const PageContainer = ({ heading, children }) => {
  return (
    <div className="w-full">
      <h1 className="font-[Fatface] font-semibold text-center text-7xl text-[#C297B8] mb-12">
        {heading}
      </h1>
      {children}
    </div>
  )
}

export default PageContainer
