import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {CodeitemService} from '../../data/system/codeitem.service';
@Component({
  selector: 'ngx-ys-codeitem-droplist',
  templateUrl: './codeitem-droplist.component.html',
  styleUrls: ['./codeitem-droplist.component.scss'],
})
export class CodeitemDroplistComponent implements OnInit {
  items: SelectItem[] = [];
  @Input() codeMap = '';
  @Input() pleaseSelect = '请选择';
  @Output() _selectedValue = new EventEmitter();
  constructor(private codeitem: CodeitemService) {
  }

  ngOnInit() {
    this.codeitem.convert(this.codeMap).then((res) => {
      this.items.push({label: this.pleaseSelect, value: null});
      for (let r in res) {
        this.items.push({label: res[r], value: r});
        // console.log(r + ' ' + res[r]);
      }
    });
  }
  _onChange(event) {
    this._selectedValue.emit(event.value);
  }
}
