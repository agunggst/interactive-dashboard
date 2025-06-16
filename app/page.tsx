"use client"

import axios from "axios"
import SummaryCard from "./components/card"
import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import { Product, Recipe } from './interfaces'
import CustomTable from "./components/customTable"
import Link from "next/link"

const Dashboard = () => {
  const [topCategories, setTopCategories] = useState<{ category: string; count: number }[]>([{category:'', count:0}])
  const [categorizedRecipe, setCategorizedRecipe] = useState<{ tag: string; count: number }[]>([{tag:'', count:0}])
  const [labelTopRecipeTags, setLabelTopRecipeTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [carts, setCarts] = useState<string[][]>([])
  const [posts, setPosts] = useState<string[][]>([])

  const [totalProduct, setTotalProduct] = useState(0)
  const [totalRecipe, setTotalRecipe] = useState(0)
  const [totalCarts, setTotalCarts] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  const dataCards = [
    {
      number: totalProduct,
      cardText: 'Products'
    },
    {
      number: totalRecipe,
      cardText: 'Recipes'
    },
    {
      number: totalCarts,
      cardText: 'Transactions (Carts)'
    },
    {
      number: totalPosts,
      cardText: 'Posts'
    },
  ]

  useEffect(() => {
    fetchProducts()
    fetchRecipes()
    fetchCarts()
    fetchPosts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('https://dummyjson.com/products')
      setTotalProduct(response.data.total)
      const products: Product[] = response.data.products
      const categoryCount: { [key: string]: number } = {}
      products.forEach(product => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
      })
      const sortedCategories = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([category, count]) => ({ category, count }))
      setTopCategories(sortedCategories)
    } catch (error) {
      console.log(error, 'at fetchProducts page.tsx')
    }
  }

  const categorizeRecipesByTags = (recipes: Recipe[]) => {
    const tagCount: { [key: string]: number } = {}

    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })

    const result = Object.entries(tagCount).sort(([, a], [, b]) => b - a).slice(0, 5).map(([tag, count]) => ({ tag, count }))
    setLabelTopRecipeTags(result.map(item => item.tag))
    return result
  }

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes')
      setTotalRecipe(response.data.total)
      setCategorizedRecipe(categorizeRecipesByTags(response.data.recipes))
    } catch (error) {
      console.log(error, 'at fetchRecipes page.tsx')
    }
  }

  const fetchCarts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/carts')
      setTotalCarts(response.data.total)
      let carts: string[][] = []
      response.data.carts.forEach((item: any) => {
        let discountPercentage = Math.round(((item.total - item.discountedTotal) / item.total) * 100)
        carts.push([ String(item.id), String(item.totalProducts), `${String(discountPercentage)}%`, `$${String(item.discountedTotal)}` ])
      })
      setCarts(carts)
    } catch (error) {
      console.log(error, 'at fetchCarts page.tsx')
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/posts')
      setTotalPosts(response.data.total)
      // setPosts(response.data.carts)
      let posts: string[][] = []
      response.data.posts.forEach((item: any) => {
        posts.push([ String(item.title) ])
      })
      setPosts(posts)
      setIsLoading(false)
    } catch (error) {
      console.log(error, 'at fetchPosts page.tsx')
    }
  }

  const plotProductByCategoryOptions = {
    chart: {
      height: 350
    },
    xaxis: {
      categories: topCategories.map(item => item.category)
    }
  }

  const plotRecipeByTagOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: "50%"
        }
      }
    },
    labels: labelTopRecipeTags
  }

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      <div className="text-3xl font-bold">Dashboard</div>
      <div className="summary-cards grid grid-cols-1 mt-4 md:grid-cols-4 gap-4">
        {
          dataCards.map((item, id) => {
            return (
              <SummaryCard key={id}>
                <h2 className="text-2xl font-semibold">{item.number}</h2>
                <p className="text-gray-700">{item.cardText}</p>
              </SummaryCard>
            )
          })
        }
      </div>
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
        <SummaryCard>
          <h2 className="text-lg font-semibold mb-2">Products by Category</h2>
          <Chart 
            options={plotProductByCategoryOptions} 
            series={[{ name: 'Products', data: topCategories.map(item => item.count) }]} 
            type="bar" 
            height={350}
          />
        </SummaryCard>
        <SummaryCard>
          <h2 className="text-lg font-semibold mb-2">Recipes by Tags</h2>
          <Chart 
            options={plotRecipeByTagOptions} 
            series={categorizedRecipe.map(item => item.count)} 
            type="donut" 
            height={300}
          />
        </SummaryCard>
      </div>
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
        <Link href="/carts" className="cursor-pointer">
          <SummaryCard>
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <CustomTable 
              columnNames={['ID Cart', 'Total Products', 'Discount', 'Total After Discount']} 
              columnData={carts.slice(0, 5)}
            />
          </SummaryCard>
        </Link>
        <Link href="/posts" className="cursor-pointer">
          <SummaryCard>
            <h2 className="text-lg font-semibold mb-2">Posts</h2>
            <CustomTable 
              columnNames={[]} 
              columnData={posts.slice(0, 6)}
            />
          </SummaryCard>
        </Link>
      </div>
    </>
  )
}

export default Dashboard