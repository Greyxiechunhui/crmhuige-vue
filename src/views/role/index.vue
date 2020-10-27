<template>
  <div class="category-wrapper">

    <div class="execute-box">
      <el-button size="mini" type="success" @click="createDialog=true">添加</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        align="center"
        prop="roleId"
        label="角色ID"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="roleName"
        label="角色名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="roleSort"
        label="角色排序">
      </el-table-column>

      <el-table-column
        align="center"
        prop="remark"
        label="角色备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template v-slot="obj">
          <el-button type="warning" @click="createDialog=true,findById(obj.row.roleId)" size="mini">修改</el-button>
          <el-button type="danger"  @click="deleteDialog=true,id=obj.row.roleId" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: right;margin-top: 20px"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageChangeHandler"
      :total="total">
    </el-pagination>

    <!--新建修改-->
    <el-dialog
      title="提示"
      :visible.sync="createDialog"
      width="30%"
    >
      <el-form ref="form" :model="formData" label-width="80px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称">
              <el-input v-model="formData.roleName"></el-input>
            </el-form-item>

            <el-form-item label="角色排序">
              <el-input v-model="formData.roleSort"></el-input>
            </el-form-item>

            <el-form-item label="角色备注">
              <el-input v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="treeCol">
            <h3>分配权限</h3>
            <!--

              :default-checked-keys="[5]"
            -->
            <el-scrollbar>
              <el-tree
                :data="menuList"
                show-checkbox
                ref="huige"
                node-key="menuId"
                :default-expand-all="true"
                :props="defaultProps">
              </el-tree>
            </el-scrollbar>
          </el-col>
        </el-row>



      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="createDialog = false">取 消</el-button>
    <el-button type="primary" @click="createDialog = false,addOrUpdate()">确 定</el-button>
  </span>
    </el-dialog>

    <!--删除弹框-->
    <el-dialog
      title="温馨提示"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>想删就删除吧</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">取 消</el-button>
    <el-button type="primary" @click="deleteDialog = false,deleteById()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import obj from './index'

  export default obj
</script>

<style scoped lang="scss">
  @import "./index";
</style>
