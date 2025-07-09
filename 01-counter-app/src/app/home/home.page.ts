import { Component } from '@angular/core';
import { IonHeader, IonContent, IonButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonContent,
    IonButton,
    IonFooter,
    IonIcon
  ],
})
export class HomePage {

  public num: number = 0;
  public readonly MIN: number = 0;
  public readonly MAX: number = 100;
  private readonly KEY_NUMBER: string = 'ddr_key_number';

  constructor() {

    addIcons({
      chevronUpOutline,
      chevronDownOutline
    })

  }

async ionViewWillEnter(){
  console.log("ionViewWillEnter");
  const counterPreferences = await Preferences.get({key:this.KEY_NUMBER});

  if(counterPreferences.value){
    const num = +counterPreferences.value;
    if(isNaN(num) || num < this.MIN || num > this.MAX ){
      this.num = this.MIN;
      this.saveNum();
    }else{
      this.num = num;
    }
  }

}



  up(){
    if(this.num < this.MAX){
      this.num++;
      this.saveNum();
    }
  }

  down(){

    if(this.num > this.MIN){
      this.num--;
      this.saveNum();
    }
  }

   saveNum(){

     Preferences.set({
      key: this.KEY_NUMBER,
      value: this.num.toString(),
    });
    
  }
}
