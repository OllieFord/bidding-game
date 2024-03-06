<script>

    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    import { data } from './data.js'



    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.lower));
    }, Infinity);


    export let option = {
    title: {
        text: 'Market Price Forecasts'
    },
    legend: {
    data: ['FCRD Price']
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
        // formatter: function (params) {
        //   return (
        //     params[2].name +
        //     '<br />' +
        //     ((params[2].value - base) * 100).toFixed(1) +
        //     '%'
        //   );
        // }
      },
    xAxis: {
        type: 'category',
        axisLine: { onZero: true },
        data: data.map(function (item) {
          return item.utc_timestamp;
        }),
        axisLabel: {
          formatter: function (value, idx) {
            var date = new Date(value);
            return idx === 0
              ? value
              : [date.getMonth() + 1, date.getDate(), date.getHours() + ":00"].join('-');
          }
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
          name: 'Lower Bound',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.lower;
          }),
          lineStyle: {
            opacity: 0
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        {
          name: 'Upper Bound',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.upper;
          }),
          lineStyle: {
            opacity: 0
          },
          areaStyle: {
            color: '#ccc'
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        {
            name: 'FCRD Price',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item.value;
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
