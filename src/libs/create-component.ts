import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 * 创建react component
 * @param name 组件名称
 * @param path 组件路径
 */
export const createComponent = (name: string, dirPath: string,fileHeaderText:string) => {
  const componentPath = path.resolve(dirPath, 'index.js');
  const componentName = upperCamelCase(name);
  const str =
`${fileHeaderText}import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import './${name}.scss';

export class ${componentName} extends Component {
  static propTypes = {}
  static defaultPropTypes = {}
  
  componentDidMount(){}
  render() {
    return (
      <div className="${name}-wrap">
        ${name} text
      </div>
    )
  }
}`;
  fs.writeFileSync(componentPath, str);
  toast.success(`react component：${name}创建成功`);
}