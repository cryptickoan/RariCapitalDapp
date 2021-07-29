import { ApexOptions } from "apexcharts";

export const LineChartOptions: ApexOptions = {  
    chart: {
      foreColor: "gray",
      animations: {
        enabled: true,
      },
  
      dropShadow: {
        // This looks nice, try it!
        enabled: false,
      },
  
      toolbar: {
        show: false,
      },
  
      selection: {
        enabled: false,
      },
  
      zoom: {
        enabled: false,
      },
    },
  
    stroke: {
      curve: "smooth",
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  
    dataLabels: {
      enabled: false,
      },
  
    legend: {
      position: "top",
      horizontalAlign: "left",
      showForSingleSeries: false,
    },
  
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontFamily: "Orbitron"
        },
      },
    },
    
    tooltip: {
        style: {
            fontFamily: "Orbitron"
        }
    }


};

export type Year = {
   data: number[]; 
}

export type DataEntry = {
  name: string,
  data: Year[]
}

export const getCategories = (): string[] => {
  const now = new Date()
  const month = now.getMonth()
  let year = []
  year[0] = new Date(0, month).toLocaleString('en-US',  {month: 'long'})
  
  for (let i = 1; i < 13; i++) {
    const months = month + i > 11 ? (month - i) * -1 : month + i
    const date = new Date(0, months).toLocaleString('en-US', {month: 'long'})
    year.push(date.slice(0, 3))
  }
  return year
}


export const getInterest = (tvl: number, apy: number): number[] => {
  const monthlyInterest = tvl * (apy / 12)

  let year = [Math.trunc(tvl)]

  for (let i = 1; i < 13; i++ ) {
      year.push(parseInt((year[i-1] + monthlyInterest).toFixed(2)))
  }
  return year
}
