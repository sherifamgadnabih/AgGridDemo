import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  columnDefs: any[]
  gridApi: any;
  gridColumnApi: any;
  rowData: any[];
  pagination = {
    currentPage: 1,
    lastRow: null,
    pageSize: 10,
    lastpageNumber: 1

  };
  filterString: string;
  sortString: string = '';
  sortDirection: string;
  constructor(private productService: ProductService) {

  }

  loadData(filter?: string, sortString?: string) {
    this.productService.getProducts(1000000000, "&page=" + this.pagination.currentPage + ("&filter=" + (filter ? filter : '')) + "&Sorting=" + (sortString ? sortString : '')).subscribe((res: any) => {
      this.columnDefs = [];
      if (res.fieldInfo) {
        res.fieldInfo.forEach((field: any) => {
          this.columnDefs.push({ headerName: field.PropertyName, field: field.PropertyName.charAt(0).toLowerCase() + field.PropertyName.slice(1), filterParams: { applyButton: true } })
        })
      }
      this.rowData = res.data;
    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData(this.filterString, this.sortString);
  }
  ngOnInit(): void {

  }
  onFilterModified($event) {
    let filter = $event.api.getFilterModel();
    this.filterString = '';
    Object.keys(filter).forEach((key: string) => {
      if (!this.filterString) {
        this.filterString = key + '=' + '"' + (filter[key]['filter']).toString() + '"';
      }
      else {
        this.filterString += 'and' + key + '=' + '"' + (filter[key]['filter']).toString() + '"';
      }
    })
  }
  onFilterChanged() {
    this.loadData(this.filterString);
  }
  onSortChanged($event: any) {
    let sort = $event.api.getSortModel();
    let prop = sort[0]['colId'];
    if (prop.indexOf('1') != -1) {
      prop = prop.substr(0, prop.length - 2);
    }
    if (!this.sortDirection) {
      this.sortDirection = sort[0].sort;
    }

    if (this.sortString.indexOf(prop) > -1) {
      this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
    }
    this.sortString = this.sortDirection != "asc" ? "-" + prop : prop;
    this.loadData(this.filterString, this.sortString)
  }
  onPaginationChanged() {
    if (this.gridApi) {
      this.pagination.currentPage = this.gridApi.paginationGetCurrentPage() + 1;
      if (this.pagination.lastpageNumber != this.pagination.currentPage) {
        this.pagination.lastpageNumber = this.pagination.currentPage;
        this.loadData(this.filterString, this.sortString);
      }
    }
  }
  openDialog(event) {
    console.log(event);
    //let modal = this.modalService.open(QuickViewModal);
  }
};

@Component({
  selector: 'quickview',
  template: `
<div>test</div>
`,

})
export class QuickViewModal {

}

