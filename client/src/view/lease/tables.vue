<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-save-edit="handleChange"/>
          <tree-select
            v-model="treeSelected"
            style="width: 300px;"
            check-strictly
            :expand-all="true"
            :data="treeData"
          ></tree-select>
          <Button style="margin: 10px 5px;" type="primary" @click="endLease">选定订单结算</Button>
          <br>
          <tree-select
            v-model="treeSelected2"
            style="width: 150px;"
            check-strictly
            :expand-all="true"
            :data="treeData2"
          ></tree-select>
          <DatePicker @on-change="getDate" type="date" placeholder="续约日期" style="width: 150px"></DatePicker>
          <Button style="margin: 10px 5px;" type="primary" @click="renewLease">选定订单续约</Button>
          <br>
          <DatePicker @on-change="getDate2" type="date" placeholder="开始日期" style="width: 150px"></DatePicker>
          <DatePicker @on-change="getDate3" type="date" placeholder="结束日期(留空单日租金)" style="width: 150px"></DatePicker>
          <Button style="margin: 10px 5px;" type="primary" @click="handleLeaseRental">租金统计</Button>
          <br>
          <Button style="margin: 10px 5px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getLeaseData, changeLeaseData, endLeaseCalc, renewLeaseOpt, leaseRental } from '@/api/data'
import TreeSelect from '_c/tree-select'
import { Notice } from 'iview'

export default {
  name: 'tables_page',
  components: {
    Tables, TreeSelect, Notice
  },
  data () {
    return {
      treeSelected: [112, 113],
      treeSelected2: [112, 113],
      treeData: [],
      treeData2: [],
      changeDate: [],
      changeDate2: [],
      changeDate3: [],
      columns: [
        { title: '订单ID', key: 'Lease_id' },
        { title: '客户ID', key: 'Customer_id' },
        { title: '车辆号', key: 'Car_number' },
        { title: '订单开始时间', key: 'Start_time' },
        { title: '订单结束时间', key: 'End_time', editable: true },
        { title: '订单状态', key: 'Return_car', editable: true },
        { title: '是否聘请司机', key: 'Flag', editable: true },
        { title: '总租金', key: 'Rental' }
      ],
      tableData: []
    }
  },
  methods: {
    getDate (event) {
      this.changeDate = event
    },
    getDate2 (event) {
      this.changeDate2 = event
    },
    getDate3 (event) {
      this.changeDate3 = event
    },
    handleLeaseRental () {
      if (typeof this.changeDate3 != 'string' ) {
        var postItem1 = {
          'startDate': this.changeDate2,
          'flag': 1
        }
        leaseRental(postItem1).then(res => {
          console.log(res)
          Notice.info({
            title: '查询成功',
            desc: '租金为' + res.data.tableData + '元'
          })
        })
      } else {
        var postItem2 = {
          'startDate': this.changeDate2,
          'endDate': this.changeDate3,
          'flag': 2
        }
        console.log(postItem2)
        leaseRental(postItem2).then(res => {
          console.log(res)
          Notice.info({
            title: '查询成功',
            desc: '租金为' + res.data.tableData + '元'
          })
        })
      }
    },
    renewLease () {
      for (var i = 0; i < this.treeSelected2.length; i++) {
        var postItem = {
          'date': this.changeDate,
          'id': this.treeSelected2[i]
        }
        renewLeaseOpt(postItem).then(res => {
          this.tableData = res.data.tableData
          Notice.open({
            title: '提示',
            desc: '续约成功，表格数据已改变'
          })
        })
      }
    },
    endLease () {
      for (var i = 0; i < this.treeSelected.length; i++) {
        var postItem = {
          'id': this.treeSelected[i]
        }
        endLeaseCalc(postItem).then(res => {
          this.tableData = res.data.tableData
          Notice.open({
            title: '提示',
            desc: '还车结算成功，表格数据已改变'
          })
        })
      }
    },
    handleChange (params) {
      params.row[params.column.key] = params.value
      console.log(params.row)
      changeLeaseData(params.row).then(res => {
        this.tableData = res.data.tableData
        var treeData = []

        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].Return_car === '未还车') {
            treeData[treeData.length] = {
              'id': this.tableData[i].Lease_id,
              'title': '订单ID：' + this.tableData[i].Lease_id,
              'children': []
            }
          }
        }
        this.treeData = treeData
        this.treeData2 = treeData
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getLeaseData().then(res => {
      this.tableData = res.data.tableData
      var treeData = []
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].Return_car === '未还车') {
          treeData[treeData.length] = {
            'id': this.tableData[i].Lease_id,
            'title': '订单ID：' + this.tableData[i].Lease_id,
            'children': []
          }
          this.treeData = treeData
          this.treeData2 = this.treeData
        }
      }
    })
  }
}
</script>

<style>

</style>
