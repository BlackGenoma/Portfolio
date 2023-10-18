import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  window:any = window;
  ethereum:any = this.window.ethereum;
  web3!:Web3;
  selectedAddress!:string;
  walletButtonLabel:string = 'Connect';
  balance:string = '0';
  network!:string;

  @ViewChild('imgPreview') imgRef!:ElementRef;

  ngOnInit(): void {
    if(this.ethereum){
      this.web3 = new Web3(this.ethereum);
    }
  }

  inputUrlHandler(event:any){
    this.imgRef.nativeElement.src = event.target.value;
  }

  walletButtonHandler(){
    this.ethereum.request({method:'eth_requestAccounts'}).then(
      (accounts:any) => {
        this.selectedAddress = accounts[0];
        
        const selectedAddress = this.selectedAddress;
        this.walletButtonLabel = selectedAddress.substring(0, 6) + '...' + selectedAddress.substring(selectedAddress.length-4);

        this.network = 'ethereum';

        this.web3.eth.getBalance(this.selectedAddress).then(
          (wei:any) => {
            this.balance = this.web3.utils.fromWei(wei, 'ether');
          },
          (error:any) => console.error('Error obteniendo balance en WEI:', error)
        );
      },
      (error:any) => console.error('Error obteniendo cuentas:', error)
    );
  }
}
