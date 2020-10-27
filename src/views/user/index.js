import obj from '../../api/user'
import role from '../../api/role'

let category = {

  created() {
    this.findPage();
    this.findAllRole();
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      createDialog: false,
      formData: {},
      deleteDialog: false,
      id: 0,
      imageUrl: '',
      activeName: 'first',
      roles: [],
      roleIds: [],
      userRoles: [],
      rules: {
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,7}$/, message: '用户账号 数字字母下划线组成  以字母开头  长度6-8', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '昵称未能为空', trigger: 'blur'}
        ],
        email: [
          {type: 'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur'}
        ],
        phone: [
          {
            pattern: /^[1](([3][0-9])|([4][5,7,9])|([5][0-9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/,
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        avatar: [
          {required: true, message: '请上传头像', trigger: 'blur'}
        ],
      }
    }
  },

  methods: {
    /**
     * 拿到所有的角色
     */
    async findAllRole() {
      this.roles = await role.findAll();
    },

    /**
     * 分页查询
     */
    async findPage() {
      let result = await obj.findPage(this.currentPage, this.pageSize);
      this.tableData = result.records;
      this.total = result.total;


      if (result.records == 0 && this.currentPage != 1) {
        this.currentPage = this.currentPage - 1;
        this.findPage();
      }
    },
    pageChangeHandler(page) {
      this.currentPage = page;
      this.findPage();
    },
    async addOrUpdate() {

      this.userRoles.forEach(item=>this.roleIds.push(item.roleId))
      this.formData.roleIds = this.roleIds.join("A");
      this.roleIds = [];
      await obj.updateOrAdd(this.formData);
      this.formData = {};
      this.findPage();
    },
    async findById(id) {
      //roles表示所有的角色
      //userRoles 用户的角色
      this.formData = await obj.findById(id);
      this.findRoleByUserId(id);
      this.imageUrl = this.formData.avatar;
    },
    async deleteById() {
      await obj.deleteById(this.id);
      this.findPage();
    },
    //上传成功之后
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
      this.formData.avatar = res.data;
    },

    async deleteRoleByRoleIdAndUserId(id) {
      await obj.deleteRoleByRoleIdAndUserId(this.formData.userId, id)
      this.findAllRole();
      this.findRoleByUserId(this.formData.userId)
    },
    //获取用户的角色
    async findRoleByUserId(userId) {
      this.userRoles = await obj.findRoleByUserId(userId);
      this.userRoles.forEach(item1 => {
        this.roles.splice(this.roles.findIndex(item => item.roleId == item1.roleId), 1);
      })
    },

    //上传之前的验证
    /**
     * 图片格式必须是 jps jpeg png
     * @param file
     * @returns {boolean}
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type == ('image/jpeg' || 'image/jpg' || 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.createDialog = false;
          this.addOrUpdate();
        } else {
          console.log('error submit!!');
          /**
           * 点击确定时返回第一页报错信息
           * @type {string}
           */
          this.activeName = 'first';
          return false;
        }
      });
    },

  }
}

export default category;
