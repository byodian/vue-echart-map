<script>
import BComponent from "./components/BComponent.vue"

const debounce = function (callback, delay) {
  let timer
  return function () {
    clearTimeout(timer)
    const args = arguments
    timer = setTimeout(() => {
      callback.apply(callback, args)
    }, delay)
  }
}

export default {
  name: "App",
  components: {
    BComponent,
  },
  data() {
    return {
      adata: {},
      options: {},
      isShow: false,
      uid: 1,
    }
  },
  watch: {
    adata: {
      handler(newData) {
        if (Object.keys(newData).length > 0) {
          this.isShow = true
        }
        this.options = {
          title: {
            text: "Population Density of Hong Kong （2011）",
            subtext: "Data from Wikipedia",
            sublink:
              "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12",
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c} (p / km2)",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            min: 800,
            max: 50000,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"],
            },
          },
          series: [
            {
              name: "浙江省人口密度",
              type: "map",
              map: "ZJ",
              label: {
                show: true,
              },
              data: [
                { name: "杭州市", value: 20057.34 },
                { name: "宁波市", value: 15477.48 },
                { name: "温州市", value: 31686.1 },
                { name: "嘉兴市", value: 6992.6 },
                { name: "湖州市", value: 44045.49 },
                { name: "绍兴市", value: 40689.64 },
                { name: "金华市", value: 37659.78 },
                { name: "衢州市", value: 45180.97 },
                { name: "舟山市", value: 55204.26 },
                { name: "台州市", value: 21900.9 },
                { name: "丽水市", value: 4918.26 }, 
              ],
              // 自定义名称映射
              // nameMap: {
              //   "Central and Western": "中西区",
              //   Eastern: "东区",
              //   Islands: "离岛",
              //   "Kowloon City": "九龙城",
              //   "Kwai Tsing": "葵青",
              //   "Kwun Tong": "观塘",
              //   North: "北区",
              //   "Sai Kung": "西贡",
              //   "Sha Tin": "沙田",
              //   "Sham Shui Po": "深水埗",
              //   Southern: "南区",
              //   "Tai Po": "大埔",
              //   "Tsuen Wan": "荃湾",
              //   "Tuen Mun": "屯门",
              //   "Wan Chai": "湾仔",
              //   "Wong Tai Sin": "黄大仙",
              //   "Yau Tsim Mong": "油尖旺",
              //   "Yuen Long": "元朗",
              // },
            },
          ],
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeCreate() {
    console.log("%cbeforeCreate 父组件", "color: pink")
  },
  created() {
    console.log("%ccreated 父组件", "color: pink")
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("123")
      }, 0)
    })

    promise.then((data) => {
      // 为已有对象赋值多个新 property
      const interObject = {
        name: `byodian${data}`,
        age: "21",
        items: [150, 230, 224, 218, 135, 147, 260],
      }

      // 1. 对象字面量赋值替换
      // this.adata = interObject

      // 2. 使用 Vue.set(object, propertyName, value)
      // this.$set(this.adata, 'name', `byodian${data}`)
      // this.$set(this.adata, 'items', [150, 230, 224, 218, 135, 147, 260])

      // 3. 使用 Object.assign() 赋值替换
      // this.adata = Object.assign({}, this.adata, interObject)

      // 4. 使用结构赋值
      this.adata = { ...this.adata, ...interObject }
    })
  },
  mounted() {
    // 窗口尺寸变化后，强制刷新图表组件宽高
    window.addEventListener(
      "resize",
      debounce(() => {
        this.uid += 1
      }, 300)
    )

    this.$nextTick(() => {
      console.log("%c$nextTick mounted", "color: pink")
    })
  },
  beforeUpdate() {
    console.log("%cbeforeUpdate 父组件", "color: pink")
  },
  updated() {
    console.log("%cupdated 父组件", "color: pink")
  },
}
</script>

<template>
  <div id="app">
    <div class="box1">
      <div
        v-if="isShow"
        class="b-com-wrapper">
        <b-component
          :key="uid"
          name="box1"
          :options="options"
          width="100%"
          height="100%" />
      </div>
    </div>
  </div>
</template>

<style>
p {
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.box1 {
  display: flex;
  flex-direction: column;
  height: 300px;

  outline: 1px dashed #000;
}

.box2 {
  height: 300px;
}

.b-com-wrapper {
  width: 100%;
  flex-basis: 100%;
  background-color: #f7fce5;
}
</style>
