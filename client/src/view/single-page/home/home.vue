<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="近七日营收"/>
        </Card>
      </i-col>
    </Row>
    <Row>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartBar } from '_c/charts'
import { getHomeData } from '@/api/data'

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartBar
  },
  data () {
    return {
      inforCardData: [],
      barData: {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0
      }
    }
  },
  methods: {},
  mounted () {
    getHomeData().then(res => {
      for (var x in res.data.barData) {
        this.$set(this.barData, x, res.data.barData[x])
      }
      this.inforCardData = res.data.inforCardData
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
