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
  const wrapClassName = name.toLowerCase()+'-wrap';
  const str =
`${fileHeaderText}import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import pureRender from 'pureRender-mj';
import classNames from 'classnames';
import './${name.toLowerCase()}.scss';

@pureRender()
class ${componentName} extends Component {
  static propTypes = {
    className:PropTypes.string
  }
  static defaultProps = {}
  static contextTypes = {}
  constructor(props){
    super(props);
    autoBind(this);
  }
  getChildContext(){}
  componentWillMount(){}
  componentDidMount(){}
  componentWillReceiveProps(){}
  //shouldComponentUpdate(){}
  componentWillUpdate(){}
  componentDidUpdate(){}
  componentWillUnmount(){}
  render() {
    const {className} = this.props;
    const wrapCls = classNames('${wrapClassName}',className);
    return (
      <div className={wrapCls}>
        ${name} text
      </div>
    )
  }
}

export default ${componentName};`;
  fs.writeFileSync(componentPath, str);
  toast.success(`react component：${name}创建成功`);
}
