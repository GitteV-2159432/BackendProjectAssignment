const SectionContainer = ({ heading, children }) => {
  return (
    <section className="font-[Work_Sans] text-[#FAF9F6]">
      <h2 className="text-xl text-center font-semibold mb-6">{heading}</h2>
      <div>{children}</div>
    </section>
  )
}

export default SectionContainer
