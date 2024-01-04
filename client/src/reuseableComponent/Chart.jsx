
import ReactApexChart from "react-apexcharts";
import React,{useState} from 'react';

const values = {
    
  series: [{
    type:'line',
    data: [23, 34, 12, 54, 32 ,43]
  }], 
  options: {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: 'Fundamental Analysis of Stocks',
      align: 'left'
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar","Dec"]
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'left'
    }
  }
}

function ChartComp(props) {
  console.log(props)
  return (
    <div id="chart">
         <ReactApexChart options={values.options} series={values.series} type="area" height={350} width={500}/>
    </div>
  )
}

export default ChartComp


