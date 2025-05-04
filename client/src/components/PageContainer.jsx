const PageContainer = ({ heading, children }) => {
  return (
    <div className="w-full mx-5 mt-8">
      <h1 className="font-[Abril_Fatface] text-center text-6xl text-[#C297B8] mb-12 ">
        {heading}
      </h1>
      {children}
    </div>
  )
}

export default PageContainer
