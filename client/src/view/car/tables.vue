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
import { getCarData, changeCarData } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '车牌号', key: 'Car_number' },
        { title: '车型', key: 'Car_model' },
        { title: '出厂日期', key: 'Car_date' },
        { title: '车种', key: 'Car_type' },
        { title: '每日租金/元', key: 'Car_price', editable: true },
        { title: '订金/元', key: 'Earnest_money', editable: true },
        { title: '押金/元', key: 'Car_deposit', editable: true },
        { title: '车辆状态', key: 'Car_flag', editable: true, sortable: true }
      ],
      tableData: []
    }
  },
  methods: {
    handleChange (params) {
      params.row[params.column.key]=params.value
      console.log(params.row)
      changeCarData(params.row).then(res => {
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
    getCarData().then(res => {
      this.tableData = res.data.tableData
    })
  }
}
</script>

<style>

</style>
