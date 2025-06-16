import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  categories: string[]
  dataSeries: number[]
}

const RecipesByMeals: React.FC<Props> = ({ categories, dataSeries }) => {
  const options = {
    chart: {
      height: 350,
      dropShadow: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: [
      '#001F3F', // Navy Blue
      '#003366', // Dark Blue
      '#005B99', // Soft Navy
      '#B0BEC5', // Light Grey
      '#90A4AE', // Soft Grey
      '#78909C', // Slate Grey
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex] 
      },
      dropShadow: {
        enabled: true,
      },
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      show: false,
    },
  }

  const series = [
    {
      name: "",
      data: dataSeries,
    },
  ]
  
  return (
    <>
      <Chart options={options} series={series} type="bar" height={350} />
    </>
  )
}

export default RecipesByMeals