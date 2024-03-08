<script>

import { onMount } from 'svelte';
import * as echarts from 'echarts';

import { data } from './data.js'


var base = -data.reduce(function (min, val) {
    return Math.floor(Math.min(min, val.fcr_n_price_lower));
  }, Infinity);


    export let option = {
        grid: {
  left: 40,
  top: 60,
  right: 5,
  bottom: 40
},
    title: {
        text: 'Market Price Forecasts'
    },
    legend: {
    data: ['Spot Price', 'FCR-N Upper', "FCR-N Lower"]
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#ccc',
            borderColor: '#aaa',
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            color: '#222'
          }
        },
        formatter: function (params) {
            let tooltipText = '';
            let spotPriceText = '';
            let fcrnUpperText = '';
            let fcrnLowerText = '';
            let fcrnLowerValue = 0; // Variable to store the 'FCR-N Lower' value for calculation

            // Define a function to get a circle marker with the series color
            const getMarker = (color) => `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;

            // First, find and store the 'FCR-N Lower' value if it exists in the current hover state
            params.forEach(function (item) {
                if (item.seriesName === 'FCR-N Lower') {
                    fcrnLowerValue = item.data;
                    fcrnLowerText = getMarker(item.color) + 'FCR-N Lower: ' + item.data + '<br/>';
                }
            });

            // Then, construct the tooltip text while adjusting the 'FCR-N Upper' value as needed
            params.forEach(function (item) {
                if (item.seriesName === 'Spot Price') {
                    spotPriceText = getMarker(item.color) + 'Spot Price: ' + item.data + '<br/>';
                } else if (item.seriesName === 'FCR-N Upper') {
                    // Add the 'FCR-N Lower' value to the 'FCR-N Upper' value for display
                    let adjustedUpperValue = item.data + fcrnLowerValue;
                    fcrnUpperText = getMarker(item.color) + 'FCR-N Upper: ' + adjustedUpperValue + '<br/>';
                }
            });

            // Concatenate the tooltip content
            tooltipText = spotPriceText + fcrnUpperText + fcrnLowerText;

            return tooltipText;
        }
      },
    xAxis: {
        type: 'category',
        axisLine: { onZero: true },
        data: data.map(function (item) {
          return item.timestamp;
        }),
        snap: true,
        axisLabel: {
          formatter: function (value, idx) {
            var date = new Date(value);
            return [date.getHours() + ":00"].join('-');
          }, 
          "interval": 0,
          "rotate": 45
        },
        boundaryGap: false
      },
    yAxis: {
        name: "Euro MW/h",
        type: 'value',
        splitNumber: 3
      },
    series: [
        {
          name: 'FCR-N Lower',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.fcr_n_price_lower;
          }),
          itemStyle: {
            color: '#fb923c'
          },
          lineStyle: {
            opacity: 0,
            
          },
        //   areaStyle: {
        //     color: '#fb923c'
        //   },
          stack: 'confidence-band',
          symbol: 'none'
        },
        {
          name: 'FCR-N Upper',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.fcr_n_price_upper -item.fcr_n_price_lower ;
          }),
          itemStyle: {
            color: '#fb923c'
          },
          areaStyle: {
            color: '#fb923c'
          },
          
          lineStyle: {
            opacity: 0,
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        
        {
            name: 'Spot Price',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.spot_price;
          }),
          markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {
                formatter: function(params) {
                    // params.value might be an array or a single value depending on the series type
                    let value = Array.isArray(params.value) ? params.value[1] : params.value;
                    return `${value.toFixed(2)}`;
                }
            } },
          { type: 'min', name: 'Min', label: {
                formatter: function(params) {
                    // params.value might be an array or a single value depending on the series type
                    let value = Array.isArray(params.value) ? params.value[1] : params.value;
                    return `${value.toFixed(2)}`;
                }
            }}
          
        ]
          },
          markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      },
          itemStyle: {
            color: '#333'
          },
          showSymbol: false
        },
      ]
        
    };

    let chartInstance;

    onMount(() => {
        chartInstance = echarts.init(document.getElementById('chart'));
        chartInstance.setOption(option);

        window.addEventListener('resize', function () {
            chartInstance.resize();
        });
        
        return () => {
        chartInstance.dispose();
        };

        
    });


</script>

<div id="chart" style="width: 100%; height:100%;"></div>
