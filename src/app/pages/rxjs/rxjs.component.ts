import { Component, OnDestroy } from '@angular/core';
//funciones propias (tipado observables)
import { Observable, interval, Subscription } from 'rxjs';
//encadenar funciones (propias-observables)
import { retry, take, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy  {

    public intervalSubs:Subscription;

    constructor()
    {

      // this.retornarObservable().pipe(
      //   //intentar hasta conseguir la rpta
      //   retry(1)
      // )
      // .subscribe(
      //   valor => console.log('Subs:',valor),
      //   error => console.warn('Error: ',error),
      //   ()=> console.info('Obs. Terminado')
      // );
     this.intervalSubs = this.retornaIntervalo()
          .subscribe(console.log)
    }
  ngOnDestroy(): void {
    //limpiar observable
    this.intervalSubs.unsubscribe();
  }
    retornaIntervalo():Observable<number>
    {
      return interval(300)
            .pipe(
              //Tener  informacion util
              map(valor => {
                return valor+1;
              }),
              //determinar el paso de informacion de manera condicional
              filter( valor =>( valor % 2 == 0) ? true: false  ),
              //cuantas emisiones necesita el observable
              take(10),
            );
    }
    retornarObservable():Observable<number>
    {
      //$ => observable
      //mantener el valor
      let i = -1;

      return new Observable<number>( observer  => { //observer => se necesita alguien suscrito para responder
      const intervalo =  setInterval(()=>{
          i++;
          //siguiente valor a emitir
          observer.next(i);
          if(i === 4)
          {
            //cancelar intervalos
            clearInterval(intervalo)
            //notificar si se cancelo  el observer
            observer.complete();

          }
          if( i=== 2)
          {
            observer.error('i llego al numero 2');
          }
        }, 1000)

      });
    }

}
