export interface Product {
  id: number,
  title: string,
  category: string
}

export interface Recipe {
  id: number,
  name: string,
  tags: string[]
}

export interface Cart {
  id: number,
  totalProducts: number,
  total: number,
  discountedTotal: number,
  discountPercentage: number
}

export interface Post {
  id: number,
  title: string
}