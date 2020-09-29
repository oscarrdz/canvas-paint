import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  
 @ViewChild('imageCanvas', {static: false}) canvas:any;
  canvasElement:any;
  saveX:number;
  saveY:number;
  
  drawing=false;

  selecttedColor='red';
  colors=['red','blue','black','green','lime','yellow']
  lineWidth=5;



  constructor(private plit: Platform) {}
  ngAfterViewInit(){
    this.canvasElement=this.canvas.nativeElement;
    this.canvasElement.width=this.plit.width()+'';
    this.canvasElement.height=500;
  }

  selectorColor(color){
    this.selecttedColor=color
  }
startDrawing(ev){
//console.log('start ',ev);
this.drawing=true;
const canvasPosition =this.canvasElement.getBoundingClientRect();
//console.log(canvasPosition);

this.saveX=ev.touches[0].pageX-canvasPosition.x;
this.saveY=ev.touches[0].pageY-canvasPosition.y;
console.log(this.saveY);
}
endDrawing(){
console.log('end ');
this.drawing=false;
}
moved(ev){
  if(!this.drawing) return;
console.log('move: ',ev);

const canvasPosition =this.canvasElement.getBoundingClientRect();
//console.log(canvasPosition);
let ctx=this.canvasElement.getContext('2d');

let currentX=ev.touches[0].pageX-canvasPosition.x;
let currentY=ev.touches[0].pageY-canvasPosition.y;
console.log(currentY);

ctx.lineJoin='round';
ctx.strokeStyle=this.selecttedColor;
ctx.lineWidth =this.lineWidth;

ctx.beginPath();
ctx.moveTo(this.saveX,this.saveY);
ctx.lineTo(currentX,currentY);
ctx.closePath();

ctx.stroke();

this.saveX=currentX;
this.saveY=currentY;
}


}
