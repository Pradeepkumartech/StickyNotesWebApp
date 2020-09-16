import { Component, EventEmitter, Output, ElementRef, ɵConsole } from '@angular/core'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageStickNotesService } from '../../Services/manage-stick-notes.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manage-sticky-notes',
  templateUrl: './manage-sticky-notes.component.html',
  styleUrls: ['./manage-sticky-notes.component.css']
})
export class ManageStickyNotesComponent {
  recognition: any;
  notes = [];
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  webkitSpeechRecognition: any;
  colorsArray: any;
  bgColorClass: string;
  closeResult: string;
  constructor(private el: ElementRef, private modalService: NgbModal, private _manageStickNotesService: ManageStickNotesService) {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event) => {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript)
      document.getElementById('toolbar').focus();
    };

  }


  ngOnInit(): void {
    this.colorsArray = [
      {
        color: "yellow",
        id: 1
      },
      {
        color: "blue",
        id: 2
      },
      {
        color: "red",
        id: 3
      },
      {
        color: "green",
        id: 4
      },
      {
        color: "orange",
        id: 5
      },
      {
        color: "white",
        id: 6
      }
    ];
  }

  nodeId: number = 1;
  setColor(event) {
    var selectColorId = event.srcElement.parentElement.getAttribute('id');
    this.nodeId = Number(event.srcElement.parentElement.parentElement.getAttribute('id'));
    if (selectColorId == "1") {
      this.bgColorClass = "yellow";
    }
    else if (selectColorId == "2") {
      this.bgColorClass = "blue";
    }
    else if (selectColorId == "3") {
      this.bgColorClass = "red";
    }
    else if (selectColorId == "4") {
      this.bgColorClass = "green";
    }
    else if (selectColorId == "5") {
      this.bgColorClass = "orange";
    }
    else if (selectColorId == "6") {
      this.bgColorClass = "white";
    }

    this.notes.forEach(element => {
      element.id == this.nodeId ? element.colorname = this.bgColorClass : '';
    });
  }

  open(content) {
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  wowItGotIt(data) {
    console.log(data);
  }
  onDismiss(event) {
    this.dismiss.emit(event);
    this.zindex = this.zindex + 10;
    event.target.parentElement.style.zIndex = this.zindex;
  }
  setzindex(event) {
    this.dismiss.emit(event);
  }
  onFocusOut(event) {
    this.focusout.emit(event)
  }

  record(event) {
    this.recognition.start();
  }


  addNote() {
    this.notes.push({ id: this.notes.length + 1, content: '', colorname: 'yellow', title: '' });
    // sort the array
    this.notes = this.notes.sort((a, b) => { return b.id - a.id });
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };

  entertitle(title, id) {
    this.notes.forEach(element => {
      element.id == id ? element.title = title : '';
    });
  }
  entercontent(content, id) {
    this.notes.forEach(element => {
      element.id == id ? element.content = content : '';
    });
  }

  saveNote(event) {
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const json = {
      'id': id,
      'content': '',
      'colorName': 'yellow',
      'title': ''
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  updateNote(newValue) {
    this.notes.forEach((note, index) => {
      if (note.id == newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  zindex = 99;
  deleteNote(event) {
    this.zindex = this.zindex + 10;
    event.target.style.zIndex = this.zindex;
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    this.notes.forEach((note, index) => {
      if (note.id == id) {
        this.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }

  SaveStickyNotes(note) {
    this._manageStickNotesService.SaveStickyNotes(note).subscribe(
      data => {
        if (data.isSuccess) {
          Swal.fire({
            title: data.message,
            icon: 'success',
            width: 500,
            padding: '4em',
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: data.message,
            text: 'Oops...',
            width: 500,
            padding: '4em',
          })
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Oops...',
          width: 500,
          padding: '4em',
        })
      }
    )
  }

 async GetStickyNotes(){
    this._manageStickNotesService.GetStickyNotes().subscribe(
      data=>{
        if (data.isSuccess) {
          console.log(data);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: data.message,
            text: 'Oops...',
            width: 500,
            padding: '4em',
          })
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Oops...',
          width: 500,
          padding: '4em',
        })
      }
    )
  }

}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}


