<template>
  <div class="category-wrapper">

    <div class="execute-box">
      <el-button size="mini" type="success" @click="createDialog=true,formData={menuType:'M'}">添加</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      row-key="menuId"
      :tree-props="{children: 'children'}">

      <el-table-column
        prop="menuName"
        label="权限名称"
      >
      </el-table-column>

      <el-table-column
        prop="orderNum"
        label="权限排序">
      </el-table-column>

      <el-table-column

        prop="path"
        label="路由地址">
      </el-table-column>

      <el-table-column

        prop="menuType"
        label="权限类型">
      </el-table-column>

      <el-table-column
        prop="component"
        label="组件路径">
      </el-table-column>

      <el-table-column
        prop="perms"
        label="权限标识">
      </el-table-column>

      <el-table-column
        prop="icon"
        label="菜单图标">
        <template v-slot="obj">
          <e-icon :icon-name="obj.row.icon"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="url"
        label="请求路径">
      </el-table-column>

      <el-table-column
        prop="method"
        label="请求方式">
      </el-table-column>

      <el-table-column
        align="center"
        label="操作">
        <template v-slot="obj">
          <el-button type="warning" @click="createDialog=true,findById(obj.row.menuId)" size="mini">修改</el-button>
          <el-button type="danger" @click="deleteDialog=true,id=obj.row.menuId" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新建修改-->
    <el-dialog
      title="提示"
      :visible.sync="createDialog"
      width="30%"
    >

      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="所属父级">
          <!--<el-input v-model="formData.parentId"></el-input>-->
          <treeselect v-model="formData.parentId" :options="treeMenuList" :show-count="true"
                      :normalizer="normalizer" placeholder="请选择父级权限"/>
        </el-form-item>

        <el-form-item label="菜单类型">
          <template>
            <el-radio-group v-model="formData.menuType">
              <el-radio label="M">目录</el-radio>
              <el-radio label="C">菜单</el-radio>
              <el-radio label="F">按钮</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="formData.menuType!='F'">
          <!--<el-input v-model="formData.icon"></el-input>-->
          <e-icon-picker v-model="formData.icon"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="权限名称">
              <el-input v-model="formData.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限排序">
              <el-input v-model="formData.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row v-if="formData.menuType!='F'">
          <el-col :span="12">
            <el-form-item label="路由地址">
              <el-input v-model="formData.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.menuType=='C'">
            <el-form-item label="组件路径">
              <el-input v-model="formData.component"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formData.menuType=='F'">
          <el-col :span="12">
            <el-form-item label="权限标识">
              <el-input v-model="formData.perms"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址">
              <el-input v-model="formData.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="请求方式" v-if="formData.menuType=='F'">
          <el-select v-model="formData.method" placeholder="请选择">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="Delete" value="Delete"></el-option>
            <el-option label="option" value="option"></el-option>
          </el-select>
        </el-form-item>
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
