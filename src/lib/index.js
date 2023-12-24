import { writable } from "svelte/store";




let input_conn = writable({});
let output_conn = writable({});
let curr_conn = writable("")


let connections = writable([]);


export {
    connections,
    curr_conn,
    output_conn,
    input_conn
}