interface Props {
  children: React.ReactNode
}

const SummaryCard: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 m-2">
        {children}
      </div>
    </>
  )
}

export default SummaryCard