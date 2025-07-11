import "./index.scss";
import "./components/toc-list.js";
import "./components/case.js";
import { caseData } from "./case-data.js";

document.addEventListener("DOMContentLoaded", () => {
  // 
  const tocContainer = document.getElementById("toc-container");
  const toggleBtn = document.getElementById("toggle-toc-btn");
  if (tocContainer && toggleBtn) {
    toggleBtn.addEventListener("click", function () {    
      const isCollapsed = tocContainer.classList.toggle("collapsed");
      toggleBtn.classList.toggle("collapsed", isCollapsed);
    });
  }
  if (window.innerWidth < 768) {
    tocContainer.classList.add("collapsed");
    toggleBtn.classList.add("collapsed");
  }

  //
  const search = window.location.search; // 获取 ? 后面的部分（包括 ?）
  const params = new URLSearchParams(search);
  const id = params.get("id"); // 获取单个参数

  if (id === null) {
    return;
  }
  if (id >= caseData.length) {
    return;
  }

  const target = document.querySelector(`.toc-item[data-id="${id}"]`);
  if (target) {
    target.click(); // 原生 click() 方法会触发绑定的事件监听器
  } 
});
