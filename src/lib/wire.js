class Wire {
    constructor(pos1, pos2 , in_idx , out_idx) {
        if(pos1 == undefined) throw "[ERROR] undefined pos1"
        if(pos2 == undefined) throw "[ERROR] undefined pos2"
        
        this.pos1 = pos1; 
        this.pos2 = pos2; 
        
        this.out_blk_index = in_idx; 
        this.in_blk_index = out_idx; 
    }
}

export default Wire;