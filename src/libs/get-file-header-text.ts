/**
 * 参考：https://github.com/zhaopengme/vscode-fileheader/blob/master/extension.js
 * @param config vscode-fileheader 配置文件
 */
import * as vscode from 'vscode';
import {toast} from './toast';

 interface Config{
   Author:string,
   tpl:string,
   LastModifiedBy:string
 }

export function getFileHeaderText() {
  const config = vscode.workspace.getConfiguration("fileheader");
  if (!config || !config.Author) {
    toast.waring('安装vscode-fileheader 可以自动生成文件头');
    return '';
  };
  var time = formatTime("yyyy-MM-dd hh:mm:ss");
  var data = {
    author: config.Author,
    lastModifiedBy: config.LastModifiedBy,
    createTime: time,
    updateTime: time
  };
  return new Template(config.tpl).render(data);
}

function formatTime(format) {
  const date = new Date();
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}

function Template(tpl) {
  var fn,
    match,
    code = [
      "var r=[];\nvar _html = function (str) { return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };"
    ],
    re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m,
    addLine = function(text) {
      code.push(
        "r.push('" +
          text
            .replace(/\'/g, "\\'")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r") +
          "');"
      );
    };
  while ((match = re.exec(tpl))) {
    if (match.index > 0) {
      addLine(tpl.slice(0, match.index));
    }
    if (match[2]) {
      code.push("r.push(String(this." + match[1] + "));");
    } else {
      code.push("r.push(_html(String(this." + match[1] + ")));");
    }
    tpl = tpl.substring(match.index + match[0].length);
  }
  addLine(tpl);
  code.push("return r.join('');");
  fn = new Function(code.join("\n"));
  this.render = function(model) {
    return `${fn.apply(model)}
`;
  };
}
