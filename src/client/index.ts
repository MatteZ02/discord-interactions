import EventEmitter from "node:events";
import Interactions from "./Interactions";

interface clientOptions {
    token: string;
    clientID: string;
}

class Client extends EventEmitter {
    private token: string;
    private clientID: string;
    readonly interactions: Interactions
    constructor(ops: clientOptions) {
        super();
        if (!ops || !ops.token || !ops.clientID) throw new Error("Invalid clientOptions");

        this.token = ops.token;
        this.clientID = ops.clientID;
        this.interactions = new Interactions(this);
    }
}

export default Client