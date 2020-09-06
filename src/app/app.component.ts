import { Component, OnInit } from '@angular/core';
import { Reflector } from './models/reflector';
import { Rotor } from './models/rotor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Enigma';
	availableRotors: {[id:string]: Rotor};
	rotors: Array<Rotor> = [];

	availableReflectors: {[id: string]: Reflector};
	reflector: Reflector;

	plainText = '';
  cipherText = '';

  letterCount = 0;
  batchSize = 5;

	selectedRotors = ['1', '2', '3'];
  selectedReflector = 'B';

  handleKeyClick(selection: string): void {
		this.setStringValues(selection, (s) => {
			this.plainText += s;
		});

		this.rotateRotors();
		const encryptedValue = this.encrypt(selection);

		this.setStringValues(encryptedValue, (s) => {
			this.cipherText += s;
		});

		this.letterCount++;
	}

	setStringValues(inputValue: string, callback: (string) => void) {
		if(this.letterCount % this.batchSize === 0) {
      callback(' ');
		}
		callback(inputValue);
	}

	rotateRotors(): void {
		if(this.rotors.length > 0) {
        this.rotors[0].rotate();
        for(let index = 1; index < this.rotors.length; index++) {
            if(this.rotors[index - 1].hasReachedTurnoverNotch) {
                this.rotors[index].rotate();
            }
        }
    }
	}

	encrypt(inputCharacter: string): string {
		let encryptedCharacter = inputCharacter;
    let rotorsToProcess = this.rotors.slice();
    // Processing via Rotors in the forward direction
    for(let rotor of rotorsToProcess) {
        encryptedCharacter = rotor.process(encryptedCharacter);
    }

    // Processing via the Reflector
    encryptedCharacter = this.reflector.process(encryptedCharacter);

    // Processing via Rotors in the reverse direction
    rotorsToProcess.reverse();
    for(let rotor of rotorsToProcess) {
        encryptedCharacter = rotor.processReverse(encryptedCharacter);
    }

    return encryptedCharacter;
	}

	displayRotors(rotors: Array<Rotor>): Array<Rotor> {
		rotors.reverse();
		return rotors;
  }
  
  ngOnInit(): void {
		this.availableRotors = {
			'1': new Rotor('EKMFLGDQVZNTOWYHXUSPAIBRCJ', ['Q']),         // Enigma 1
			'2': new Rotor('AJDKSIRUXBLHWTMCQGZNPYFVOE', ['E']),         // Enigma 1
			'3': new Rotor('BDFHJLCPRTXVZNYEIWGAKMUSQO', ['V']),         // Enigma 1
			'4': new Rotor('ESOVPZJAYQUIRHXLNFTGKDCMWB', ['J']),         // M3 Army
			'5': new Rotor('VZBRGITYUPSDNHLXAWMJQOFECK', ['Z']),         // M3 Army
			'6': new Rotor('JPGVOUMFYQBENHZRDKASXLICTW', ['Z', 'M']),    // M3 & M4 Naval (FEB 1942)
			'7': new Rotor('NZJHGRCXMYSWBOUFAIVLPEKQDT', ['Z', 'M']),    // M3 & M4 Naval (FEB 1942)
			'8': new Rotor('FKQHTLXOCBJSPDZRAMEWNIUYGV', ['Z', 'M'])     // M3 & M4 Naval (FEB 1942)
		};

		const instance = this;

		this.rotors = this.selectedRotors.map(function(r) {
            return instance.availableRotors[r];
		});
		this.rotors.reverse();

		this.availableReflectors = {
			'A': new Reflector(
				{"A":"E","B":"J","C":"M","D":"Z","E":"A","F":"L","G":"Y","H":"X","I":"V","J":"B","K":"W","L":"F","M":"C","N":"R","O":"Q","P":"U","Q":"O","R":"N","S":"T","T":"S","U":"P","V":"I","W":"K","X":"H","Y":"G","Z":"D"}
			),
			'B': new Reflector(
				{"A":"Y","B":"R","C":"U","D":"H","E":"Q","F":"S","G":"L","H":"D","I":"P","J":"X","K":"N","L":"G","M":"O","N":"K","O":"M","P":"I","Q":"E","R":"B","S":"F","T":"Z","U":"C","V":"W","W":"V","X":"J","Y":"A","Z":"T"}
			),
			'C': new Reflector(
				{"A":"F","B":"V","C":"P","D":"J","E":"I","F":"A","G":"O","H":"Y","I":"E","J":"D","K":"R","L":"Z","M":"X","N":"W","O":"G","P":"C","Q":"T","R":"K","S":"U","T":"Q","U":"S","V":"B","W":"N","X":"M","Y":"H","Z":"L"}
			),
			'BThin': new Reflector(
				{"A":"E","B":"N","C":"K","D":"Q","E":"A","F":"U","G":"Y","H":"W","I":"J","J":"I","K":"C","L":"O","M":"P","N":"B","O":"L","P":"M","Q":"D","R":"X","S":"Z","T":"V","U":"F","V":"T","W":"H","X":"R","Y":"G","Z":"S"}
			),
			'CThin': new Reflector(
				{"A":"R","B":"D","C":"O","D":"B","E":"J","F":"N","G":"T","H":"K","I":"V","J":"E","K":"H","L":"M","M":"L","N":"F","O":"C","P":"W","Q":"Z","R":"A","S":"X","T":"G","U":"Y","V":"I","W":"P","X":"S","Y":"U","Z":"Q"}
			)
		};
		this.reflector = this.availableReflectors[this.selectedReflector];
	}
}
