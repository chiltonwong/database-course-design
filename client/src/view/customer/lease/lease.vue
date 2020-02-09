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
import { GetLeasedCustomerList } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '客户名字', key: 'Customer_name' },
        { title: '客户ID', key: 'Customer_id' },
        { title: '客户年龄', key: 'Customer_age' },
        { title: '客户电话', key: 'Customer_phone' }
      ],
      tableData: []
    }
  },
  methods: {
    handleChange (params) {
      params.row[params.column.key] = params.value
      console.log(params.row)
      GetLeasedCustomerList(params.row).then(res => {
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
    GetLeasedCustomerList().then(res => {
      this.tableData = res.data.tableData
    })
  }
}
</script>

<style>

</style>
