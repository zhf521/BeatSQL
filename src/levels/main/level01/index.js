import md from "./README.md?raw";
import sql from "./createTable.sql?raw";
// 后面的?raw表示以原始的方式导入文件，而不进行任何转换或处理。这种用法通常在一些构建工具或打包工具中使用，例如Webpack，它会根据配置处理这样的导入语句，将Markdown文件转换为可直接使用的字符串

export default {
  key: "level01",
  title: "基础语法 - 查询 - 全表查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select * from student",
  hint: "请仔细查看本关给出的示例",
  type: "main",
};
