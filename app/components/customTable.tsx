import { useState } from "react"
interface Props {
  columnNames: string[]
  columnData: string[][]
}

const CustomTable: React.FC<Props> = ({ columnNames, columnData }) => {
  const [isPaginationOff, setIfPaginationOff] = useState<boolean>(false)

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {
                columnNames.map((item,id) => {
                  return (
                    <th scope="col" className="px-6 py-3" key={id}>
                      {item}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              columnData.map((item_i, id_i) => {
                return (
                  <tr key={id_i} className="bg-white border-b border-gray-200">
                    {
                      item_i.map((item_j, id_j) => {
                        return (
                          <th key={`${id_i} + ${id_j}`} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {item_j}
                          </th>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomTable