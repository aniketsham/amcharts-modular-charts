
import './App.css'
import MyChart from './components/Charts'
import { useState } from 'react';

function App() {

  const [marketValue,setMarketValue]=useState([200,300,400])

  const data=  [{
    category: "Research",
    value1: marketValue[0],
    value2: 588
  }, {
    category: "Marketing",
    value1: marketValue[1],
    value2: 1800
  }, {
    category: "Sales",
    value1: marketValue[2],
    value2: 1230
  }];

  const data2=  [{
    category: "Research",
    value1: 1000,
    value2: 588
  }, {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  }, {
    category: "Sales",
    value1: 850,
    value2: 1230
  }];

  const pieData1=[{
    country: "France",
    sales: 100000
  }, {
    country: "Spain",
    sales: 160000
  }, {
    country: "United Kingdom",
    sales: 80000
  }, {
    country: "India",
    sales: 100000
  }]

  const pieData2=[{
    country: "Argentina",
    sales: 100
  }, {
    country: "Netherlands",
    sales: 160
  }, {
    country: "Mexico",
    sales: 100
  }, {
    country: "Banlgadesh",
    sales: 1000
  }]
  const updateMarketValue = (index: number, newValue: number) => {
    setMarketValue((prevMarketValue) =>
      prevMarketValue.map((value, i) => (i === index ? newValue : value))
    );
  };
  return (
    <div className='flex flex-col justify-center items-center w-screen '>
    <h1 className='text-2xl font-bold font-mono py-10'>Charts App(using AmCharts)</h1>
<div className='flex flex-row gap-5 justify-center items-center pb-10'>
  
    <div>

    <label className='pr-2 font-bold text-xl'>1</label>
    <input placeholder='market' className='border-4 border-black' value={marketValue[0]} onChange={(e)=>{updateMarketValue(0,Number(e.target.value))}} type="number">
    </input>
    </div>
    <div>
    <label className='pr-2 font-bold text-xl'>2</label>
    <input placeholder='2' className='border-4 border-black' value={marketValue[1]} onChange={(e)=>{updateMarketValue(1,Number(e.target.value))}}  type="number">
    </input>
    </div>
    <div>
    <label className='pr-2 font-bold text-xl'>3</label>
    <input placeholder='3' className='border-4 border-black' value={marketValue[2]}  onChange={(e)=>{updateMarketValue(2,Number(e.target.value))}}  type="number">
    </input>
    </div>
</div>
    <div className='flex flex-row gap-5' >


    <div className='p-5 border-2 border-gray-400'>

    <MyChart type="bar"  newdata={data} color={["#0A97B0","#0A5EB0"]} 
    rounded={true}  
    xAxisLabel="Category" 
    yAxisLabel="Sales" 
    legend={true}
    legendConfig={{fontSize: 15,legendText:"{name}  year"}} cursor={true} 
    />
    </div>
    <div className='p-5  border-2 border-gray-400'>

    <MyChart type="pie" newdata={pieData1} color={["#EB5B00","#D91656","#C4E1F6"]}
     cursor={true} 
     label={true}
      legend={true}
      tooltipConfig = { {label: "<h2>{category}: {value}</h2>"} }
      />
    </div>
    </div>
    <div className='flex flex-row gap-5 pt-10 '>
    <div className='p-5  border-2 border-gray-400'>

    <MyChart type="pie" newdata={pieData1}  color= {[
                  "#F87A53", // Red-orange
                  "#88C273", // Green
                  "#FEEC37", // Blue
                  "#C4E1F6"
                ]}
                 legend={true}
                 label={true}
                 tooltipConfig = { {label: "<h2>{category}:{value}</h2>"} }
                 />
    </div>
     <div className='p-5  border-2 border-gray-400'>

      <MyChart type="donut" newdata={pieData2} color= {[
                  "#0D92F4", // Red-orange
                  "#77CDFF", // Green
                  "#F95454", // Blue
                  "#EB8317"
                ]}
                label={false}
                legend={true}
                />
         </div>
    </div>
   
    </div>
  )
}

export default App
