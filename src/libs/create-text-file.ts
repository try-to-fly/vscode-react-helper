import fs = require("fs");
import path = require("path");
const upperCamelCase = require("uppercamelcase");
import { toast } from "./toast";

export const createTestFile = (
  name: string,
  dirPath: string,
  fileHeaderText: string
) => {
  const testDirPath = path.resolve(dirPath,'__test__');
  fs.mkdirSync(testDirPath);
  const testFilePath = path.resolve(testDirPath, name + ".test.js");
  const componentName = upperCamelCase(name);
  const str = `${fileHeaderText}import React from 'react';
import {shallow,render,mount} from 'enzyme';
import ${componentName} from '../';

describe('测试${componentName}组件',()=>{
    it("测试快照", () => {
      const wrapper = shallow(<${componentName} />);
      expect(wrapper).toMatchSnapshot();
    });
})
`;
  fs.writeFileSync(testFilePath, str);
  toast.success(`react component:${name}测试文件创建成功`);
};
