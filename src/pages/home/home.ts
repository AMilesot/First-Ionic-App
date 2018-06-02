import { Component } from '@angular/core';
import {ANIMALES} from "../../data/data.animales";
import {Animal} from "../../interfaces/animal.interface";
import {Refresher , reorderArray} from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales :  Animal[] = [];
  audio = new Audio();
  tiempo:any;
  ordenando:boolean=false;

  constructor() {

    this.animales = ANIMALES.slice(0);
    
  }

  public reproducir (animal : Animal)
  {
    this.pausarAudio(animal);
    if(animal.reproduciendo)
    {
      animal.reproduciendo = false;
      return;
    }
    console.log(animal);
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.tiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000 );
  }

  private pausarAudio(animalActual:Animal)
  {
    clearTimeout(this.tiempo);
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let animal of this.animales) 
    {
      if(animal.nombre != animalActual.nombre)
      {
        animal.reproduciendo =  false;
      }
    }

  }
  
  private BorrarPet(x:number)
  {
    this.animales.splice(x , 1);
  }

  private recargar(refresher:Refresher)
  {
    console.log("Iniciando recarga");
    setTimeout( ()=>{
      console.log("Termino de cargar");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    },1500)
    
  }

  private reordenar(algo:any)
  {
    console.log(algo);
    this.animales = reorderArray(this.animales, algo);
  }

}
