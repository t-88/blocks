import { writable } from "svelte/store";


let is_block_selected = writable(false);
let cur_blk = writable({});
let blks = writable([]);


let input_conn = writable({});
let output_conn = writable({});
let curr_conn = writable("")


let connections = writable([]);


export {
    is_block_selected,
    blks,
    cur_blk,
    connections,
    curr_conn,
    output_conn,
    input_conn
}