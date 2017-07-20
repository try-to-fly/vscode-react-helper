import fs = require('fs');
import path = require('path');
import { toast } from './toast';

/**
 *
 * @param dirPath 当前目录路径
 * @param name 组件名称
 */
export const createDir = (dirPath: string, name: string): string => {
  const componentDirPath = path.resolve(dirPath, name);
  let isComponentExit = fs.existsSync(componentDirPath);
  if (isComponentExit) {
    return void toast.error(`该目录:${componentDirPath}已存在，无法继续创建组件。`)
  }
  fs.mkdirSync(componentDirPath);
  return componentDirPath;
}