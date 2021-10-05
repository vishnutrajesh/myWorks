import {Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DragNDropComponent),
      multi: true,
    },
  ],
})
export class DragNDropComponent implements ControlValueAccessor {
  @Input() set percentageUploaded(data: any) {
    if (data) {
      this.percentage = data;
      console.log('data', data)
    }
  }
  @Input() set dataTransfered(data: any) {
    if (data) {
      this.dataInfo = data;
      console.log('dataInfo', data)
    }
  }
  imageList: any = [];
  percentage: any = [];
  change= (event: any) => {};
  touched: any;
  dataInfo: any = [];
  isDisabled: boolean | undefined;
  @Output() dropEvent: EventEmitter<any> = new EventEmitter<any>();
  private file: FileList[] = [];
  invalidImg: boolean;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  @HostListener('change', ['$event']) emitFiles(event: any) {
    this.dropEvent.emit(event);
    const fileFromEvent = event.target.files;
    if (this.imageList.length === 0) {
      this.change?.(fileFromEvent);
      this.file = fileFromEvent;
      const docsArray = Array.from(this.file);
      docsArray.forEach((item, i) => {
        this.imageList.push(item);
      });
    } else {
      if (fileFromEvent.length > 0) {
        this.imageList.push(...Array.from(fileFromEvent));
        this.change(this.imageList);
        console.log(this.imageList);
      }
    }
  }


  @HostBinding('class') dashedBorder = 'border-dashed';

  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dashedBorder = 'border-dashed on-drop-hover';
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event'])
  public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dashedBorder = 'border-dashed';
  }

  // Drop Event
  seconds: number = 0;
  @HostListener('drop', ['$event'])
  public drop(event: any) {
    this.dropEvent.emit({ target: event.dataTransfer });
    event.preventDefault();
    event.stopPropagation();
    this.dashedBorder = 'border-dashed';
    const files = event.dataTransfer.files;
    if (this.imageList.length === 0 && files.length > 0) {
      this.change(files);
      this.file = files;
      const docsArray = Array.from(this.file);
      docsArray.forEach((item, i) => {
        this.imageList.push(item);
      });
    } else {
      console.log(event);
      this.imageList.push(...Array.from(event.dataTransfer.files));
      this.change(this.imageList);
    }
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = [];
    if (obj && obj.length > 0) {
      this.imageList = obj;
    }
  }

  removeFile(i: number) {
    this.imageList.splice(i, 1);
    this.change(this.imageList);
  }

  // getFormat(format: any) {
  //   let png: boolean = false;
  //   switch (format.type) {
  //     case 'image/png': {
  //       png = true;
  //     }
  //   }
  //   if (format.type === 'image/png' || format.type === 'image/jpeg' || format.type === 'image/jpg') {
  //     this.invalidImg = true;
  //   } else {
  //     this.invalidImg = false;
  //   }
  // }
  decimalAvoid(val: any) {
    return Number(val).toFixed();
  }

  invalidFile(fileList: any): boolean {
    return fileList.type !== 'image/png' && fileList.type !== 'image/jpeg' && fileList.type !== 'image/jpg'
  }
}
