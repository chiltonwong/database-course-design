import axios from '@/libs/api.request'

export const getCarData = () => {
  return axios.request({
    url: 'GetCarList',
    method: 'get'
  })
}

export const changeCarData = tableData => {
  return axios.request({
    url: 'ChangeCarList',
    data: tableData,
    method: 'post'
  })
}

export const getDriverData = () => {
  return axios.request({
    url: 'GetDriverList',
    method: 'get'
  })
}

export const changeDriverData = tableData => {
  return axios.request({
    url: 'ChangeDriverList',
    data: tableData,
    method: 'post'
  })
}

export const getCustomerData = () => {
  return axios.request({
    url: 'GetCustomerList',
    method: 'get'
  })
}

export const changeCustomerData = tableData => {
  return axios.request({
    url: 'ChangeCustomerList',
    data: tableData,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const getLeaseData = () => {
  return axios.request({
    url: 'GetLeaseList',
    method: 'get'
  })
}

export const changeLeaseData = tableData => {
  return axios.request({
    url: 'ChangeLeaseList',
    data: tableData,
    method: 'post'
  })
}

export const renewLeaseOpt = tableData => {
  return axios.request({
    url: 'renewLease',
    data: tableData,
    method: 'post'
  })
}

export const endLeaseCalc = Lease_id => {
  return axios.request({
    url: 'EndLeaseCalc',
    data: Lease_id,
    method: 'post'
  })
}

export const getHomeData = () => {
  return axios.request({
    url: 'GetHomeList',
    method: 'get'
  })
}

export const getDelayData = () => {
  return axios.request({
    url: 'GetDelayList',
    method: 'get'
  })
}

export const getBookData = () => {
  return axios.request({
    url: 'GetBookList',
    method: 'get'
  })
}

export const changeBookData = tableData => {
  return axios.request({
    url: 'ChangeBookList',
    data: tableData,
    method: 'post'
  })
}

export const leaseRental = tableData => {
  return axios.request({
    url: 'LeaseRental',
    data: tableData,
    method: 'post'
  })
}

export const GetBookedCustomerList = () => {
  return axios.request({
    url: 'GetBookedCustomerList',
    method: 'get'
  })
}

export const GetLeasedCustomerList = () => {
  return axios.request({
    url: 'GetLeasedCustomerList',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
