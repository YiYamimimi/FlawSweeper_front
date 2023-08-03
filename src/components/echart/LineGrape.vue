<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>

export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
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
    /* 图表初始化 */
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
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["数学", "英语", "政治", "专业课"],
        },
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

