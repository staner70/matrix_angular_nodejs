import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as math from 'mathjs';
import { Matrix } from '../interfaces/matrix';
import { MatrixService } from '../services/matrix.service';



@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  public historyMatrix: Matrix[]= [];
  private value: number = 0;
  
  constructor(private serviceMatrix:MatrixService) { }
  matris: Array<number> = [];
  matrix = Array(2).fill(0).map((x,i)=>i);
  matrice: Array<number> = [] ;
  ligne: Array<number> = [] ;
  tableau: Array<any> = [] ;
  resultat: any = 0;
  // model : Matrix = new Matrix();
 

 
 
  ngOnInit(): void {
    this.serviceMatrix.getMatrix().subscribe(data => {
     
      this.historyMatrix = data;
      console.log(this.historyMatrix);
      
      
      
    });
  }

  createMatrix(nombre:any){
    console.log(nombre);
    nombre = parseInt(nombre);
    this.matrix = Array(nombre).fill(0).map((x,i)=>i);
    console.log(this.matrix);
    
  }

  onKey(value: string){
    this.value = parseInt(value);

    if (!isNaN(this.value)) {
      this.matris.push(this.value);
    }
    if (!isNaN(this.value)  && this.matris.length == this.matrix.length) {
      this.tableau.push(this.matris);
      this.matris = [];
     
    }
    
    console.log(this.matris, this.tableau);
    
  }

  calcMatrix(form:NgForm){
    
    this.resultat = math.matrix(this.tableau);
    this.resultat = math.det( this.resultat);
    this.tableau.length = 0;
    console.log(this.tableau);
 
    
  }

  viderTable(){
   this.matrix.length = 0;
   
  }

}
