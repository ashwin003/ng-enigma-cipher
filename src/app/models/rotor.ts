export class Rotor {
    private _characterSet: Array<string> = [];
    private _currentIndex: number;
    constructor(private mappedSide: string, private turnOverNotch: Array<string>) {
        this._characterSet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this._currentIndex = 0;
    }

    get characterSet(): Array<string> {
        return this._characterSet;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    get selectedCharacter(): string {
        return this._characterSet[this.currentIndex];
    }

    rotate(): void {
        this._currentIndex = (this.currentIndex + 1) % this._characterSet.length;
    }

    get hasReachedTurnoverNotch(): boolean {
        return this.turnOverNotch.indexOf(this.selectedCharacter) > -1;
    }

    process(inputCharacter: string): string {
        const offset = this.currentIndex;
        let pos = this._characterSet.indexOf(inputCharacter);
        const letter = this.mappedSide[(pos + offset) % this.characterSet.length];
        pos = this._characterSet.indexOf(letter);

        return this._characterSet[(pos - offset + this._characterSet.length) % this._characterSet.length];
    }

    processReverse(inputCharacter: string): string {
        let pos = this._characterSet.indexOf(inputCharacter);
        const letter = this._characterSet[(pos + this.currentIndex) % this._characterSet.length];
        pos = this.mappedSide.indexOf(letter);
        return this._characterSet[(pos - this.currentIndex + this._characterSet.length) % this._characterSet.length];
    }
}