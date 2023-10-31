<template>
  <div style="height:290px;width:100% " />
</template>

<script>
export default {
  props: {
    // className: {
    //   type: String,
    //   default: "chart",
    // },
    // width: {
    //   type: String,
    //   default: "100%",
    // },
    // height: {
    //   type: String,
    //   default: "350px",
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
        console.log("val",val);

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
    setOptions({ bardata } = {}) {
      console.log("bardata",bardata);
      this.chart.setOption({
        title: {},
        tooltip: {},
        legend: {
          data: ["错题本", "收藏夹", "回收站"],
        },
        xAxis: {
         name: "错题数",
        },
        yAxis: {
          data: ["错题本", "收藏夹", "回收站"],
        },
        series: [
          {
            name: "错题数",
            type: "bar",
            data: bardata,
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  var colorList = ["#61a0a8", "#ff7070", "#2f4554"];
                  // console.log("params.dataIndex:",params.dataIndex);
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>

