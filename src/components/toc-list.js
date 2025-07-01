import "./toc-list.scss";
import Handlebars from "handlebars";
import templateSource from "./toc-list.handlebars?raw";

function loadTocList() {
  const cases = [
    {
      title: "第一篇：第一个简单示例",
      url: "/case/hello-point.html",
      cover: "/case/hello-point.jpg",
    },
    {
      title: "第二篇：向着色器传输数据",
      url: "/case/data-to-shader.html",
      cover: "/case/data-to-shader.png",
    },
    {
      title: "第三篇：绘制一个三角形(缓冲区对象)",
      url: "/case/hello-triangle.html",
      cover: "/case/hello-triangle.png",
    },
    {
      title: "第四篇：颜色",
      url: "/case/colored-triangle.html",
      cover: "/case/colored-triangle.png",
    },
  ];

  // 编译模板
  const template = Handlebars.compile(templateSource);

  // 渲染模板
  const renderedHtml = template({
    cases,
  });

  // 将渲染好的HTML插入到页面中
  document.getElementById("toc-list-placeholder").innerHTML = renderedHtml;

  const container = document.getElementById("toc-list-container");

  container.addEventListener("click", function (e) {
    const target = e.target.closest(".toc-item");
    if (target) {
      const url = target.getAttribute("data-id");

      const title = e.target.textContent;

      // 创建自定义事件，并携带数据
      const event = new CustomEvent("toc-item-clicked", {
        detail: {
          url: url,
          title: title,
        },
      });

      // 触发事件
      window.dispatchEvent(event);
    }
  });
}

document.addEventListener("DOMContentLoaded", loadTocList);
