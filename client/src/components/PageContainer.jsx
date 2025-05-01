const PageContainer = ({ heading, children }) => {
  return (
    <div className="w-full mx-5 mt-4">
      <h1 className="font-medium text-center text-9xl">{heading}</h1>
      {children}
    </div>
  )
}

export default PageContainer
