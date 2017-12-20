import { Areamap } from './../../../@core/model/system/areamap';
import { Pipe, PipeTransform } from '@angular/core';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { window } from 'rxjs/operators/window';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({name: 'areaTreeNode'})
export class ToAreaTreeNode implements PipeTransform {
    transform(perm: Areamap[]): TreeNode [] {
        function tree(json) {
            const item = [];
            json.forEach((p) => {
                      item.push({
                        ...p,
                        label: p.name,
                        data: p.code,
                        icon: 'fa-folder',
                        children: tree(p.childrens),
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                    });
                 });
                 return item;
        }

       const treeData = tree(perm);
        return treeData;
    }
}
