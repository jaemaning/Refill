import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface ChartItemProps {
  result: number;
  title: string;
  colStart: string;
  colEnd: string;
  content?: string
}

const ChartItem: React.FC<ChartItemProps> = ({
  result,
  title,
  colStart,
  colEnd,
  content,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      series: [result],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString()).toString()+"%"; // Change this line
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    };

    if (chartRef.current) {
      // Add null check for TypeScript.
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    }
  }, [result]);

  return (
    <div className={`${colStart} ${colEnd} font-black text-white`}>
      <div className="mb-2">
        <p className="p-2 text-3xl">{title}</p>
      </div>
      <div className="w-full aspect-square bg-black rounded-lg">
        <div ref={chartRef}></div>
      </div>
            <p className="p-2">{content}</p>
      
    </div>
  );
};

export default ChartItem;
