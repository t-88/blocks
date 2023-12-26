import Blk from "../routes/comps/blocks/blk.svelte";
import Blk_Variable from "../routes/comps/blocks/blk_variable.svelte";
import Token, { token_to_blk_type } from "./tokens";



// every blks has it own elems 
const blk_elements = {};
blk_elements[Token.Varaible] = Blk_Variable;

class BlkObj {
    constructor(id,title,index,x = 0,y = 0) {
        this.x = x;
        this.y = y;
        this.params =  [];

        this.index = index;
        this.id = id;
        this.title = title;
        this.blk_type = token_to_blk_type(id); 


        if(blk_elements.hasOwnProperty(this.id)) {
            this.elem = blk_elements[this.id];
        } else {
            this.elem = Blk;
        }
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