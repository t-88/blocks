import { writable } from "svelte/store"
import BlkBtn from "../routes/comps/blocks/blk.svelte";


class BlkObj {
    constructor(type,title,id,index,x = 0,y = 0) {
        this.pos = writable({x : x, y : y});

        this.type = type;
        this.id = id;
        this.title = title;

        this.elem = BlkBtn;

        this.index = index;
    }

    line() {
        // every blk repersents a line of code
        // line function returns its data

        return {
            id : this.id,
        }
    }
}


export default BlkObj;