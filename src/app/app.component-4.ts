import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';

// treeeeee
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  matDialogAnimations,
  MatDialogConfig,
} from '@angular/material/dialog';

// table controls
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';
// for the tables testing
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

// for the tables testing
export interface UserData {
    dcombobox: string;
    dcombobox_Check: string;
    dtextbox: string;
    dradio_btn: string;
    dcheck: string;
    dtoggle: string;
  detailRow: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component-4.html',
  styleUrls: ['./app.component-4.css'],
})
export class AppComponent4 implements AfterViewInit{
  displayedColumns: string[] = [
    'dcombobox',
    'dcombobox_Check',
    'dtextbox',
    'dradio_btn',
    'dcheck',
    'dtoggle',
  ];
  clickedRows = new Set<UserData>();
  dataSource = new MatTableDataSource<UserData>();
  leng = 10;
  pgsize = 0;
  dialog_leng=10;
  dialog_pgsize=0;
  filter_dcombobox: any = [];
  filter_dcombobox_Check: any = [];
  filter_dtextbox: any = [];
  filter_dradio_btn: any = [];
  filter_dcheck: any = [];
  filter_dtoggle: any = [];

  expandedElement: UserData | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'detailRow'];
  callmain() {
    this.router.navigate(['/main']);
  }

  isExpansionDetailRow = (index: number, row: any) =>
    row.hasOwnProperty('detailRow');
  isRowExpanded(row: UserData): boolean {
    return this.expandedElement === row;
  }

  expandRow(event: MouseEvent, row: any) {
    // Find the index of the row in the data source
    event.stopPropagation();
    const index = this.dataSource.data.indexOf(row);
    console.log(index + 1);
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  // initaion for sorting and pagintaing for the tables
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // row click function for the tables
  rowclick(event: MouseEvent, row: any) {
    // Find the index of the row in the data source
    event.stopPropagation();
    const index = this.dataSource.data.indexOf(row);
    console.log(index + 1);
    this.expandedElement = this.expandedElement === row ? null : row;
    // add or remove the clicked row from the set
  }
  getData_forthetable_http() {
    return this.http.get<any>('http://localhost:5241/api/TreeData/newww');
  }
  ngAfterViewInit(): void {
    this.getData_forthetable_http().subscribe((data) => {
      console.log('data-------');
      this.dataSource.data = data;
      console.log("-----------------------------------------------0000000000000")
      console.log(JSON.stringify(this.dataSource.data));
      this.onSelectChange2(5)
      this.cd.detectChanges()
      this.dataSource.sort=this.sort;
      this.filter_call()
    });

  }
  select_rowclick(event: MouseEvent, row: any) {
    // add or remove the clicked row from the set
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
    console.log((this.clickedRows))
  }

  // on start code initiation
  ngOnInit() {
    // filtration on loading
    this.filter_call();
  }
  filter_call(){
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcombobox.includes(uu.dcombobox)) {
        this.filter_dcombobox.push(uu.dcombobox);
      }
    }

    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcombobox_Check.includes(uu.dcombobox_Check)) {
        this.filter_dcombobox_Check.push(uu.dcombobox_Check);
      }
    }
    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.filter_dtextbox.includes(uu.dtextbox)) {
        this.filter_dtextbox.push(uu.dtextbox);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dradio_btn.includes(uu.dradio_btn)) {
        this.filter_dradio_btn.push(uu.dradio_btn);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcheck.includes(uu.dcheck)) {
        this.filter_dcheck.push(uu.dcheck);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dtoggle.includes(uu.dtoggle)) {
        this.filter_dtoggle.push(uu.dtoggle);
      }
    }
  }
  title = 'ttt';
  users_out: any;
  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private Dialog1: MatDialog,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dataservice: DataService
  ) {
    this.fortreedataSource.data = this.TREE_DATA;
    const users: any = this.dataservice.getData_table();
    this.dataservice.getData().subscribe((data) => {
      console.log('data-------');
      this.fortreedataSource.data = data;
      console.log(JSON.stringify(this.fortreedataSource.data));
    });
    this.users_out = users;
  }
  getfromtree_function_node(name: any, node: any) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(this.users_out);
    this.leng = 5;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;

    console.log(name);
  }
  getfromtree_function(name: any, node: any) {
    if (this.fortreetreeControl.isExpanded(node)) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = new MatTableDataSource(this.users_out);
      this.leng = 2;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;
      const element =
        this.elementRef.nativeElement.querySelector('.right-section');

      // Add or remove the CSS class
      //this.renderer.addClass(element, 'hidden');
      this.renderer.removeClass(element, 'hidden');
    } else {
      let emty: any = [];
      //this.users_out = [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = new MatTableDataSource(emty);
      this.leng = 0;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;

      const element =
        this.elementRef.nativeElement.querySelector('.right-section');

      // Add or remove the CSS class
      this.renderer.addClass(element, 'hidden');
      // this.renderer.removeClass(element, 'hidden');
    }
    console.log(name);
  }
  calloninit() {
    this.leng = 15;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;
    console.log('clicked');
  }
  // applying the filter to the tablev
  empty_data: any = [];
  // filters fro dropdowns
  applyFilter3(column: string, event: any) {
    const filterValue = this.empty_data;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //filters for textboxes
  applyFilter2(column: string, event: any) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // on chsnge of the filter
  onSelectChange2(event: any) {
    // handle the change event here
    if (!event) {
      event = 1;
    } else {
      //nothing
    }
    this.leng = event;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;

    console.log('Selected value:', event);
  }
  // filtering for all
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // //////////////////////////////tree controls //////////////////////////////////
  // contructor   =>     this.fortreedataSource.data = this.TREE_DATA;
  TREE_DATA: TreeNode[] = [];
  fortreetreeControl = new NestedTreeControl<TreeNode>((node) => node.Children);
  fortreedataSource = new MatTreeNestedDataSource<TreeNode>();
  hasChild = (_: number, node: TreeNode) =>
    !!node.Children && node.Children.length > 0;
  parentNode: any;
  // change for the textboxexs
  selectedType: string = ''; // for textbox1
  find_parent(event: any) {
    let newdat = this.fortreedataSource.data;
    let inputValue = event;
    this.parentNode = this.findNode(inputValue, newdat);
    if (this.parentNode === 0 && event != '') {
      this.parentNode = ['null'];
    }
    let parentNodeWithZeros = this.parentNode.map((value: any) =>
      value === null ? 0 : value
    );
    this.parentNode = parentNodeWithZeros;
    console.log('getting the node ----');
    console.log(this.parentNode);
    console.log('Gotten ----');
    console.log(JSON.stringify(newdat));
  }
  // find the node parentid in the list //// can be modified to get also the id throught adding (node.Id)
  findNode(name: string, nodes: TreeNode[]): any {
    let result: any = [];
    for (let node of nodes) {
      if (node.name === name) {
        result.push(node.ParentId);
      }
      if (node.Children) {
        result.push(...this.findNode(name, node.Children));
      }
    }
    return result;
  }
  expandNode(node: any) {
    console.log('expandNode called with node:', node);
  }

  onTypeChange(value: any) {
    return value;
  }
  lengg: any;
  selectedType2: any;
  opendialog_function(dialog_name: any) {
    const dialog_configurtion = new MatDialogConfig();
    dialog_configurtion.autoFocus = true;
    dialog_configurtion.width = 'auto';
    dialog_configurtion.height = 'auto';
    let ref = this.Dialog1.open(dialog_name, dialog_configurtion);
    ref.afterOpened().subscribe(() => {
      console.log('Dialog opened');
      this.dataSource.sort=this.sort;
      this.dialog_leng = this.dataSource.data.length;
      this.paginator.length=this.dialog_pgsize;
      this.paginator.pageSize = this.dialog_leng;
      this.dataSource.paginator = this.paginator;

    });

    ref.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      this.leng = 5;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;

    });
    }
  //['dcombobox', '', '', '', '', ''];
  options = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  fn_savedt(){
    console.log(JSON.stringify(this.dataSource.data))
  }
  goten_value_dcombobox_Check: any = [];
  goten_value_dradio_btn: any = [];
  goten_value_dcheck:any =[];
  get_from_html_function(): UserData {
    let value_dcombobox = document.getElementById('value_dcombobox') as HTMLInputElement;
    let goten_value_dcombobox = value_dcombobox.value;



      let value_dtextbox = document.getElementById('value_dtextbox') as HTMLInputElement;
      let goten_value_dtextbox = value_dtextbox.value;

    let phrase = this.goten_value_dcombobox_Check.join('","')

    let phrase_1 = (this.options.filter((option, index) => this.goten_value_dcheck[index]))
    console.log(this.goten_value_dcombobox_Check)
    console.log('---------')
    console.log(phrase)

     return {
       dcombobox:goten_value_dcombobox,
       dcombobox_Check:(`"${phrase}"`),
       dtextbox:goten_value_dtextbox,
       dradio_btn:this.goten_value_dradio_btn,
       dcheck:(`"${phrase_1}"`),
       dtoggle:'testing',
       detailRow:false,
    };
  }
 l: number = 1;
  error: any ='';
  save_from_html_function(){
    let data = this.get_from_html_function();
    if (this.goten_value_dcombobox_Check.length === 0) {
      // this.goten_value_dcombobox_Check is empty
      this.error='*missing'
    } else {
      this.error=''
      // this.goten_value_dcombobox_Check is not empty
      for (let value of this.goten_value_dcombobox_Check) {
        let newData = {...data};
        newData.dcombobox_Check = value + ' - ' + this.l;
        this.dataSource.data.push(newData);
        this.l=this.l +1
      }
    }

    this.dataSource.sort=this.sort;
    this.filter_call()
    this.onSelectChange2(5)
    this.cd.detectChanges()

  }
   datttt :any;

  save_from_html_todb_function(){
    console.log(JSON.stringify(this.dataSource.data));
    this.datttt = (this.dataSource.data);

    this.http
      .post<any>('http://localhost:5241/api/TreeData/newww', this.datttt)
      .subscribe({
        next: (data) => {
          //// <== old code
          console.log('POST request successful', data);
        },
        error: (error) => {
          console.error('POST request failed', error);
        },
      });
  }
  error_check(){
    if (this.goten_value_dcombobox_Check.length=== 0){
      this.error='*missing'
    }else{
      this.error=''
    }
  }

}

// tree ///// for tree data initiaion
export interface TreeNode {
  Id: any;
  name: any;
  ParentId: number | any;
  Children?: TreeNode[] | any;
}
