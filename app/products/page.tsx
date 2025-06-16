"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Product } from "../interfaces"
import Card from "../components/card"
import CustomTable from "../components/customTable"
import CustomPagination from "../components/customPagination"
import CustomSearch from "../components/customSearch"
import CustomSelect from "../components/customSelect"

const Products= () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [products, setProducts] = useState<Product[]>([])
  const [totalProduct, setTotalProduct] = useState<number>(0)
  const columnNames = ['Product ID', 'Title', 'Category', 'Price', 'Discount', 'Rating', 'Stock', 'SKU', 'Availability Status']
  const [columnData, setColumnData] = useState<string[][]>([[]])
  const [page, setPage] = useState<number>(0)
  const perPage = 12
  const [inputSearch, setInputSearch] = useState<string>('')
  const [dontFetch, setDontFetch] = useState<boolean>(false)
  const [isChangingPage, setIsChangingPage] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('')
  const [orderBy, setOrderBy] = useState<string>('')
  
  useEffect(() => {
    if (!dontFetch) {
      fetchProducts()
    }
  }, [page, inputSearch, sortBy, orderBy])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://dummyjson.com/products${inputSearch === '' ? '?' : `/search?q=${inputSearch}&`}limit=${perPage}&skip=${page * perPage}&sortBy=${sortBy}&order=${orderBy}`)
      if (inputSearch && !isChangingPage) {
        setDontFetch(true)
        setPage(0)
        setDontFetch(false)
      }
      if (isChangingPage) {
        setIsChangingPage(false)
      }
      // setProducts(response.data.products)
      setTotalProduct(response.data.total)
      setupColumnData(response.data.products)
      setIsLoading(false)
    } catch (error) {
      console.log(error, 'at fetchProducts products/page.tsx')
    }
  }

  const setupColumnData = (products: Product[]) => {
    let tempColumnData: string[][] = []
    products.forEach(item => {
      tempColumnData.push([
        String(item.id),
        String(item.title),
        String(item.category),
        `$${String(item.price)}`,
        `${String(item.discountPercentage)}%`,
        String(item.rating),
        String(item.stock),
        String(item.sku),
        String(item.availabilityStatus)
      ])
    })
    setColumnData(tempColumnData)
  }

  const handlePrevPage = () => {
    if (page>=1) {
      setIsChangingPage(true)
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page<=Math.ceil(totalProduct/perPage)) {
      setIsChangingPage(true)
      setPage(page + 1)
    }
  }

  const handleSearch = (query: string) => {
    setInputSearch(query)
  }

  const handleSelectSort = (selectedOpt: string) => {
    setSortBy(selectedOpt)
  }

  const handleSelectOrder = (selectedOpt: string) => {
    setOrderBy(selectedOpt)
  }

  return (
    <>
      <div className="text-3xl font-bold">Products</div>
      <div className="mt-4">
        <Card>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomSearch onSearch={handleSearch}/>
            <CustomSelect 
              onSelect={handleSelectSort}
              label="Sort By" 
              selectOptions={[{value: '', text: 'No Sorting'}, {value: 'price', text: 'Price'}, {value: 'rating', text: 'Rating'}]}
            />
            <CustomSelect 
              onSelect={handleSelectOrder}
              label="Order By" 
              selectOptions={[{value: '', text: 'No Ordering'}, {value: 'asc', text: 'Ascending'}, {value: 'desc', text: 'Descending'}]}
            />
          </div>
          {
            isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <CustomTable columnData={columnData} columnNames={columnNames}/>
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

export default Products