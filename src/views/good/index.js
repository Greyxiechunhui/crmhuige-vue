import obj from '../../api/good'

let category = {

  created() {
    this.findPage();
    this.getCategoryTree();
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      createDialog:false,
      formData:{},
      deleteDialog:false,
      id:0,
      categoryList:[],
      props:{
        label:"name",
        value:"id"
      }
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
    },
    pageChangeHandler(page) {
      this.currentPage = page;
      this.findPage();
    },
    async addOrUpdate(){
      await obj.updateOrAdd(this.formData);
      this.formData ={};
      this.findPage();
    },
    async findById(id){
      console.log(id);
      this.formData = await obj.findById(id);
    },
    async deleteById(){
      await obj.deleteById(this.id);
      this.findPage();
    },
    async getCategoryTree(){
      this.categoryList = await obj.findCategoryTree();
    },
    changeHandler(array){
      this.formData.typeId =array[array.length-1]
    }
  }
}

export default category;
