import "./index.scss";
import "./components/toc-list.js";
import "./components/case.js";
import { caseData } from "./case-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const search = window.location.search; // 获取 ? 后面的部分（包括 ?）
  const params = new URLSearchParams(search);
  const id = params.get("id"); // 获取单个参数

  if (id === null) {
    return;
  }
  if (id >= caseData.length) {
    return;
  }

  const event = new CustomEvent("toc-item-clicked", {
    detail: {
      url: caseData[id].url,
      title: caseData[id].title,
    },
  });
  window.dispatchEvent(event); // 触发事件
});
