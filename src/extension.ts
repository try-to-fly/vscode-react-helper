'use strict';
import * as vscode from 'vscode';
import { toast, createComponent, createDir, createScss } from './libs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.createReactComponent', (target) => {
        const { fsPath } = target;
        vscode.window.showInputBox({ prompt: '请输入组件名称' })
            .then((name => {
                name = (name || '').trim();
                if (!name) {
                    return void toast.error('无效的组件名称');
                }
                let componentDir = createDir(fsPath, name);
                if (!componentDir) return;
                createComponent(name, componentDir);
                createScss(name, componentDir);
            }), (err) => {
                console.log(err);
            })
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }