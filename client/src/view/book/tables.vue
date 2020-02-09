<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-save-edit="handleChange"/>
      <Button style="margin: 10px 5px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getBookData, changeBookData } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '订单ID', key: 'Book_id' },
        { title: '客户ID', key: 'Customer_id' },
        { title: '车牌号', key: 'Car_number' },
        { title: '预约状态', key: 'Lift_car' },
        { title: '提车时间', key: 'Pick_time', editable: true },
        { title: '司机', key: 'Flag', editable: true }
      ],
      tableData: []
    }
  },
  methods: {
    handleChange (params) {
      params.row[params.column.key] = params.value
      console.log(params.row)
      changeBookData(params.row).then(res => {
        this.tableData = res.data.tableData
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getBookData().then(res => {
      this.tableData = res.data.tableData
    })
  }
}
</script>

<style>

</style>
