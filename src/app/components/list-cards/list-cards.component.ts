/**
 * Este componente lista el modo de juego seleccionado así como las distintas tarjetas almacenadas en el API de CENTIC.
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Router } from '@angular/router';
import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from './../../app.constants';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  public cards: Card[] = [];
  public altImageURL: string = "../../../assets/images/imgNotFound.png";
  public gameMode: string;

  private tickTime: number;
  public success: boolean = false;

  constructor(private apiConectionService: ApiConectionService, private router: Router ) {
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {
    this.recuperateConfig();
    this.createArrayItems();
  }

  uploadConfig(config: string){
    this.apiConectionService.putConfig(config).subscribe(), err => { this.router.navigateByUrl('home/error'); };
    this.gameMode = config;
  }

  recuperateConfig(){
    /*
    Esta función recupera la configuración de juego del API y las guarda gameMode.
    */
    //this.gameMode =  
    this.apiConectionService.getConfig().subscribe(info => {
      this.gameMode = JSON.parse(info['_body'])['id'];
    }), err => { this.router.navigateByUrl('home/error'); };
  }

  createArrayItems(){
    /*
    Esta función recupera las tarjetas del API y las guarda en el array cards.
    */
    this.apiConectionService.getAllCards().subscribe(info => {
      var aux = JSON.parse(info['_body']);
      for(let i=0; i<aux.length; i++){
        this.cards.push(aux[i]);
      }
    });
  }

  deleateById(id){
    /*
    Esta función elimina la tarjeta seleccionada.
    */
    this.apiConectionService.removeCard(this.cards[id]._id).subscribe(info => {
        console.log(info);
      }), err => { this.router.navigateByUrl('home/error'); };

      this.tickTime = 1;
      this.success = true;
  }

  toggleVisibility(id){
    /*
    Esta función cambia la visibilidad de la tarjeta deleccionada. Es decir, si el valor publish de una tarjeta es true
    lo pone a false y viceversa.
    */
   let card: Card = {
      "_id": this.cards[id]._id,
      "time": this.cards[id].time,
      "clue": this.cards[id].clue,
      "solution": this.cards[id].solution,
      "imageURL": this.cards[id].imageURL,
      "publish": !this.cards[id].publish
   };
   this.apiConectionService.updateCard(card).subscribe(), err => { this.router.navigateByUrl('home/error'); };
   
   this.tickTime = 1;
   this.success = true;
  }

  getImage(id){
    /*
    Esta función concatena la url de la imágen con la url base almacenada en app.constants.ts.
    */
    return BASE_URL + this.cards[id].imageURL;
  }

  editCard(id){
    /*
    Esta función redirecciona a la página de edición de tarjetas.
    */
    localStorage.setItem("editCardId", this.cards[id]._id);
    this.router.navigateByUrl('home/edit-card');
  }

  private tick(): void{
    /*
    Función para recargar las tarjetas.
    */
    if((this.tickTime > 0) && (this.success)){
      this.tickTime--;
    } else if((this.tickTime <= 0) && (this.success)){
      this.success = false;
      this.cards = [];
      this.createArrayItems();
    }
  }

}
