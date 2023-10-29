<template>
  <div>
    
    <div class="chart-show"><div class="chart-title">各类题目数量</div>
      <div class="chart-show-box">
        
        <BarGrapeVue :chartData="chartData.barChartData" />
      </div>

      <div class="chart-show-two">
        <div class="left-bottom">
          <div class="chart-title">各科错题数量</div>
          <PieChart :chartData="chartData.pieChartData"  style=" padding: 30px; padding-bottom: 1px; border-radius: 4px; box-shadow: 0px 0px 1px #494a4a36, 0px 0px 2px #23242474;"></PieChart>
        </div>
        <div class="right-bottom">
          <div class="chart-title">学习记录</div>
          <LineChart :chartData="chartData.lineChartData" style=" padding: 30px; padding-bottom: 1px; border-radius: 4px; box-shadow: 0px 0px 1px #494a4a36, 0px 0px 2px #23242474;"></LineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../echart/PieGrape.vue";
import LineChart from "../echart/LineGrape.vue";
import BarGrapeVue from "../echart/BarGrape.vue";
export default {
  components: {
    PieChart,
    LineChart,
    BarGrapeVue,
  },
  computed: {},
  data() {
    return {
      chartData: {
        barChartData: {
          //错题本，收藏夹，回收站的各自错题数量
          bardata: [],
        },
        pieChartData: {
          //4科每科的错题数量
          piedata: [],
        },
        lineChartData: {
          //近7天每天的4科各自的添加错题数
          days: [], //近7天的时间
          data1: [], //每科的7点每天错题数
          data2: [],
          data3: [],
          data4: [],
        },
      },
    };
  },

  methods: {
    // 计算前七天的日期
    getSevenDate() {
      var myDate = new Date(); // 获取今天日期
      myDate.setDate(myDate.getDate());
      var dateArray = [];
      var dateTemp;
      var flag = 1;
      for (var i = 0; i < 7; i++) {
        dateTemp = myDate.getMonth() + 1 + "-" + myDate.getDate();
        dateArray.push(dateTemp);
        myDate.setDate(myDate.getDate() - flag);
      }
      return dateArray;
    },
    getChartData(result) {
      console.log("result", result);
      //柱状图
      this.chartData.barChartData.bardata = result.barddata;
      //折线图
      [
        this.chartData.lineChartData.data1,
        this.chartData.lineChartData.data2,
        this.chartData.lineChartData.data3,
        this.chartData.lineChartData.data4,
      ] = result.linedata;
      this.chartData.lineChartData.days = this.getSevenDate();
      //饼图
      this.chartData.pieChartData.piedata = result.piedata; //[1,2,3,4]
    },
  },

  created() {
    this.$axios
      .get("/index")
      .then((result) => {
        // console.log("indexdata",result.data.data);
        this.getChartData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  mounted() {},
};
</script>

<style scoped>
/* .mainheart {
  width: 1380px;
  margin: 30px auto;
} */

.box-title {
  font-size: 24px;
  font-weight: 500;
  font-family: Ali_Italic_Font;
  margin-bottom: 38px;
}

/* .chart-show {
  display: flex;
  justify-content: space-around;
  align-items: center;
} */

.chart-show-box {
  margin-top: 9px;
  left: 132px;
  padding: 10px;
  /* width: 855px;
  height: 368px; */
  background: #ffffffff; /* white */
  border-radius: 4px; /* border-m */
  box-shadow: 0px 0px 1px #494a4a36, 0px 0px 2px #23242474;
}

.chart-show-two {
  /* position: relative; */
  /* width: 400px; */
  margin-top: 20px;
}
.left-bottom {
  /* position: absolute; */
  padding-top: 20px;
  /* left: 800px; */
  float: left;
  width: 452px;
  /* height: 224px;  */
  background: #ffffffff; /* white */
 
}
.border{
  border-radius: 4px !important; /* border-m */
  box-shadow: 0px 0px 1px #171a1f, 0px 0px 2px #171a1f !important;
}
.right-bottom {
  /* position: absolute; */
  /* top: 600px; */
  padding: 20px;
  /* left: 800px; */
  float: right;
  width: 522px;
  /* height: 344px;  */
  background: #ffffffff; /* white */
 
}
.chart-title1{
  font-size: 18px;
  font-weight: bold;
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
 
}

.vertical-divider {
  height: 700px;
}
</style>