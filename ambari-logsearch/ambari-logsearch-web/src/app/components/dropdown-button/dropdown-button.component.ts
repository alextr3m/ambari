/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, OnInit, Input} from '@angular/core';
import {ListItem} from '@app/classes/list-item';
import {ComponentActionsService} from '@app/services/component-actions.service';
import {UtilsService} from '@app/services/utils.service';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.less']
})
export class DropdownButtonComponent implements OnInit {

  constructor(protected actions: ComponentActionsService, protected utils: UtilsService) {
  }

  ngOnInit() {
    this.selectedLabel = this.defaultLabel;
  }
  
  @Input()
  label?: string;

  @Input()
  iconClass?: string;

  @Input()
  hideCaret: boolean = false;

  @Input()
  showSelectedValue: boolean = true;

  @Input()
  options?: ListItem[];

  @Input()
  defaultValue?: string;

  @Input()
  defaultLabel?: string;

  @Input()
  action?: string;

  @Input()
  additionalArgs: any[] = [];

  @Input()
  isMultipleChoice: boolean = false;

  @Input()
  isRightAlign: boolean = false;

  @Input()
  isDropup: boolean = false;

  protected selectedValue?: any;

  selectedLabel: string;

  get value(): any {
    return this.selectedValue;
  }

  set value(value: any) {
    this.selectedValue = value;
  }

  updateValue(eventOptions: ListItem): void {
    const value = eventOptions && eventOptions.value,
      action = this.action && this.actions[this.action];
    if (this.isMultipleChoice) {
      this.value = this.utils.updateMultiSelectValue(this.value, value, eventOptions.isChecked);
      this.options.find(item => item.value === value).isChecked = eventOptions.isChecked;
      if (action) {
        action(this.options.filter(item => item.isChecked).map(item => item.value), ...this.additionalArgs);
      }
    } else {
      if (this.utils.valueHasChanged(this.value, value)) {
        this.value = value;
        this.selectedLabel = eventOptions.label;
        if (action) {
          action(this.value, ...this.additionalArgs);
        }
      }
    }
  }
  
}
