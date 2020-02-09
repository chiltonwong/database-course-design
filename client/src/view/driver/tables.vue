<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-save-edit="handleChange"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getDriverData, changeDriverData } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '身份证', key: 'Driver_id' },
        { title: '姓名', key: 'Driver_name' },
        { title: '年龄', key: 'Driver_age' },
        { title: '电话', key: 'Driver_phone' },
        { title: '状态', key: 'Driver_flag' }
      ],
      tableData: []
    }
  },
  methods: {
    handleChange (params) {
      params.row[params.column.key]=params.value
      console.log(params.row)
      changeDriverData(params.row).then(res => {
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
    getDriverData().then(res => {
      this.tableData = res.data.tableData
    })
  }
}
</script>

<style>

</style>
