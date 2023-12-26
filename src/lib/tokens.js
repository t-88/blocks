import BlkType from "./blk_type";

const Tokens = {
    Start : "start",
    Update : "update",
    Log : "log",
    End : "end",
    Varaible : "variable",
    String : "string",
}

let map = {};

function init_tokens_to_blks_map() {
    map[Tokens.Log] = BlkType.InputOutputRight;

    map[Tokens.Start] = BlkType.Output; 
    map[Tokens.Update] = BlkType.Output; 

    map[Tokens.End] = BlkType.Input; 

    map[Tokens.Varaible] = BlkType.Left;
}

function token_to_blk_type(tkn_type) {
    return map[tkn_type];
}

export { init_tokens_to_blks_map , token_to_blk_type };
export default Tokens;


