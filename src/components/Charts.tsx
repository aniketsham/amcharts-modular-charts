import { useLayoutEffect, useRef, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { User } from "@/lib/data";
export type DataItem = {
  category: string;
  [key: string]: string | number;
};

export type pieDataType = {
  country: string;
  sales: number;
};

type ChartsProp = {
  type: "bar" | "pie" | "donut";
  newdata: DataItem[] | pieDataType[] | User[];
  color: string[];
  rounded?: boolean;
  cursor?: boolean;
  legend?: boolean;
  label?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  seriesConfig?: { key: string; name: string }[];
  categoryXField?:string
  gridlines?: boolean;
  legendConfig?: LegendConfig;
  tooltipConfig?: TooltipConfig;
};

export type TooltipConfig = {
  label: string;
  backgroundColor?: string;
  fontColor?: string;
};

type LegendConfig = {
  fontSize?: number;
  legendText?: string  // Font size of the legend text
};

const MyChart = ({
  type,
  newdata,
  color,
  rounded = false,
  cursor = false,
  legend,
  xAxisLabel,
  label,
  categoryXField,
  yAxisLabel,
  seriesConfig = [
    { key: "value1", name: "Series 1" },
    //{ key: "value2", name: "Series 2" },
  ],

  gridlines = true,
  legendConfig = { fontSize: 16 },
  tooltipConfig = { label: "<h2>{category}: {valueY}</h2>" },
}: ChartsProp) => {
  const chartRef = useRef(null);
  const seriesRefs = useRef<am5xy.ColumnSeries[]>([]);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    
    if (type === "bar") {
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout,
        })
      );
    
      // Create Y-Axis
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            visible: gridlines,
          }),
        })
      );

      if (yAxisLabel) {
        yAxis.children.unshift(
          am5.Label.new(root, {
            text: yAxisLabel,
            rotation: -90,
            y: am5.percent(50),
            centerX: am5.p50,
            centerY: am5.p50,
          })
        );
      }

      // Create X-Axis
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            visible: gridlines,
            minGridDistance: 30,
          }),
          categoryField: categoryXField as string

        })
      );
      xAxis.data.setAll(newdata);

      if (xAxisLabel) {
        xAxis.children.unshift(
          am5.Label.new(root, {
            text: xAxisLabel,
            x:am5.percent(-10),
            y: am5.percent(70),
            centerX: am5.p50,
            centerY: am5.p50,
          })
        );
      }

      // Create series dynamically based on the seriesConfig prop
      const seriesInstances = seriesConfig.map((config, index) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: config.name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: config.key,
            categoryXField: categoryXField as string
          })
        );

        series.data.setAll(newdata);
        series.set("fill", am5.color(color[index % color.length]));
        series.set(
          "tooltip",
          am5.Tooltip.new(root, {
            labelHTML: tooltipConfig.label,
            autoTextColor: true,
            pointerOrientation: "down",
          })
        );

        if (rounded) {
          series.columns.template.setAll({
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
          });
        }

        return series;
      });

      seriesRefs.current = seriesInstances;

      // Add cursor
      if (cursor) {
        chart.set(
          "cursor",
          am5xy.XYCursor.new(root, {
            behavior: "zoomX",
          })
        );
      }

      if(legend){

        const legend=chart.children.push(
              am5.Legend.new(root, {
                layout: root.horizontalLayout,
                centerX: am5.percent(50),
                x: am5.percent(50),
                paddingTop: 10,
               
              })
            );
            if (legendConfig.fontSize) {
                  legend.labels.template.setAll({
                  
                    fontSize: legendConfig.fontSize,
                  });
                }
                

        
          legend.data.setAll(seriesInstances)
      }

    
    } else if (type === "pie" || type === "donut") {
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {})
      );

      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          categoryField: "country",
          valueField: "sales",
          innerRadius: type === "donut" ? am5.percent(50) : 0,
        })
      );

      const colorSet = am5.ColorSet.new(root, {
        colors: color.map((color) => am5.color(color)),
      });
      series.set("colors", colorSet);
      series.labels.template.setAll({
        fontSize: 15,
        fill: am5.color("#000000"),
        text: "{category}",
      });
      if (!label) {
        series.labels.template.set("forceHidden", true);
      }
      series.data.setAll(newdata);

      series.set(
        "tooltip",
        am5.Tooltip.new(root, {
          labelHTML: tooltipConfig.label,
          autoTextColor: true,
          pointerOrientation: "down",
        })
      );

      if (legend) {
        const legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.percent(50),
            centerY: am5.percent(8),
            x: am5.percent(50),
            layout: root.horizontalLayout,
          })
        );
        legend.data.setAll(series.dataItems);
      }
    }

    return () => {
      root.dispose();
    };
  }, [type, newdata, color, legend, legendConfig, tooltipConfig]);

  useEffect(() => {
    const seriesInstances = seriesRefs.current;

    // Update data in all series
    seriesInstances.forEach((series) => {
      series.data.setAll(newdata);
    });
  }, [newdata]);

  return (
    <div>
      <div
        ref={chartRef}
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
};

export default MyChart;
