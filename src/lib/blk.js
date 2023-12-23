import { writable } from "svelte/store"
import BlkBtn from "../routes/comps/blocks/blk.svelte";


class BlkObj {
    constructor(x = 0,y = 0,type,title,id) {
        this.input_connection =  writable(undefined);
        this.output_connection = writable(undefined);

        
        this.pos = writable({x : x, y : y});

        this.type = type;
        this.id = id;
        this.title = title;

        this.elem = BlkBtn;
    }
}


export default BlkObj;