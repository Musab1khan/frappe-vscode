import type { EventEmitter } from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';
import { FrappeApp } from './models/FrappeApp';
import type { CustomTreeItem } from './views/apps_provider';

export class TreeViewHelper {
    serverIntialized: boolean = false;
    onDidChangeAppTreeData?: EventEmitter<void | CustomTreeItem | CustomTreeItem[] | null | undefined>;
    constructor(public client: LanguageClient) {
        this.client.onNotification('frappe/parser_intiliazed', (...params: any[]) => this.handleIntializer(params));

    }
    handleIntializer(_params: any[]) {
        this.serverIntialized = true;
        this.onDidChangeAppTreeData?.fire(undefined);
    }
    async getDataFromServer() {

        const data = await this.client.sendRequest<FrappeApp[]>('frappe/get_data', { 'dataType': 'app' });

        return data;
    }


}