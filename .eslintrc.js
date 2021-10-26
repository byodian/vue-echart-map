module.exports = {
  // 当前文件目录是否为规则执行的根目录
  root: true,
  // 设置环境，会预定义所有环境对应的全局变量
  env: {
    node: true,
    browser: true,
    /* 开启后，默认设置 parserOptions: {ecmaVersion: 6 } */
    es6: true,
    jquery: true,
    //  web workers global variables.
    worker: true
  },
  // 解析器选项
  parserOptions: {
    // 文件解析器
    parser: 'babel-eslint',
    /*
   * esma 版本
   * 2015 - 6
   * ...
   * 2018 - 9
   * */
    ecmaVersion: 9,
    // es6 模块系统
    sourceType: 'module',
    // 其他语言功能
    ecmaFeatures: {
      // 允许jsx
      jsx: true
    }
  },
  // 引用外部规则集 对应 eslint-config-*
  extends: [
    'plugin:vue/recommended',
    // '@vue/standard'
  ],
  // 插件里面的项对应module为 eslint-plugin-*
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'vue'
  ],
  // 此处设置全局变量
  globals: {
    process: true,
    qiniu: true,
    tinymce: true,
    ProfX: true
  },
  /*
  * "off" or 0 - 关闭规则
  * "warn" or 1 - 开启规则，只警告
  * "error" or 2 - 开启规则，报错
  * */
  rules: {
    // 每行最大属性数量
    // 单行时每行最大 10 个
    // 多行时每行最多一个
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    // 句尾禁止添加分号
    'semi': [2, 'never'],
    // 花括号前后各一个空格
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 箭头函数，箭头前后要求一个空格
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    // tab缩进
    'vue/html-indent': [2, 2],
    // 一行一个属性
    // 'vue/max-attributes-per-line': 0,
    // 必须声明类型
    // 'vue/require-prop-types': 0,
    // 需要默认值。Boolean除外
    'vue/require-default-prop': 0,
    // 允许使用v-html
    'vue/no-v-html': 0,
    'vue/html-closing-bracket-newline': [2, {
      'singleline': 'never',
      'multiline': 'never'
    }],
    // 关闭单闭合标签模式
    'vue/html-self-closing': 0,
    'no-tabs': 0,
    'no-new': 0,
    'prefer-promise-reject-errors': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': 0,
    // 逗号后面必须添加空格，逗号前面不允许添加空格
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }]
  }
}