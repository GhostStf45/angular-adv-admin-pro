import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //llamar a la promesa
    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    });



    // const promesa = new Promise((resolve, reject)=>{
    //   if(false)
    //   {
    //     resolve('Hola mundo');
    //   }else{
    //     //capturar el error
    //     reject('Algo salio mal');
    //   }

    // });
    // //resolver (subscribirse) promesa mediante un then ('peticion exitosa')
    // promesa.then((mensaje)=>{
    //   console.log(mensaje);
    // })
    // //catch => captura el error (reject)
    // .catch(error => console.log('Error en mi promesa', error))
    // console.log('Fin del Init');

  }
  //tener usuarios (promesa)
  getUsuarios ()
  {
     return  new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then(resp =>resp.json() ) // retornar inmediatamente
      .then(body => {resolve(body.data)});
    });

  }


}
