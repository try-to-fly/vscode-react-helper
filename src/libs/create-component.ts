import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 * 创建react component
 * @param name 组件名称
 * @param path 组件路径
 */
export const createComponent = (name: string, dirPath: string) => {
  const componentPath = path.resolve(dirPath, 'index.js');
  const componentName = upperCamelCase(name);
  const str =
`import React, { Component } from 'react';
import './${name}.css';

export class ${componentName} extends Component {
  render() {
    return (
      <div className="${name}-wrap">
        ${name} text
      </div>
    )
  }
  componentDidMount(){

  }
}`;
  fs.writeFileSync(componentPath, str);
  toast.success(`react component：${name}创建成功`);
}