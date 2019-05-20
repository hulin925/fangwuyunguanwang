<template>
<section class="main">
    <section class="head">
        <div class="search">
            <i class="search-icon fa fa-search fa-lg"></i>
            <input class="search-input" type="text" placeholder="搜索百万数据 实时更新 急速、精准、智能" v-model="searchText" @keyup.enter='Search(searchText)' />
        </div>
    </section>
    <section class="article-content">
        <div class="article-list">
            <div class="list-title">
                最新法条
            </div>
            <div class="list-content">
                <router-link :to="`/articles/${item.id}`" class="article-list-item" v-for='item in lawListData' :key='item.id'>
                    <div class="article-item-title">
                        <span class="article-title">{{ item.title }}</span>
                        <span class="article-item-title-date">{{ item.addtime }}</span>
                    </div>
                    <div class="article-item-footer">
                        <div class="article-item-footer-dep">{{ item.section }}</div>
                        <div class="article-item-footer-content">
                            <label class="article-item-title-efferctiveness">现行有效</label>
                        </div>
                    </div>
                </router-link>
                <div class="more" @click="moreClick">
                    <button type="button" class="more-btn">
                <span>加载更多</span><i class="fa fa-chevron-down"></i></button>
                </div>
            </div>
        </div>
    </section>
</section>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      lawListData: [],
      page: 1,
      count: 10,
      searchText: ""
    };
  },
  components: {},
  mounted() {
    this.getLawListData(this.page, this.count);
  },
  watch: {},
  methods: {
    timestampToTime(timestamp) {
      let date = new Date(timestamp * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D;
    },
    getLawListData(page, count) {
      axios({
        method: "post",
        url: "https://fwy1.sanhedao.com.cn/Uapi?do=Content.showlawnew",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          page,
          count
        })
      })
        .then(response => {
          console.log(response);
          if (response && response.data.code == 11901) {
            console.log(response.data.data);
            for (let item of response.data.data) {
              item.addtime = this.timestampToTime(item.addtime);
            }
            this.lawListData.push(...response.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSearchData(search, page, count) {
      axios({
        method: "post",
        url: "https://fwy1.sanhedao.com.cn/Uapi?do=Content.serch",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          search,
          page,
          count
        })
      })
        .then(response => {
          if (response && response.data.code == 11901) {
            console.log(response.data.data);
            for (let item of response.data.data) {
              item.addtime = this.timestampToTime(item.addtime);
            }
            this.lawListData.push(...response.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    moreClick() {
      this.page++;
      if (this.searchText == "") {
        this.getLawListData(this.page, this.count);
      } else {
        this.getSearchData(this.searchText, this.page, this.count);
      }
    },
    Search(searchText) {
      this.page = 1;
      this.lawListData = [];
      if (this.searchText == "") {
        this.getLawListData(this.page, this.count);
      } else {
        this.getSearchData(searchText, this.page, this.count);
      }
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
  @r:30rem;

  .main{
    position:relative;
    top:82/@r;
  }
* {
  padding: 0;
  margin: 0;
}

.head {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: 60vh;
  background: url("../../../assets/img/banner.jpg") no-repeat;
  background-position: top center;
}

.search {
  margin: auto;
  width: 40%;
  height: 3.5rem;
  background-color: #ffffff;
  border-radius: 10px;
}

.search-input {
  height: 100%;
  font-size: 1.3rem;
  width: 90%;
  border: none;
  outline: none;
  margin-left: 5px;
}

.search-icon {
  line-height: 0.5rem;
}

.article-content {
  background-color: #e8e8e8;
}

.article-list {
  background-color: #fff;
  width: 65vw;
  height: 100%;
  margin: auto;
  position: relative;
  top: -3.5rem;
  border-radius: 10px;
}

.list-title {
  height: 3.5rem;
  font-size: 1.3rem;
  line-height: 3.5rem;
  text-align: left;
  font-weight: bold;
  padding-left: 1.25rem;
}

.article-list-item {
  display: block;
  padding: 0px 25px 25px 25px;
  font-size: 1.2rem;
  font-weight: lighter;
  text-decoration: none;
  color: #333;
  text-align: left;
  font-size: 0;
}

.article-list-item:hover {
  background-color: #f3f3f3;
}

.article-list-item + .article-list-item {
  padding: 25px;
}

.article-title {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-size: 1.2rem;
}

.article-item-title-date {
  float: right;
  font-size: 1.2rem;
}

.article-item-footer {
  margin-top: 20px;
}

.article-item-footer-dep {
  font-size: 1.1rem;
  display: inline-block;
  color: #999;
}

.article-item-footer-content {
  display: inline-block;
  float: right;
  font-size: 1rem;
  padding: 3px;
  color: #fff;
  background-color: #1293ff;
  border-radius: 5px;
}

.more {
  text-align: center;
  padding: 30px;
}

.more .more-btn {
  font-size: 1.2rem;
  width: 130px;
  height: 36px;
  color: #333;
  background-color: #ffd751;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}
@media (max-width: 480px) {
  .head {
    height: 150px;
    background: #ccc;
  }
  .search {
    margin: 0 auto;
    width: 100%;
    border-radius: 5px;
  }
  .article-list {
    width: auto;
    border-radius: 5px;
  }
  .article-title {
    width: 70%;
  }
  .article-list-item {
    border-bottom: 1px solid #eee;
  }
}

@media (min-width: 481px) and (max-width: 800px) {
  .head {
    height: 150px;
    background: #ccc;
  }
  .search {
    margin: 0 auto;
    width: 100%;
  }
  .article-list {
    width: auto;
  }
  .article-title {
    width: 80%;
  }
  .article-list-item {
    border-bottom: 1px solid #eee;
  }
}

@media (min-width: 801px) and (max-width: 1200px) {
}
@media (min-width: 1201px) {
}
</style>
