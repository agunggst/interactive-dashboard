interface Props {
  prevPage: () => void,
  nextPage: () => void
}

const CustomPagination: React.FC<Props> = ({ prevPage, nextPage }) => {
  return (
    <>
      <nav aria-label="page navigation">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <div 
              onClick={() => prevPage()}
              className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </div>
          </li>
          {/* <li>
            <div 
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              1
            </div>
          </li> */}
          <li>
            <div 
              onClick={() => nextPage()}
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default CustomPagination