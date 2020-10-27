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
        prop="userId"
        width="55"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="账户名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickName"
        label="用户昵称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="email"
        show-overflow-tooltip
        label="用户邮箱">
      </el-table-column>

      <el-table-column
        align="center"
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sex"
        label="性别">
        <template v-slot="obj">
          <span v-if="obj.row.sex==0">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="avatar"
        label="头像">
        <template v-slot="obj">
          <el-avatar shape="square" :size="35" :src="obj.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="帐号状态">

        <template v-slot="obj">
          <el-switch
            v-model="obj.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        align="center"

        label="是否离职">

        <template v-slot="obj">
          <el-tag type="success" v-if="obj.row.delFlag==0">在职</el-tag>
          <el-tag type="danger" v-else>离职</el-tag>
        </template>
      </el-table-column>


      <el-table-column
        align="center"
        label="操作">
        <template v-slot="obj">
          <el-button type="warning" @click="createDialog=true,findById(obj.row.userId)" size="mini">修改</el-button>
          <el-button type="danger" @click="deleteDialog=true,id=obj.row.userId" size="mini">删除</el-button>
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
      width="35%"
    >
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基础数据" name="first">

            <el-form-item label="用户名" prop="userName">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="formData.nickName"></el-input>
            </el-form-item>

            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>

            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" prop="sex">
              <el-radio-group v-model="formData.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>

              </el-radio-group>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="员工状态" name="second">

            <el-form-item label="是否可用">
              <el-switch
                v-model="formData.status"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="是否离职">
              <el-tag type="info" v-if="formData.delFlag==2">离职状态</el-tag>
              <el-tag type="info" v-else>在职</el-tag>
            </el-form-item>
            <el-form-item label="用户头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">

            <div v-if="formData.userId">
              <h3>已有角色</h3>
              <el-tag
                style="margin-right: 5px"
                v-for="role in userRoles"
                :key="role.roleId"
                closable
                @close="deleteRoleByRoleIdAndUserId(role.roleId)"
                type="success">
                {{role.roleName}}
              </el-tag>
            </div>

            <div>
              <h3>分配角色</h3>
              <el-select v-model="roleIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </div>


          </el-tab-pane>
          <el-tab-pane label="备注信息" name="fourth">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="formData.remark">
            </el-input>
          </el-tab-pane>
        </el-tabs>

      </el-form>
      <span slot="footer" class="dialog-footer" v-if="activeName=='fourth'">
    <el-button @click="createDialog = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
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
