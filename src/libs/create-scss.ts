import fs = require('fs');
import path = require('path');
import { toast } from './toast';

/**
 * 创建css文件
 * @param name 名称
 * @param dirPath 路径
 */
export const createScss = (name: string, dirPath: string,fileHeaderText:string) => {
  const scssPath = path.resolve(dirPath, name + '.scss');
  const str = `${fileHeaderText}.${name}-wrap{

}`;
  fs.writeFileSync(scssPath, str);
  toast.success(`react scss:${name}创建成功`);
}