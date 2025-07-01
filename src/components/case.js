import "./case.scss";
import Handlebars from "handlebars";
import templateSource from "./case.handlebars?raw";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // JS 语法高亮
import "prismjs/themes/prism-tomorrow.css"; // 主题样式

function loadCase() {
  // 编译模板
  const template = Handlebars.compile(templateSource);

  window.addEventListener("toc-item-clicked", async function (event) {
    const { url, title} = event.detail;

    const response = await fetch(url.replace(".html", ".js"));
    if (!response.ok) {
      throw new Error("网络无响应");
    }
    // const jsCode = await response.text();
    // const jsCode = (await response.text()).replace(/^\/\/# sourceMappingURL=.*/gm, '');

    let jsCode = await response.text();
    if (import.meta.env.DEV) {
      // 仅在开发环境去掉 sourceMappingURL 注释
      jsCode = jsCode.replace(/^\/\/# sourceMappingURL=.*/gm, '');
    }

    // 渲染模板
    const renderedHtml = template({
      url,
      jsCode,
    });

    // 将渲染好的HTML插入到页面中
    document.getElementById("case-placeholder").innerHTML = renderedHtml;

    // 手动触发 Prism 高亮（如果自动检测失败）
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
    }
  });
}

document.addEventListener("DOMContentLoaded", loadCase);
