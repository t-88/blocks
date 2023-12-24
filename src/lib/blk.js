import { writable } from "svelte/store"
import Blk from "../routes/comps/blocks/blk.svelte";
import Blk_Log from "../routes/comps/blocks/blk_log.svelte";
import Token from "./tokens";

// every blks has it own elems 
const blk_elements = {};
blk_elements[Token.Log] = Blk_Log;

class BlkObj {
    constructor(type,title,id,index,x = 0,y = 0) {
        this.pos = writable({x : x, y : y});
        this.params =  [];

        this.type = type;
        this.id = id;
        this.title = title;

        if(Object.keys(blk_elements).includes(id)) {
            this.elem = blk_elements[id];
        } else {
            this.elem = Blk;
        }

        this.index = index;
    }

    line() {
        // every blk repersents a line of code
        // line function returns its data

        if(this.params.lengthv != 0) {
            return {
                id : this.id,
                params: this.params,
            }
        }

        return { id : this.id}
    }
}


export default BlkObj;