<script>
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';

	import { data } from './data.js';

	var base = -data.reduce(function (min, val) {
		return Math.floor(Math.min(min, val.fcr_n_price_lower));
	}, Infinity);

	export let option = {
		grid: {
			left: 40,
			top: 60,
			right: 8,
			bottom: 40
		},
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
			formatter: function (params) {
				let tooltipText = '';
				let spotPriceText = '';
				let fcrnText = '';

				// Define a function to get a circle marker with the series color
				const getMarker = (color) =>
					`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;

				// Then, construct the tooltip
				params.forEach(function (item) {
					if (item.seriesName === 'Spot Price') {
						spotPriceText = getMarker(item.color) + 'Spot Price: ' + item.data + '<br/>';
					}
					if (item.seriesName === 'FCR-N') {
						fcrnText = getMarker(item.color) + 'FCR-N: ' + item.data + '<br/>';
					}
				});

				// Concatenate the tooltip content
				tooltipText = spotPriceText + fcrnText;

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
					var hour = date.getHours();
					return hour.toString().padStart(2, '0');
				},
				interval: 0,
				rotate: 0,
				fontFamily: 'monospace'
			},
			boundaryGap: false
		},
		yAxis: {
			name: 'Euro MW/h',
			type: 'value',
			splitNumber: 6
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#e0e0e0', // Line color
				type: 'solid', // Line type: 'solid', 'dashed', 'dotted'
				width: 1, // Line width
				opacity: 0.8 // Line opacity
			}
		},
		series: [
			{
				name: 'FCR-N',
				type: 'line',
				smooth: true,
				data: data.map(function (item) {
					return ((item.fcr_n_price_upper + item.fcr_n_price_lower) / 2).toFixed(1);
				}),
				itemStyle: {
					color: '#a354e3'
				},

				showSymbol: false
			},

			{
				name: 'Spot Price',
				type: 'line',
				smooth: true,
				data: data.map(function (item) {
					return item.spot_price.toFixed(1);
				}),
				itemStyle: {
					color: '#44c6fd'
				},
				showSymbol: false
			}
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
