import { writable } from "svelte/store";
import { get } from "svelte/store";
import Wire from "./wire";
import BlkObj from  "./blk.js";
import blkz_compiler from "./compiler.js";
import Token, { init_tokens_to_blks_map } from "./tokens.js";



class Engine {
    constructor() {
        init_tokens_to_blks_map();
        
        this.blks = writable([]);

        this.wires = writable({});
        this.wires_table = {};
    
        this.input_conn  = {pos : {x : 0, y : 0}, index : -1}; 
        this.output_conn = {pos : {x : 0, y : 0}, index : -1}; 
        this.curr_conn = writable("");


        // every object only uses one of those
        this.is_start_blk_placed = writable(false);
        this.is_update_blk_placed = writable(false);

        this.start_blk_idx = -1;
        this.update_blk_idx = -1;


        this.cur_blk = writable({});
        this.is_block_selected = writable(false);


        this.logs = writable([]);


        this.api = {
            log : (msg) => this.log(msg),
        };
    }

    

    traverse_func(root,blks = undefined,wires = undefined,lines=[]) {
        if(root == undefined) return;
        if(wires == undefined) wires = get(this.wires);
        if(blks  == undefined) blks = get(this.blks);

        lines.push(root.line());

        if(Object.keys(wires).includes(root.index.toString())) {
            this.traverse_func(blks[wires[root.index].in],blks,wires,lines)
        }

        return lines;
    }   
    on_compile() {
        // get start, update blks
        if(!get(this.is_start_blk_placed)) {
            alert("u got to place at least start blk");
        } 

        // if no start blk found exit
        if(!get(this.is_start_blk_placed)) {
            return;
        }
        
        let start_blk = get(this.blks)[this.start_blk_idx];
        let lines = this.traverse_func(start_blk);

        // make sure end blk is placed and connected to
        if(lines[lines.length - 1].id != "end") {
            alert("u must connect a END blk to your start function");
            return;    
        } 
        return blkz_compiler.compile(lines);

        
        
        // make it work for start function first
        // if(get(this.is_update_blk_placed)) {
            // let update_blk = get(this.blks)[this.update_blk_idx];
        // }
    }
    on_pin_selected(type,index,pos) {
        if(get(this.curr_conn) == "") {
            this.curr_conn.set(type);

            if(type == "input") {
                this.input_conn.pos = pos;
                this.input_conn.index = index;
            } else if (type == "output") {
                this.output_conn.pos = pos;
                this.output_conn.index = index;
            } else {
                throw "[Error] unknown pin type";
            }
            return;
        }



        if(get(this.curr_conn) == type) {
            this.curr_conn.set("");
            alert("invalid connection");
            return;  
        }

        this.curr_conn.set("");
        if(type == "input") {
            this.input_conn.pos = pos;
            this.input_conn.index = index;
        } else if (type == "output") {
            this.output_conn.pos = pos;
            this.output_conn.index = index;
        } else {
            throw "[Error] unknown pin type";
        }


        let  wires = get(this.wires);


        if(Object.keys(this.wires_table).includes("in_" + this.input_conn.index.toString())) {
            let out_idx = parseInt(this.wires_table["in_" + this.input_conn.index.toString()].slice(4));
            delete wires[out_idx];
            delete this.wires_table["out_" + out_idx.toString()];
            delete this.wires_table["in_" + this.input_conn.index.toString()];
        }
        if(Object.keys(this.wires_table).includes("out_" + this.output_conn.index.toString())) {
            let in_idx = parseInt(this.wires_table["out_" + this.output_conn.index.toString()].slice(3));
            delete wires[in_idx];
            delete this.wires_table["in_" + in_idx.toString()];
            delete this.wires_table["out_" + this.output_conn.index.toString()];
        }



        this.wires_table["out_"+ this.output_conn.index.toString()] = "in_"+ this.input_conn.index.toString();
        this.wires_table["in_"+ this.input_conn.index.toString()] = "out_"+ this.output_conn.index.toString();

        wires[this.output_conn.index] = {
            wire : new Wire(
                this.input_conn.pos,this.output_conn.pos,
                this.input_conn.index,this.output_conn.index
            ),
            in : this.input_conn.index,
        };

        this.wires.set(wires);
    }
    on_place_blk(x , y) {
        this.blks.update((val) => [...val,
            new BlkObj(
                get(this.cur_blk).id,
                get(this.cur_blk).title,
                val.length,
                x,
                y
            ),
        ]);

        this.is_block_selected.set(false);

        // extract the indices of the start and update block 
        // they are important
        if(get(this.cur_blk).id == Token.Start) {
            this.is_start_blk_placed.set(true);
            this.start_blk_idx = get(this.blks).length - 1 ;
        }
        if(get(this.cur_blk).id == Token.Update) {
            this.is_update_blk_placed.set(true);
            this.update_blk_idx = get(this.blks).length - 1 ;
        }
    }
    
    on_select_blk(id,title) {
        this.is_block_selected.set(true);
        this.cur_blk.set(new BlkObj(id,title,-1));
    }

    on_run() {
        this.on_compile();
        let js_code = blkz_compiler.trasnpile_to_js();
        let start_func = eval(js_code);
        start_func(this.api);
    }

    log(msg) {
        this.logs.update(val => [...val,msg]);
    }
}


const engine = new Engine();

export default engine;