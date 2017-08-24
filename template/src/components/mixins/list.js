import cmTableColumn from '@/components/customization/cm-table-column-template.vue'
import BtnChangeStatus from '@/components/btn-changeStatus.vue'
import BtnDelete from '@/components/btn-delete.vue'

export default {
  name: 'mixins-list',
  components: {
    'btn-changeStatus': BtnChangeStatus,
    'btn-delete': BtnDelete,
    'cm-table-column-template': cmTableColumn
  },
  data() {
    return {
      cancel_getList: this.$http.CancelToken.source(), //定义一个用于abort掉getList的cancelToken
      loading_list: false, //加载tableData
      loading_msgbox: false, //判断弹出框$msgbox是否可以关闭，true为操作中不可以关闭
      page: parseInt(this.$route.query.page) || 1, //当前页
      total: 0, //总页数
      tableData: [], //table源数据
      tableColumn: [], //列表项
      popover_column: false, //列表项的show
      columnSelection: [], //列表项选项
      multipleSelection: [], //选择行
      search: {
        keyword: '' //关键字
      },

      //新建和编辑弹出dialog的list.vue用到的属性
      dialogFormVisible: false,
      dialogFormVisible: false,
      dialogFormType: 'add', //add为新建，edit为编辑
      dialogFormId: null, //传给dialog的id，为编辑所用
    }
  },
  computed: {
    listRows() {
      return this.$store.state.listRows
    },
    api() {
      return ''
    },
    getListApi() {
      return this.api
    },
    super_user() {
      //  超管权限
      return this.$store.getters.super_user
    }
  },
  watch: {
    $route(val, oldVal) {
      if (val.query.page !== oldVal.query.page) {
        console.log("page watch:", val.query.page, oldVal.query.page)
        this.page = parseInt(val.query.page);
        this.getList();
      }
    },
    loading_list(val) {
      if (val === false) {
        this.$nextTick(() => {
          // 自动对焦到搜索框，$el下的children[1]才是对应原生input标签
          let input_dom = this.$refs['searchInput'].$el.children[1];
          if (input_dom.tagName == 'INPUT') {
            input_dom.focus();
          }
        })

      }
    },
  },
  created() {
    this.getList();
    this.columnSelection = this.initColumnSelection(this.tableColumn);
  },
  methods: {
    handleCurrentChange(page) {
      console.log("current-page:", page, this.page)
      this.$router.push({
        query: {
          page: page
        }
      })
    },
    initColumnSelection(tableColumn) {
      // 初始化列表项选项
      let array = [];
      for (let item of tableColumn.values()) {
        array.push({
          prop: item.prop,
          label: item.label,
          show: true
        })
      }
      return array
    },
    getList() {
      // console.log(this.cancel_getList)
      // abort 掉当前get请求
      this.cancel_getList.cancel('cancelToken abort');
      // 重新申请一个cancelToken来abort掉请求
      this.cancel_getList = this.$http.CancelToken.source();
      if (!this.loading_list) {
        this.loading_list = true;
        let params = {
          p: this.page,
          listRows: this.listRows
        };
        for (let [key, value] of Object.entries(this.search)) {
          if (typeof value === 'string') {
            params[key] = value
          } else {
            if (value instanceof Array && value.length) {
              params[key] = value[value.length - 1]
            }
          }
        }
        console.log(params)
        this.$http.get(this.getListApi, {
          params: params,
          cancelToken: this.cancel_getList.token
        }).then(response => {
          this.total = parseInt(response.headers['x-count']) || 0;
          if (response.data instanceof Array && response.data.length) {
            this.tableData = response.data;
            if (this.originTableData) {
              // 服务器源数据，缓存服务器的树形数据，节点管理有用
              this.originTableData = response.data
            }
          } else {
            console.log("has no tableData")
            this.tableData = [];
          }
          console.log("x-count:", response.headers['x-count']);
        }).catch(error => {
          console.log("getList error @@@@@@@@@@@@@!!!", error)
        }).then(() => {
          console.log("getList error then loading list false")
          this.loading_list = false;
        })
      }
    },
    handleSearch() {
      console.log("handleSearch")
      console.log(this.search)
      let flag = false;

      // 搜索条件不为空时
      // for (let item of Object.values(this.search)) {
      //   if (item !== null && item) {
      //     flag = true;
      //     break;
      //   }
      // }

      flag = true; //忽略搜索条件


      if (flag) {
        this.reloadList();
      } else {
        this.$message({
          message: '请输入搜索的内容'
        })
      }
    },
    reloadList() {
      //重新加载list，回到第一页
      if (this.page === 1) {
        this.getList();
      } else {
        this.$router.push({
          query: {
            page: 1
          }
        })
      }
    },
    handleSelectionChange(val) {
      // 选择列表
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    throughDelete(_id) {
      //  根据id遍历数组删除，在btnHandleDelete中用到
      for (let [index, value] of this.tableData.entries()) {
        if (value.id === _id) {
          this.tableData.splice(index, 1);
          this.total--;
          return;
        }
      }
      // console.log("删除后如果数据表为空，则重新拉一次数据",this.tableData)
      // if (this.tableData.length === 0) {
      //   // 删除后如果数据表为空，则重新拉一次数据
      //   this.getList();
      // }
    },
    btnHandleAdd() {
      this.$router.push('add');
    },
    btnHandleDelete() {
      if (this.multipleSelection.length) {
        this.$msgbox({
          title: '提示',
          message: '此操作将永久删除这些数据, 是否继续?',
          confirmButtonText: '确定',
          showCancelButton: true,
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            console.log(action, instance)
            if (action === 'confirm') {
              this.loading_msgbox = true; //执行确定操作，禁止取消
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              let id_array = [];
              for (let item of this.multipleSelection) {
                id_array.push(item.id)
              }
              let id_list = id_array.join(',');
              console.log(id_list)
              let api = `${this.api}/${id_list}`;
              this.$http.delete(api).then(response => {
                for (let id of id_array) {
                  // 根据id遍历tableData删除相应数据
                  this.throughDelete(id)
                }
                this.$notify({
                  title: '提示',
                  message: '删除成功',
                  type: 'success'
                });
                if (this.tableData.length === 0) {
                  // 删除后如果数据表为空，则重新拉一次数据
                  // this.getList();
                  if (this.page === 1) {
                    this.getList();
                  } else {
                    this.$router.push({
                      query: {
                        page: this.page--
                      }
                    })
                  }
                }
                done();
              }).catch(error => {
                // this.$notify({
                //   title: '提示',
                //   message: '删除操作失败',
                //   type: 'error'
                // });
              }).then(() => {
                instance.confirmButtonLoading = false;
                this.loading_msgbox = false;
              })
            } else {
              if (this.loading_msgbox) {
                this.$message('操作中，请稍等');
              } else {
                done();
              }
            }
          }
        })
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        });
      }
    },
    btnHandleChangeStatus(changeStatus, msg_message) {
      if (this.multipleSelection.length && !isNaN(changeStatus)) {
        let id_array = [];
        for (let item of this.multipleSelection) {
          // 过滤掉status不需要改变的数据
          if (item.status == changeStatus) {
            continue;
          }
          // 
          id_array.push(item.id)
        }
        if (id_array.length === 0) {
          this.$message({
            message: '选择的数据状态不需要变化',
            type: 'warning'
          });
          return;
        }
        let id_list = id_array.join(',');
        console.log(id_list)

        this.$msgbox({
          title: '提示',
          message: msg_message || '此操作将更改这些数据的状态, 是否继续?',
          confirmButtonText: '确定',
          showCancelButton: true,
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            console.log(action, instance)
            if (action === 'confirm') {
              this.loading_msgbox = true; //执行确定操作，禁止取消
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              let api = `${this.api}/${id_list}`;
              this.$http.put(api, {
                status: changeStatus
              }).then(response => {
                for (let id of id_array) {
                  // 根据id遍历tableData更改相应数据
                  for (let [index, value] of this.tableData.entries()) {
                    if (value.id === id) {
                      value.status = changeStatus;
                      break;
                    }
                  }
                }

                this.$notify({
                  title: '提示',
                  message: '操作成功',
                  type: 'success'
                });
                done();
              }).catch(error => {
                // this.$notify({
                //   title: '提示',
                //   message: '操作失败',
                //   type: 'error'
                // });
              }).then(() => {
                instance.confirmButtonLoading = false;
                this.loading_msgbox = false;
              })
            } else {
              if (this.loading_msgbox) {
                this.$message('操作中，请稍等');
              } else {
                done();
              }
            }
          }
        })
      } else {
        this.$message({
          message: '请选择需要更改状态的数据',
          type: 'warning'
        });
      }
    },
    handleSortChange(row) {
      // 排序
      console.log("handleSortChange", row.sort)
      let api = `${this.api}/${row.id}`;
      this.$http.put(api, {
        sort: row.sort
      }).then(response => {
        this.$notify({
          title: '修改排序成功',
          message: row.title,
          type: 'success'
        });
      })
    },
    handleChangeStatus(payload) {
      let index = payload.index;
      let detail = payload.detail;
      let changeStatus = payload.changeStatus;
      console.log("handleChangeStatus:", index, detail, changeStatus)
      // 更改该条数据的状态
      this.tableData.splice(index, 1, Object.assign({}, detail, {
        status: changeStatus
      }))
    },
    handleEdit(index, row) {
      console.log("handleEdit:", index, row)
      this.$router.push('edit')
    },
    handleDelete(payload) {
      let index = payload.index;
      let detail = payload.detail;
      console.log("handleDelete:", index, detail)

      // 删除该条数据
      this.tableData.splice(index, 1)
      this.total--;
      if (this.tableData.length === 0) {
        // 删除后如果数据表为空，则重新拉一次数据
        // this.getList();
        if (this.page === 1) {
          this.getList();
        } else {
          this.$router.push({
            query: {
              page: this.page--
            }
          })
        }
      }
    },

    //新建和编辑弹出dialog的list.vue所用的方法
    dialogFormHide(action) {
      this.dialogFormVisible = false;
      if (action === 'refresh') {
        this.reloadList();
      }
    },
  }
}