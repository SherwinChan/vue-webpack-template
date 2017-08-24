// 给option.vue用

export default {
  name: 'option',
  props: {
    visible: {
      //  是否显示dialog
      required: true,
      type: 　Boolean,
      default: false
    },
    api: {
      required: true,
      type: String,
      default: ''
    },
    type: {
      // dialog是add还是edit
      type: String,
      default: 'edit',
    },
    id: {
      // 编辑的id
      default: null
    }
  },
  data() {
    return {
      loading_detail: true, //getDetail进行中不允许操作
      loading_submit: false, //submit进行中不允许隐藏dialog
      // visibleShow: true,  //控制dialog的show和hide，目前由父组件props控制
      dialogMaxWidth: '400px', //控制dialog的最大宽度
      labelPosition: 'right', //控制控件的位置
      labelWidth: '100px', // 控制控件名字的宽度
      form: {}, //表单，由initForm生成
      rules: {}, //表单的验证，由initForm生成
      formColumn: [
        // 数据字典说明
        //   {
        //   required: true, //是否必须
        //   type: 'string', //输入值的验证，
        //   inputType: 'default', //input的类型
        //   prop: 'name', //控件属性名
        //   label: '名称 (英)', //控件名字
        //   rules_message: '请输入纯英文字符的分组名称', //验证错误提示
        //   validator: validateEnglish // 自定义验证
        // }, {
        //   required: true,
        //   type: 'number',
        //   inputType: 'radio',
        //   prop: 'status',
        //   label: '状态',
        //   default_value: 0, //默认值
        //   rules_message: '请选择状态',
        //   radio_list: [{
        //     label: 1,
        //     title: '启用'
        //   }, {
        //     label: 0,
        //     title: '禁用'
        //   }] //radio_list列表
        // }
      ]
    }
  },
  computed: {
    title() {
      // dialog的标题
      return this.type === 'edit' ? '编辑' : '新建'
    }
  },
  watch: {
    visible(val) {
      // 每次打开前更新编辑的信息
      if (val === true) {
        if (this.type === 'edit') {
          this.getDetail();
        }
      }
    },
  },
  created() {
    this.initForm(); //初始化表单
    if (this.type === 'edit' && this.id !== null) {
      this.getDetail()
    } else {
      this.loading_detail = false
    }
  },
  methods: {
    resetForm() {
      // 重置表单
      this.$refs['form'].resetFields();
    },
    initForm() {
      let rules = {}; //验证rules
      let form = {}; //初始化form表单的数据
      for (let item of this.formColumn.values()) {
        let array = [];
        if (item.prop === 'cover') {
          array.push({
            required: item.required || false,
            validator: item.validator,
            trigger: item.trigger || 'blur',
          })
          // continue;
        } else {
          array.push({
            required: item.required || false,
            type: item.type || 'string',
            message: item.rules_message || '',
            trigger: item.trigger || 'blur',
          })
          if (item.validator) {
            array.push({
              validator: item.validator,
              trigger: 'blur'
            })
          }
        }
        // array.push({
        //   required: item.required || false,
        //   type: item.type || 'string',
        //   message: item.rules_message || '',
        //   trigger: item.trigger || 'blur',
        // })
        // if (item.validator) {
        //   array.push({
        //     validator: item.validator,
        //     trigger: 'blur'
        //   })
        // }
        rules[item.prop] = array;
        form[item.prop] = isNaN(item.default_value) ? '' : item.default_value;
      }
      this.rules = rules;
      this.form = form;
      console.log("initFormRules", rules)
      console.log("initFormValue", form)
    },
    hide(action) {
      // 隐藏表单
      if (!this.loading_submit) {
        this.$emit('hide', action);
        if (this.type !== 'add') {
          // 如果不是新建表单时候隐藏，则重置表单
          this.resetForm();
        }
      } else {
        this.$message({
          message: '操作进行中，请稍等',
          type: 'warning'
        })
      }
    },
    beforeClose(done) {
      // 按esc，点遮罩层，取消按钮等隐藏dialog前的动作
      this.hide();
    },
    btnConfirm() {
      // 确定按钮动作
      this.submit();
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading_submit = true;
          let api = `${this.api}/${this.id}`;
          let method = 'put';
          // let params = this.form;
          let params = this.initSubmitParams();
          if (!params) return;
          let text = '修改';
          if (this.type === 'add') {
            // 判断api的method
            api = this.api;
            method = 'post';
            params = Object.assign({}, params, {
              id: this.id
            });
            text = '新增';
          }
          this.$http({
            url: api,
            method: method,
            data: params
          }).then(response => {
            this.$notify({
              title: '提示',
              message: text + '成功',
              type: 'success'
            });
            this.loading_submit = false;
            this.hide('refresh');
          }).catch(error => {
            // this.$notify({
            //   title: '提示',
            //   message: text + '失败',
            //   type: 'error'
            // });
            this.loading_submit = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    initSubmitParams() {
      let form = this.form;
      let params = {};
      for (let item of this.formColumn.values()) {
        if (item.parent_object) {
          if (typeof params[item.parent_object] !== 'object') {
            params[item.parent_object] = {};
          }
          params[item.parent_object][item.prop] = this.form[item.prop]
        } else {
          params[item.prop] = this.form[item.prop]
        }
      }
      console.log("@@@@@@@@@@@@ option initSubmitParams @@@@@@@@@@@@@@")
      return params;
    },
    getDetail() {
      // 获取编辑信息
      let api = `${this.api}/${this.id}`;
      this.loading_detail = true;
      this.$http.get(api).then(response => {
        // for (let [key, value] of Object.entries(this.form)) {
        //   // 遍历服务器数据字段赋给编辑默认值，防止form中有create_time等不必要的字段
        //   this.form[key] = response.data[key]
        // }
        let rpdata = response.data || {};
        let uidTempIndex = 1;
        for (let item of this.formColumn.values()) {
          // 遍历formColumn数据字段赋给编辑默认值，防止form中有服务器给的create_time等不必要的字段，新增对象包含
          if (item.parent_object) {
            let extend_key = item.parent_object;
            if (rpdata.hasOwnProperty(extend_key)) {
              let extend_object = rpdata[extend_key];
              if (typeof extend_object === 'object') {
                for (let k in extend_object) {
                  this.form[k] = extend_object[k]
                }
              }
            }
          } else {
            if (rpdata.hasOwnProperty(item.prop)) {
              this.form[item.prop] = rpdata[item.prop];
              if (item.prop === 'cover') {
                this.cover_file = {
                  name: rpdata['cover'],
                  percentage: 100,
                  response: {
                    name: rpdata['cover'],
                    url: rpdata['cover_url']
                  },
                  status: 'success',
                  uid: new Date().getTime() + uidTempIndex++,
                  url: rpdata['cover_url']
                };
                this.coverPreview = rpdata['cover_url'];
              }
            }
          }
        }
        console.log("getDetail::::", this.form)
      }).then(() => {
        this.loading_detail = false;
      })
    },

    validateEnglish(rule, value, callback) {
      // 验证输入值是否为纯英文字符
      if (value === '') {
        callback(new Error('请输入纯英文字符'));
      } else {
        if (/^[a-zA-Z]*$/.test(value)) {
          callback();
        } else {
          callback(new Error('请输入纯英文字符'));
        }
      }
    },
    validatePhone(rule, value, callback) {
      // 验证输入值是否为手机号
      console.log("validatePhone")
      if (value === '') {
        // callback(new Error('请输入手机号码'));
        callback();
      } else {
        if (/^1\d{10}$/.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确格式的11位手机号码'));
        }
      }
    },
    validateCover(rule, value, callback) {
      // 验证cover-uploader
      console.log("validateCover");
      if (this.uploader_status === 'uploading') {
        this.$message({
          message: '图片上传中，请稍等',
          type: 'warning'
        });
        console.log('(new Error图片上传中，请稍等')
        callback(new Error(' '));
      } else {
        let response = this.cover_file.response;
        if (response && response.name) {
          this.form.cover = response.name
          callback();
        } else {
          this.$message({
            message: '请选择一张封面图片',
            type: 'warning'
          });
          // callback(new Error('请选择图片'));
          callback(new Error(' '));
        }
      }

    }
  }
}