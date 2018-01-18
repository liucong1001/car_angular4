import { Pipe, PipeTransform } from '@angular/core';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { Permissionmap } from './../../../@core/model/system/permissionmap';
import { window } from 'rxjs/operators/window';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({name: 'permTreeNode'})
export class ToPermTreeNode implements PipeTransform {
    transform(perm: Permissionmap[]): TreeNode  {
        function tree(json) {
            const item = [];
            json.forEach((p) => {
                      item.push({
                        ...p,
                        label: p.name,
                        data: p.code,
                        icon: 'fa-folder',
                        children: tree(p.subPermissons),
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                    });
                 });
                 return item;
        }

       const treeData = tree(perm);
        return treeData  ;
    }
}
