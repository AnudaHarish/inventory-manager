import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {NbDialogService} from '@nebular/theme';

interface Sale {
  date: string;
  name: string;
  quantity: number;
  discount: number;
  price: number;
}

@Component({
  selector: 'ngx-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

export class SalesComponent implements OnInit {
  salesFormGroup: FormGroup;
  product: FormControl;
  options: string[];
  filteredControlOptions$: Observable<string[]>;
  salesRecords: Sale[] = [];
  total: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private dialogService: NbDialogService) {}
  ngOnInit() {
    this.salesFormGroup = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(0),
      discount: new FormControl(0),
      price: new FormControl({value: 0, disabled: true}),
    });
    this.getNameControl();
    this.options = ['option 1', 'option 2', 'option 3', 'option 4'];
    this.filteredControlOptions$ = of(this.options);
    this.product = new FormControl();
    this.filteredControlOptions$ = this.getNameControl().valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getNameControl(): FormControl {
    const formControl = this.salesFormGroup?.controls?.name;
    return <FormControl<any>>formControl;
  }

  addToSalesArr() {
    const formValue = this.salesFormGroup.getRawValue();
    const name = formValue?.name;
    const quantity = formValue?.quantity;
    const discount = formValue?.discount;
    const price = formValue?.price;
    this.salesRecords.push({
      date: this.getCurrentDateTime(),
      name: name,
      quantity: quantity,
      discount: discount,
      price: price,
    });
    this.salesFormGroup.reset({
      name: '',
      quantity: 0,
      discount: 0,
      price: 0,
    });
    this.cd.detectChanges();
    console.log(this.salesFormGroup.value);
  }

  getTotal() {
    this.salesRecords.forEach(sale => this.total += sale.price);
    return this.total;
  }

  getCurrentDateTime(): string {
    return this.datePipe.transform(new Date, 'yyyy-MM-dd HH:mm:ss');
  }

  openDialog(template: any) {
    this.dialogService.open(template);
  }
}
