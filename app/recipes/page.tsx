"use client"

import { useEffect, useState } from "react"
import Card from "../components/card"
import axios from "axios"
import RecipesByTags from "../components/charts/recipesByTags"
import { Recipe } from "../interfaces"
import RecipesByMeals from "../components/charts/recipesByMeals"
import CustomTable from "../components/customTable"

const Recipes = () => {
  const [totalRecipe, setTotalRecipe] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [labelRecipeTags, setLabelRecipeTags] = useState<string[]>([])
  const [categorizedRecipeByTags, setCategorizedRecipeByTags] = useState<{ tag: string; count: number }[]>([{tag:'', count:0}])
  const [tagColumnData, setTagColumnData] = useState<string[][]>([])
  const [labelRecipeMeals, setLabelRecipeMeals] = useState<string[]>([])
  const [categorizedRecipeByMeals, setCategorizedRecipeByMeals] = useState<{ meal: string; count: number }[]>([{meal:'', count:0}])

  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    setupColumnData()
  }, [categorizedRecipeByTags])

  const categorizeRecipesByTags = (recipes: Recipe[]) => {
    const tagCount: { [key: string]: number } = {}

    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })

    const result = Object.entries(tagCount).sort(([, a], [, b]) => b - a).map(([tag, count]) => ({ tag, count }))
    setLabelRecipeTags(result.map(item => item.tag))
    return result
  }

  const categorizeRecipesByMeals = (recipes: Recipe[]) => {
    const mealCount: { [key: string]: number } = {}

    recipes.forEach(recipe => {
      recipe.mealType.forEach(meal => {
        mealCount[meal] = (mealCount[meal] || 0) + 1
      })
    })

    const result = Object.entries(mealCount).sort(([, a], [, b]) => a - b).map(([meal, count]) => ({ meal, count }))
    setLabelRecipeMeals(result.map(item => item.meal))
    return result
  }

  const setupColumnData = () => {
    let tempColumnData: string[][] = []
    categorizedRecipeByTags.forEach(item => {
      tempColumnData.push([
        String(item.tag),
        String(item.count)
      ])
    })
    setTagColumnData(tempColumnData)
  }

  const fetchRecipes = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('https://dummyjson.com/recipes')
      setTotalRecipe(response.data.total)
      setCategorizedRecipeByTags(categorizeRecipesByTags(response.data.recipes))
      setCategorizedRecipeByMeals(categorizeRecipesByMeals(response.data.recipes))
      setIsLoading(false)
    } catch (error) {
      console.log(error, 'at fetchRecipes recipes/page.tsx')
    }
  }

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      <div className="text-3xl font-bold">Recipes</div>
      <Card>
        <h2 className="text-2xl font-semibold">{totalRecipe}</h2>
        <p className="text-gray-700">Total Recipes</p>
      </Card>
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Recipes by Tags</h2>
          <RecipesByTags 
            lables={labelRecipeTags}
            series={categorizedRecipeByTags.map(item => item.count)}
          />
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-2">Recipes by Meals</h2>
          <RecipesByMeals 
            categories={labelRecipeMeals}
            dataSeries={categorizedRecipeByMeals.map(item => item.count)}
          />
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-semibold mb-2">Top 5 Tag</h2>
        <CustomTable columnNames={['Tag', 'Count']} columnData={tagColumnData.slice(0,5)}/>
      </Card>
    </>
  )
}

export default Recipes