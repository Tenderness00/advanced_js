// import {sanitizeHtml} from "./modules/index.js";

export const sanitizeHtml = (value) => {
  return value.replaceAll("<", "&lt;").replaceAll(">","&gt;");
}