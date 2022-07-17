import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor {
  val: any; // this is the updated value that the class accesses
  selectValue: any; /* Select box selected placeholder */
  multiValue: any = []; /* Storing multiple values when multi=true */

  /* To hide dropdown when clicked outside */
  @HostListener("document:click", ['$event']) resetToggle(event: any) {
    if(!this.el.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
  @Input() placeHolder: string = 'Select'; /* placeholder for input */
  @Input() bindLabel: any | undefined; /* To configure label for select box */
  @Input() bindValue: string = '';
  @Input() multi: boolean = false; /* to show multiple select */
  @Output() onSelect = new EventEmitter(); /* sending data when select an item */
  items: any = [];
  showDropdown: boolean = false;
  @Input() set list(data: any) {
    if(data) {
      this.items = data;
    }
  }
  constructor(private el: ElementRef) { }
  onChange: any = () => {}
  onTouch: any = () => {}
      set value(val: string){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
        this.val = val
        !this.val ? this.selectValue = null: null;
        this.onChange(val)
        this.onTouch(val)
      }
    // this method sets the value programmatically
    writeValue(value: any){
      this.value = value
    }
    // upon UI element value changes, this method gets triggered
    registerOnChange(fn: any){
      this.onChange = fn
    }
    // upon touching the element, this method gets triggered

    registerOnTouched(fn: any){
      this.onTouch = fn
    }
  /* Emit value normal select box */
  setValue($event: MouseEvent, value: any) {
    $event.preventDefault();
    this.value = value[this.bindValue];
    this.selectValue = value[this.bindLabel[0]]
    this.onSelect.emit({value: value[this.bindValue]})
    this.showDropdown = false;
  }
 /* Multiple selection logic */
  multiValueChange(item: any, checkBox: HTMLInputElement) {
    if (checkBox.checked) {
      item.checked = true;
      this.multiValue.push(item[this.bindValue]);
    } else {
      item.checked = false;
      this.multiValue.splice(this.multiValue.findIndex((x: any) => x === item[this.bindValue]), 1);
      checkBox.value = '';
    }
    this.value = this.multiValue;
    this.selectValue = this.multiValue.join(', ');
    this.onSelect.emit({value: this.multiValue})
  }

  openDropdown() {
    this.showDropdown = true
  }
}
