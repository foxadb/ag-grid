import { Component, ElementRef, ViewChild } from '@angular/core';

import type { IHeaderAngularComp } from 'ag-grid-angular';
import type { IHeaderParams } from 'ag-grid-community';

@Component({
    standalone: true,
    template: `
        <div style="display: flex">
            @if (params.enableFilterButton) {
                <span #menuButton class="ag-icon ag-icon-menu" (click)="onMenuClicked($event)"></span>
            }
            <div style="flex-grow: 1;">
                <span>{{ params.displayName }}</span>
            </div>
        </div>
    `,
})
export class CustomHeader implements IHeaderAngularComp {
    public params!: IHeaderParams;

    @ViewChild('menuButton', { read: ElementRef }) public menuButton!: ElementRef;

    agInit(params: IHeaderParams): void {
        this.params = params;
        console.log('CustomHeader.init() -> ' + this.params.column.getId());
    }

    refresh(params: IHeaderParams): boolean {
        this.params = params;
        console.log('CustomHeader.refresh() -> ' + this.params.column.getId() + ' returning ' + true);
        return true;
    }

    onMenuClicked() {
        this.params.showColumnMenu(this.menuButton.nativeElement);
    }
}
