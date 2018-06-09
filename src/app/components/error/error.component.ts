/**
 * Se redirigirá a este componente cuando se produzca algún tipo de error
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
