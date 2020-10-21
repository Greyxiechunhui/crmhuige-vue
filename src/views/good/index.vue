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


      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品编码">
              <span>{{ props.row.goodCode }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goodName }}</span>
            </el-form-item>
            <el-form-item label="商品型号">
              <span>{{ props.row.goodModel }}</span>
            </el-form-item>
            <el-form-item label="类型ID">
              <span>{{ props.row.typeId }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.lastPurchasingPrice }}</span>
            </el-form-item>
            <el-form-item label="库存下限">
              <span>{{ props.row.minStoreNum }}</span>
            </el-form-item>
            <el-form-item label="生产厂商">
              <span>{{ props.row.producer }}</span>
            </el-form-item>

            <el-form-item label="采购价格">
              <span>{{ props.row.purchasingPrice }}</span>
            </el-form-item>

            <el-form-item label="备注">
              <span>{{ props.row.remarks }}</span>
            </el-form-item>

            <el-form-item label="售价">
              <span>{{ props.row.sellPrice }}</span>
            </el-form-item>

            <el-form-item label="状态">
              <span>{{ props.row.state }}</span>
            </el-form-item>

            <el-form-item label="库存数量">
              <span>{{ props.row.storeNum }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="goodCode"
        show-overflow-tooltip
        width="130px"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="goodName"
        label="商品名称"
      >
      </el-table-column>


      <el-table-column
        align="center"
        prop="producer"
        label="生产厂商">
      </el-table-column>

      <el-table-column
        align="center"
        prop="purchasingPrice"
        label="采购价格">
      </el-table-column>

      <el-table-column
        align="center"
        prop="sellPrice"
        label="售价">
      </el-table-column>


      <el-table-column
        align="center"
        prop="state"
        label="状态">
      </el-table-column>

      <el-table-column
        align="center"
        prop="storeNum"
        label="库存数量">
      </el-table-column>

      <el-table-column
        align="center"
        prop="sellPrice"
        label="售价">
      </el-table-column>

      <el-table-column
        align="center"
        label="操作">
        <template v-slot="obj">
          <el-button type="warning" @click="createDialog=true,findById(obj.row.goodCode)" size="mini">修改</el-button>
          <el-button type="danger" @click="deleteDialog=true,id=obj.row.goodCode" size="mini">删除</el-button>
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
      width="40%"
    >

      <el-form ref="form" :model="formData" label-width="80px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称">
              <el-input type="text" v-model="formData.goodName"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品型号">
              <el-input type="text" v-model="formData.goodModel"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分类">
              <!--v-model="formData.goodCategory"-->
              <el-cascader
                @change="changeHandler"
                :props="props"
                :options="categoryList"
              >
              </el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品单位">
              <el-input type="text" v-model="formData.goodUnit"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="库存下限">
              <el-input type="text" v-model="formData.minStoreNum"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="生产厂商">
              <el-input type="text" v-model="formData.producer"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="采购价格">
              <el-input type="text" v-model="formData.purchasingPrice"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="售价">
              <el-input type="text" v-model="formData.sellPrice"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-input type="text" v-model="formData.state"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="库存数量">
              <el-input type="text" v-model="formData.storeNum"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.remarks"/>
        </el-form-item>
        <!--<el-form-item label="商品编码">-->
        <!--<input type="text" v-model="formData.goodCode">-->
        <!--</el-form-item>-->


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
