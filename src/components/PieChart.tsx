import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useLayoutEffect, useRef } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type pieDataType={
    country:string,
    sales:number
}

type PieProps={
    pieData:pieDataType[]
    colors:string[]
    legend?:boolean
    label?:boolean
}

const PieChart = ({pieData,colors,legend,label}:PieProps) => {

    const chartRef=useRef(null)

    useLayoutEffect(()=>{
        const root = am5.Root.new(chartRef.current);
        root.setThemes([
          am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {})
            );
        
        // const data=[{
        //     country: "France",
        //     sales: 100000
        //   }, {
        //     country: "Spain",
        //     sales: 160000
        //   }, {
        //     country: "United Kingdom",
        //     sales: 80000
        //   }]

            const series = chart.series.push(
                am5percent.PieSeries.new(root, {
                  name: "Series",
                  categoryField: "country",
                  valueField: "sales"
                })
              );
            
              

              const colorSet = am5.ColorSet.new(root, {
                colors: colors.map((color)=>am5.color(color)),
              });
              series.set("colors", colorSet);
              series.labels.template.setAll({
                fontSize: 15,
                fill: am5.color("#000000"),
                text: "{category}"
              });
              if(!label){

                series.labels.template.set("forceHidden", true);
                                
              }
              series.data.setAll(pieData)
              if(legend){

                const legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    centerY:am5.percent(8),
                    x: am5.percent(50),
                    layout: root.horizontalLayout,
                    
                  }));
              legend.data.setAll(series.dataItems);
            }
            return () => {
                root.dispose();
                
              
      
             }
    },[pieData])
  return (
    <div className="flex justify-center items-center">
      <div ref={chartRef} style={{ width: "700px", height: "500px" }}></div>
    </div>
  )
}

export default PieChart
