"use client"

import { useEffect, useState } from "react"
import Card from "../components/card"
import CustomTable from "../components/customTable"
import { Cart } from "../interfaces"
import axios from "axios"
import CustomPagination from "../components/customPagination"

const Carts = () => {
  const columnNames = ['ID Cart', 'Total Product', 'Total Price', 'Discount', 'Total Price After Discount']
  const [columnData, setColumnData] = useState<string[][]>([])
  const [totalCart, setTotalCart] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const perPage = 12

  useEffect(() => {
    fetchCarts()
  }, [page])

  const fetchCarts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://dummyjson.com/carts?limit=${perPage}&skip=${page * perPage}`)
      setTotalCart(response.data.total)
      setupColumnData(response.data.carts)
      setIsLoading(false)
    } catch (error) {
      console.log(error, 'at fetchCarts carts/page.tsx')
    }
  }

  const setupColumnData = (carts: Cart[]) => {
    let tempColumnData: string[][] = []
    carts.forEach(item => {
      tempColumnData.push([
        String(item.id),
        String(item.products.length),
        `$${item.total}`,
        `${String(Math.round(((item.total - item.discountedTotal) / item.total) * 100))}%`,
        `$${item.discountedTotal}`
      ])
    })
    setColumnData(tempColumnData)
  }

  const handlePrevPage = () => {
    if (page>=1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page<=Math.ceil(totalCart/perPage)) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <div className="text-3xl font-bold">Carts</div>
      <div className="mt-4">
        <Card>
          {
            isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
              <CustomTable
                columnData={columnData} 
                columnNames={columnNames}
              />
              <div className="mt-8 flex justify-center">
                <CustomPagination prevPage={handlePrevPage} nextPage={handleNextPage} />
              </div>
              </>
            )
          }
        </Card>
      </div>
    </>
  )
}

export default Carts