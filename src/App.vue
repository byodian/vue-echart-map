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
      cdata: {
        min: 0,
        max: 2,
        lowColor: '#ffe8e8',
        highColor: '#ff0000',
        seriesData: []
      },
      options: {},
      uid: 1,
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        // if (Object.keys(newData).length > 0) {
        //   this.isShow = true
        // }
        const _this = this
        this.options = {
          title: {
            text: newData.title,
          },
          tooltip: {
            trigger: "item",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: {
                readOnly: false,
                show: true,
                optionToContent() {
                  return `<textarea style="width: 95%;" rows="50"></textarea>`
                },
                contentToOption(container, option) {
                  let seriesData = []
                  const dataString = container.querySelector("textarea").value
                  const dataArr = dataString.split("\n")
                  dataArr.forEach((item) => {
                    const itemArr = item.split("\t")
                    seriesData.push({
                      name: itemArr[0],
                      value: +itemArr[1],
                    })
                  })
                  _this.cdata.seriesData = seriesData
                },
              },
              restore: {},
              saveAsImage: {
                type: "png",
                pixelRatio: 5,
              },
            },
          },
          visualMap: {
            min: newData.min,
            max: newData.max,
            type: "continuous",
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            inRange: {
              color: [newData.lowColor, newData.highColor],
            },
          },
          series: [
            {
              name: newData.title,
              type: "map",
              map: "YRDR",
              label: {
                show: true,
                fontSize: 9,
                fontWeight: "lighter",
              },
              roam: "move",
              aspectScale: 0.75,
              zoom: 1.1,
              data: newData.seriesData,
            },
          ],
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // 窗口尺寸变化后，强制刷新图表组件宽高
    window.addEventListener(
      "resize",
      debounce(() => {
        this.uid += 1
      }, 300)
    )
  },
  methods: {
    reset() {
      this.cdata = {
        min: 0,
        max: 2,
        lowColor: '#ffe8e8',
        highColor: '#ff0000',
      }
    },
    handleClick() {
      console.log(this.cdata.min)
    }
  }
}
</script>

<template>
  <div id="app">
    <el-form label-width="auto" class="grid">
      <el-form-item label="标题" class="col-start-1 col-end-3">
        <el-input
          v-model="cdata.title"
          placeholder="请在这里修改图表标题"></el-input>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input-number
          v-model="cdata.min"
          :min="0"
          :max="10" 
          label="描述文字">
        </el-input-number>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input-number
          v-model="cdata.max"
          :min="0"
          :max="10" 
          label="描述文字"
          @change="handleClick">
        </el-input-number>
      </el-form-item>
      <el-form-item label="最小值颜色">
        <el-color-picker v-model="cdata.lowColor" @change="handleClick"></el-color-picker>
      </el-form-item>
      <el-form-item label="最大值颜色">
        <el-color-picker v-model="cdata.highColor"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="box1">
      <div class="b-com-wrapper">
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
  width: 800px;
  margin: 20px auto;
  color: #2c3e50;
  /* margin: 20px; */
  display: flex;
  flex-direction: column;
}

.box1 {
  display: flex;
  flex-direction: column;
  height: 750px;

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

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.col-start-1 {
  grid-column-start: 1;
}

.col-end-3 {
  grid-column-end: 3;
}
</style>
