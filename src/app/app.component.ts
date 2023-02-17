import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  GridComponent,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  /*
   * Set a fixed row height of 36px (20px line height, 2 * 8px padding)
   *
   * [row height] = [line height] + [padding] + [border]
   *
   * Note: If using the Kendo UI Material theme, add 1px to the row height
   * to account for the bottom border width.
   */
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
        .k-grid tbody td {
            white-space: nowrap;
            line-height: 20px;
            padding: 8px 12px;
        }
    `,
  ],
  template: `
  <div>
     <button (click)="scrollPrev($event)">Prev</button>
     <button (click)="scrollNext($event)">Next</button>
  </div>
     
      <kendo-grid #pocGrid
          [data]="gridView"
          [skip]="skip"
          [pageSize]="pageSize"
          scrollable="virtual"
          [selectedKeys]="gridSelection"
          kendoGridSelectBy="id"
          [rowHeight]="36"
          [height]="450"
          (pageChange)="pageChange($event)"
          (selectedKeysChange)="gridSelectedKeyChange($event)"
          [navigable]="true"
        >
        <kendo-grid-column field="id" [width]="80" title="ID"></kendo-grid-column>
        <kendo-grid-column field="firstName" title="First Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="lastName" title="Last Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="city" title="City" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="title" title="Title" [width]="180"></kendo-grid-column>
      </kendo-grid>
  `,
})
export class AppComponent {
  public gridView: GridDataResult;
  public data: unknown[];
  public pageSize = 100;
  public skip = 0;
  public gridSelection: number[] = [];

  @ViewChild('pocGrid') pocGridComponent: GridComponent;

  constructor() {
    this.gridView = {
      data: [],
      total: 0,
    };
    this.data = this.createRandomData(100000);
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.gridSelection = [];
    this.gridSelection.push(1);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: this.data.slice(this.skip, this.skip + this.pageSize),
      total: this.data.length,
    };
  }

  public gridSelectedKeyChange(e) {
    console.log('grid selection' + e);
    this.gridSelection = e;
  }

  public scrollPrev(e) {
    var prevElement = this.gridSelection[0] - 1;
    this.gridSelection = [];
    this.gridSelection.push(prevElement);
    this.pocGridComponent.scrollTo({ row: prevElement - 1, column: 0 });
  }

  public scrollNext(e) {
    console.log(e);
    var nextElement = this.gridSelection[0] + 1;
    this.gridSelection = [];
    this.gridSelection.push(nextElement);
    this.pocGridComponent.scrollTo({ row: nextElement - 1, column: 0 });
  }

  /* Generating example data */
  private createRandomData(count: number): unknown[] {
    const firstNames = [
        'Nancy',
        'Andrew',
        'Janet',
        'Margaret',
        'Steven',
        'Michael',
        'Robert',
        'Laura',
        'Anne',
        'Nige',
      ],
      lastNames = [
        'Davolio',
        'Fuller',
        'Leverling',
        'Peacock',
        'Buchanan',
        'Suyama',
        'King',
        'Callahan',
        'Dodsworth',
        'White',
      ],
      cities = [
        'Seattle',
        'Tacoma',
        'Kirkland',
        'Redmond',
        'London',
        'Philadelphia',
        'New York',
        'Seattle',
        'London',
        'Boston',
      ],
      titles = [
        'Accountant',
        'Vice President, Sales',
        'Sales Representative',
        'Technical Support',
        'Sales Manager',
        'Web Designer',
        'Software Developer',
      ];

    return Array(count)
      .fill({})
      .map((_, idx) => ({
        id: idx + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
      }));
  }
}
