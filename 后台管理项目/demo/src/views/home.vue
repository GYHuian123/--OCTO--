<template>
  <div>
    <div id="box"></div>
  </div>
</template>
<script>
//引入echarts
let echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    //组件已加载就渲染数据图表
    //初始化
    let myChart = echarts.init(document.getElementById("box"));
    //创建配置项
    let options = {
      title: {
        text: "不同月份流量展示",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "8%",
        left: "center",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "January(1月)" },
            { value: 580, name: "March(3月)" },
            { value: 430, name: "May(5月)" },
            { value: 200, name: "July(7月)" },
            { value: 400, name: "September(9月)" },
            { value: 680, name: "November(11月)" },
          ],
        },
      ],
    };
    //设置配置项
    myChart.setOption(options);
  },
};
</script>
<style lang="" scoped>
#box {
  width: 1000px;
  height: 550px;
}
</style>