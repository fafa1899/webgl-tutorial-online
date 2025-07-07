import "./toc-list.scss";
import { caseData } from '../case-data.js';
import Handlebars from "handlebars";
import templateSource from "./toc-list.handlebars?raw";

function loadTocList() { 
  // 编译模板
  const template = Handlebars.compile(templateSource);

  // 渲染模板
  const renderedHtml = template({
    cases: caseData,
  });

  // 将渲染好的HTML插入到页面中
  document.getElementById("toc-list-placeholder").innerHTML = renderedHtml;

  const container = document.getElementById("toc-list-container");

  container.addEventListener("click", function (e) {
    const target = e.target.closest(".toc-item");
    if (target) {
      // 移除所有 .toc-item 上的 .selected 类
      document.querySelectorAll('.toc-item').forEach(item => item.classList.remove('selected'));
      // 给当前点击的 .toc-item 添加 .selected 类
      target.classList.add('selected');

      // 创建自定义事件，并携带数据
      const index = target.getAttribute("data-id");  
      const event = new CustomEvent("toc-item-clicked", {
        detail: {
          url: caseData[index].url,
          title: caseData[index].title,
        },
      });

      // 触发事件
      window.dispatchEvent(event);

      // 在原有代码触发事件之后增加如下代码，用于更新URL
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('id', target.getAttribute("data-id")); // 假设 data-id 是你要作为查询参数的值
      window.history.pushState({}, '', currentUrl);
    }
  });
}

document.addEventListener("DOMContentLoaded", loadTocList);
