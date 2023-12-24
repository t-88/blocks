import { writable } from "svelte/store";
import { get } from "svelte/store";
import Wire from "./wire";
import BlkObj from  "./blk.js";


class Engine {
    constructor() {
        this.blks = writable([]);

        this.wires = writable({});
        this.wires_table = {};
    
        this.input_conn  = {pos : {x : 0, y : 0}, index : -1}; 
        this.output_conn = {pos : {x : 0, y : 0}, index : -1}; 
        this.curr_conn = writable("");


        // every object only uses one of those
        this.start_blk = writable(false);
        this.update_blk = writable(false);


        this.cur_blk = writable({});
        this.is_block_selected = writable(false);
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
            new BlkObj(x,y,get(this.cur_blk).type,get(this.cur_blk).title,get(this.cur_blk).id),
        ]);
        this.is_block_selected.set(false);

        console.log(get(this.cur_blk));
        if(get(this.cur_blk).id == "start") {
            this.start_blk.set(true);
        }
        if(get(this.cur_blk).id == "update") {
            this.update_blk.set(true);
        }

    }
    on_select_blk(type,title,id) {
        this.is_block_selected.set(true);
        this.cur_blk.set({
            type,
            title,
            id,
       });
    }


}


const engine = new Engine();

export default engine;