import obj from '../../api/role'
import menu from '../../api/menu'

let category = {

  created() {
    this.findAll();
    this.findAllMenu();

  },
  data() {
    return {
      tableData: [],
      // currentPage: 1,
      // pageSize: 5,
      // total: 0,
      createDialog: false,
      formData: {},
      deleteDialog: false,
      id: 0,
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },

  methods: {
    /**
     * 分页查询
     */
    async findAll() {
      let result = await obj.findAll();
      this.tableData = result;

    },
    // pageChangeHandler(page) {
    //   this.currentPage = page;
    //   this.findAll();
    // },
    async addOrUpdate() {

      this.formData.menuIds = this.$refs.huige.getCheckedKeys().concat(this.$refs.huige.getHalfCheckedKeys());
      console.log(this.formData.menuIds);
      await obj.updateOrAdd(this.formData);
      this.formData = {};
      this.$refs.huige.setCheckedKeys([]);
      this.findAll();
    },
    async findById(id) {
      this.formData = await obj.findById(id);
      this.$refs.huige.setCheckedKeys(this.formData.menuIds)
    },
    async deleteById() {
      await obj.deleteById(this.id);
      this.findAll();
    },
    async findAllMenu() {
      this.menuList = await menu.findAll();
    }
  }
}

export default category;
