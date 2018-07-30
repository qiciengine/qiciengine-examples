namespace qc.demo {
    export class Test extends Behaviour {
        clue: string;
        private serializableFields: Object = {
            clue: qc.Serializer.STRING
        }
        
        constructor(gameObject: Node) {
            super(gameObject);
            
            // Init the behaviour
            this.clue = 'Hello';
        }
        
        private onClick(e: qc.BaseInputEvent): void {
            alert(this.clue);
        }
        
        private update(): void {
            this.gameObject.rotation += 0.2;
        }
    }
    qc.registerBehaviour('qc.demo.Test', Test);
}
