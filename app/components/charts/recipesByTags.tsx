import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  lables: string[]
  series: number[]
}

const RecipesByTags: React.FC<Props> = ({ lables, series }) => {
  const options = {
    plotOptions: {
      pie: {
        donut: {
          size: "50%"
        }
      }
    },
    labels: lables
  }
  return(
    <>
      <Chart 
        options={options} 
        series={series} 
        type="donut" 
        height={300}
      />
    </>
  )
}

export default RecipesByTags