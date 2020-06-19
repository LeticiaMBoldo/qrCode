import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public corpoPagina: HTMLElement;
  public img : HTMLElement;

  public scanner : any;

  constructor(private qrScanner :QRScanner, private dialog : Dialogs, private platform : Platform ) 
  {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.corpoPagina.style.opacity = "1";
      this.img.style.opacity = "1";


      this.qrScanner.hide();
    })
  }

  public lerQRCode(){
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        
        this.corpoPagina = document.getElementsByTagName('ion-content')[0] as HTMLElement;
        this.img = document.getElementById('logo')[0] as HTMLElement;
        this.corpoPagina.style.opacity = "0";
        this.img.style.opacity = "0";

        //Exibe a câmera para leitura
        this.qrScanner.show();

        // start scanning
        this.scanner = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.dialog.alert('Resultado: ' + text);

          this.corpoPagina.style.opacity = "1";
          this.img.style.opacity = "1";

          this.qrScanner.hide(); // fecha a camera 
          this.scanner.unsubscribe(); // para de funcionar
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));

  }


  
}
