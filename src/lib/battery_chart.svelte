<script>

import { onMount } from 'svelte';
import * as echarts from 'echarts';

import { data } from './data.js'


let timestamps = {}


export let chargeState = [];


let option = {
    grid: {
  left: 40,
  top: 40,
  right: 5,
  bottom: 40
},
    title: {
        text: 'Battery charge state'
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
    boundaryGap: false,
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
        
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 100,
    splitNumber: 2,
    axisLabel: {
        formatter: '{value} %',
      }

  },
  series: [
    {
      data: chargeState,
      type: 'line',
    //   step: 'end',
    smooth: true,
      itemStyle: {
            color: '#15803d'
          },
      areaStyle: {
        color: '#35c759',
        opacity: 0.8
      },
      
    }
  ]
};



let chartInstance;

onMount(() => {
    chartInstance = echarts.init(document.getElementById('battery-chart'));
    chartInstance.setOption(option);

    window.addEventListener('resize', function () {
        chartInstance.resize();
    });
    
    return () => {
    chartInstance.dispose();
    };
});

$: if (chartInstance) {
    chartInstance.setOption({
      series: [{ data: chargeState }]
    });
  }


</script>

<div id="battery-chart" style="width: 100%; height:100%;"></div>