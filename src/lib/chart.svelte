<script>

    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    import { data } from './data.js'


    export let option = {
    title: {
        text: 'Market Price Forecasts'
    },
    legend: {
    data: ['Spot Price', 'FCR-N']
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
      },
    xAxis: {
        type: 'category',
        axisLine: { onZero: true },
        data: data.map(function (item) {
          return item.timestamp;
        }),
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
          name: 'FCR-N',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.fcr_n_price_upper;
          }),
          itemStyle: {
            color: '#fb923c'
          },
          
          lineStyle: {
            opacity: 0,
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        {
          name: 'FCR-N',
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
          areaStyle: {
            color: '#fb923c'
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
