<template lang="">
  <div class="favor-table">
    <header class="table-header">
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="collectTime,false"
              >时间排序（新->旧）</el-dropdown-item
            >
            <el-dropdown-item command="collectTime,true"
              >时间排序（旧->新）</el-dropdown-item
            >
            <el-dropdown-item command="love,false" divided
              >收藏排序（多->少）</el-dropdown-item
            >
            <el-dropdown-item command="love,true"
              >收藏排序（少->多）</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="videoList.length >= pageSize ? videoList.length : pageSize"
          :hide-on-single-page="hideFlag"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </header>
    <section class="table-content-favor">
      <favorCard
        v-for="video in showList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )"
        :key="video._id"
        :video="video"
      />
    </section>
  </div>
</template>
<script>
import favorCard from "@/components/favor/favor-card.vue";
export default {
  data() {
    return {
      hideFlag: true,
      currentPage: 1,
      pageSize: 6,
      showList: [],
    };
  },
  components: {
    favorCard,
  },
  props: {
    videoList: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    if (this.videoList.length < 10) {
      this.hideFlag = true;
    } else {
      this.hideFlag = false;
    }
    this.showList = this.videoList;
    for (let i = 0; i < this.videoList.length; i++) {
      this.videoList[i].collectTime = new Date(this.videoList[i].collectTime);
    }
  },
  methods: {
    handleCurrentChange(index) {
      console.log(index);
      this.currentPage = index;
      // this.showList = this.videoList.slice(
      //   (this.currentPage - 1) * this.pageSize,
      //   this.currentPage * this.pageSize
      // );
    },
    handleCommand(command) {
      console.log("handleCommand", command);
      let arr = command.split(",");
      arr[1] = arr[1] == "true" ? true : false;
      this.sortArray(arr[0], arr[1]);
    },
    // 排序数组
    sortArray(title, isAsc) {
      let sortAsc = function (a, b) {
        if (title == "createdAt") {
          return new Date(a[title]) - new Date(b[title]);
        }
        return a[title] - b[title];
      };
      let sortDesc = function (a, b) {
        return b[title] - a[title];
      };
      if (isAsc) {
        console.log("this.showList :", this.showList);
        this.showList.sort(sortAsc);
        console.log("this.showList:", this.showList);
      } else {
        this.showList.sort(sortDesc);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.favor-table {
  width: 100%;

  .table-header {
    display: flex;
    width: 100%;
    height: 32px;
    line-height: 32px;
    justify-content: space-between;
    .header-right {
      display: flex;
      margin-right: 1vw;
      margin-left: 1vw;
    }
  }

  .table-content-favor {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    flex-grow: 100;
    flex-shrink: 100;
    box-sizing: border-box;
    padding: 15px;
    transition: all 0.5s;
    @media screen and (max-width: 500px) {
      display: block;
    }
  }
  .favor-card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 2;
    flex-shrink: 2;
  }
}
</style>
