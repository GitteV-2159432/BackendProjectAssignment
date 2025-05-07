const SectionContainer = ({ heading, children }) => {
  return (
    <section className="font-[Work_Sans] text-[#FAF9F6]">
      <h2 className="mb-6 text-xl font-semibold text-center">{heading}</h2>
      <div>{children}</div>
    </section>
  )
}

export default SectionContainer
