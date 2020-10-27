import obj from '../../api/menu'
// import the component
import treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


let category = {

  created() {
    this.findAll();
  },

  components: {treeselect},
  data() {
    return {
      tableData: [],
      createDialog: false,
      formData: {
        menuType:'M'
      },
      deleteDialog: false,
      id: 0,
      treeMenuList:[
        {
          menuId:0,
          menuName:"主目录",
          children:[],
        }
      ],
      normalizer(node) {
        if (node.children == null || node.children.length == 0) {
          delete node.children;
        }

        return {
          id: node.menuId,
          label: node.menuName,
        }
      },
    }
  },

  methods: {
    /**
     * 分页查询
     */
    async findAll() {
      this.tableData = await obj.findAll();
      this.$nextTick(()=>this.treeMenuList[0].children =this.tableData)

    },
    async addOrUpdate() {
      await obj.updateOrAdd(this.formData);
      this.formData = {};
      this.findAll();
    },
    async findById(id) {
      this.formData = await obj.findById(id);
    },
    async deleteById() {
      await obj.deleteById(this.id);
      this.findAll();
    }
  }
}

export default category;
