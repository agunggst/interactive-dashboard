import { useEffect, useState } from "react"
import { debounce } from 'lodash'

interface Props {
  placeholder?: string,
  onSearch: (query: string) => void
}

const CustomSearch: React.FC<Props> = ({ placeholder='Input Text', onSearch }) => {
  const [query, setQuery] = useState<string>('')

  const debouncedSearch = debounce((searchTerm: string) => {
    onSearch(searchTerm)
  }, 1000)

  useEffect(() => {
    debouncedSearch(query)
    return () => {
      debouncedSearch.cancel()
    }
  }, [query])
  
  return (
    <>
      <div className="px-4 py-2">
        <span className="font-medium">Search: </span>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ml-2 px-1.5 py-1 border-b border-gray-200" 
          type="text" 
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

export default CustomSearch