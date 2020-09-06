import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotor',
  templateUrl: './rotor.component.html',
  styleUrls: ['./rotor.component.scss']
})
export class RotorComponent implements OnInit {

  private characterSet: Array<string> = [];

  @Input() selectedIndex: number;
  
  constructor() { 
    this.characterSet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }

  get previousIndex(): number {
    if(this.selectedIndex === 0) {
      return this.characterSet.length - 1;
    }
    return this.selectedIndex - 1;
  }

  get nextIndex(): number {
    return (this.selectedIndex + 1) % this.characterSet.length;
  }

  get currentCharacter(): string {
    return this.characterSet[this.selectedIndex];
  }

  get previousCharacter(): string {
    return this.characterSet[this.previousIndex];
  }

  get nextCharacter(): string {
    return this.characterSet[this.nextIndex];
  }

  ngOnInit(): void {
  }

}
