<template>
  <div style="height: 290px;width: 100% " />
</template>

<script>

export default {
  props: {
    
    // width: {
    //   type: String,
    //   default: "100%",
    // },
    // height: {
    //   type: String,
    //   default: "400px",
    // },
    // 父组件传递过来的图表数据
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Echarts实例
      chart: null,
    };
  },
  watch: {
    /* 如果图表数据是后台获取的，监听父组件中的数据变化，重新触发Echarts */
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    // /* 图表初始化 */
    /*使用 $nextTick 是因为在 Vue 的响应式系统中，
    更新数据可能不会立即反映在 DOM 上，而是在下一个 DOM 更新循环中进行。
    因此，如果你希望在数据更新后执行一些与 DOM 相关的操作，
    最好将这些操作放在 $nextTick 的回调函数中，以确保在更新循环结束后执行*/
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    /* 释放图表实例 */
    this.chart.dispose();
    /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$el);
      this.setOptions(this.chartData);
      window.addEventListener("resize", () => {
        if (this.chart) {
          this.chart.resize();
        }
      });
    },
    setOptions({ days, data1, data2, data3, data4 } = {}) {
      // console.log(days);
      this.chart.setOption({
        title: {},
        tooltip: {},
        legend: {},
        xAxis: {
          type: "category",
          name: "日期",
          boundaryGap: false,
          data: days,
        },
        yAxis: [
          {
            type: "value",
            name: "题目数",
          },
        ],
        series: [
          {
            name: "数学",
            type: "line",
            data: data1
          },
          {
            name: "英语",
            type: "line",
            data: data2
          },
          {
            name: "政治",
            type: "line",
            data: data3
          },
          {
            name: "专业课",
            type: "line",
            data: data4
          },
        ],
      });
    },
  },
};
</script>

