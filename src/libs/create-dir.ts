import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 *
 * @param dirPath 当前目录路径
 * @param name 组件名称
 */
export const createDir = (dirPath: string, name: string): string => {
  const componentName = upperCamelCase(name);
  const componentDirPath = path.resolve(dirPath, componentName);
  let isComponentExit = fs.existsSync(componentDirPath);
  if (isComponentExit) {
    return void toast.error(`该目录:${componentDirPath}已存在，无法继续创建组件。`)
  }
  fs.mkdirSync(componentDirPath);
  return componentDirPath;
}
