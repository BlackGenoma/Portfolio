import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mint-page';

  @ViewChild('imgPreview')
  imgRef!:ElementRef;

  inputUrlHandler(event:any){
    this.imgRef.nativeElement.src = event.target.value;
  }
}
