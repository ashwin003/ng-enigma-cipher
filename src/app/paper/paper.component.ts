import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {

  @Input() plainText: string;
  @Input() cipherText: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
