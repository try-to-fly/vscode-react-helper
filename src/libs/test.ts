import { getFileHeaderText } from "./get-file-header-text";

const config = {
  Author: "王宁",
  tpl:
    "/*\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by:   {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n",
  LastModifiedBy: "王宁"
};

// console.log(getFileHeaderText(config))