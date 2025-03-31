<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>总计销售额</span>
              <el-tag type="success">+25.32%</el-tag>
            </div>
          </template>
          <div class="card-value">1280</div>
          <div class="card-label">目标完成率</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>今日订单总量</span>
              <el-tag type="success">+24.7%</el-tag>
            </div>
          </template>
          <div class="card-value">720</div>
          <div class="card-label">今日订单总量</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>总体转化率</span>
              <el-tag type="success">+28.89%</el-tag>
            </div>
          </template>
          <div class="card-value">2000</div>
          <div class="card-label">总体转化率</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>今日访问人数</span>
              <el-tag type="danger">-38.2%</el-tag>
            </div>
          </template>
          <div class="card-value">93</div>
          <div class="card-label">今日访问人数</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>客户访问统计</span>
            </div>
          </template>
          <v-chart class="chart" :option="visitOption" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>人员流失率分析</span>
            </div>
          </template>
          <v-chart class="chart" :option="pieOption" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const visitOption = ref({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#eee',
    borderWidth: 1,
    textStyle: {
      color: '#666'
    }
  },
  legend: {
    data: ['本月访问', '上月访问'],
    icon: 'circle',
    textStyle: {
      color: '#666'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: {
      lineStyle: {
        color: '#eee'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: '#eee'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  series: [
    {
      name: '本月访问',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
      smooth: true,
      symbolSize: 8,
      itemStyle: {
        color: '#409EFF'
      },
      lineStyle: {
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(64, 158, 255, 0.2)'
          }, {
            offset: 1,
            color: 'rgba(64, 158, 255, 0)'
          }]
        }
      }
    },
    {
      name: '上月访问',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
      smooth: true,
      symbolSize: 8,
      itemStyle: {
        color: '#67C23A'
      },
      lineStyle: {
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(103, 194, 58, 0.2)'
          }, {
            offset: 1,
            color: 'rgba(103, 194, 58, 0)'
          }]
        }
      }
    }
  ]
})

const pieOption = ref({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#eee',
    borderWidth: 1,
    textStyle: {
      color: '#666'
    },
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    padding: [0, 30],
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#666'
    }
  },
  series: [
    {
      name: '流失率分析',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { 
          value: 78, 
          name: '正常客户',
          itemStyle: { color: '#67C23A' }
        },
        { 
          value: 27, 
          name: '待跟进客户',
          itemStyle: { color: '#E6A23C' }
        },
        { 
          value: 23, 
          name: '流失客户',
          itemStyle: { color: '#F56C6C' }
        }
      ]
    }
  ]
})
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f0f2f5;
}

.data-card {
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
}

.data-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header span {
  font-size: 16px;
  font-weight: 500;
  color: #1f2d3d;
}

.card-value {
  font-size: 28px;
  font-weight: 600;
  color: #1f2d3d;
  margin: 20px;
}

.card-label {
  color: #909399;
  font-size: 14px;
  margin: 0 20px 20px;
}

.chart-row {
  margin-top: 24px;
}

.chart-card {
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.chart {
  height: 350px;
  padding: 20px;
}
</style>