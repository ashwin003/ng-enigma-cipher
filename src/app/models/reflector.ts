export class Reflector {
    constructor(private mapping: {[id: string]: string}) {
    }

    process(inputCharacter: string): string {
        return this.mapping[inputCharacter];
    }
}