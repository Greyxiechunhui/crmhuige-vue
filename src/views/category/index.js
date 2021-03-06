import obj from '../../api/category'

let category = {

  created() {
    this.findPage();
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
      id: 0
    }
  },

  methods: {
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
      await obj.updateOrAdd(this.formData);
      this.formData = {};
      this.findPage();
    },
    async findById(id) {
      this.formData = await obj.findById(id);
    },
    async deleteById() {
      await obj.deleteById(this.id);
      this.findPage();
    }
  }
}

export default category;
