// compiler takes lines of code and converts them to a blkz langauge

import { writable } from "svelte/store";
import Token from "./tokens";


const function_no_args = [Token.Start,Token.Update];
const function_args = [Token.Log];

class BlkzCompiler {
    constructor() {
        this.idx = 0;
        this.lines = [];

        this.have_compiled_code = writable(false);
    }

    cur() {
        return this.lines[this.idx];
    }
    end() {
        return this.idx >= this.lines.length;
    }

    compile(lines) {
        console.log("compiling...");


        this.idx = 0;
        this.lines = lines;
        this.code = "";
        
        while(!this.end()) {
            this.compile_function(lines);
        }

        this.have_compiled_code.set(true);
        console.log(this.code);
    }

    write_line(line,depth = 0,add_new_line = true) {
        this.code += "   ".repeat(depth) + line;
        if(add_new_line) this.code += "\n";
    }

    compile_function() {
        if(function_no_args.includes(this.cur().id)) {
            this.write_line(this.cur().id + "{")
            this.idx += 1;
            return;
        }
        if(function_args.includes(this.cur().id)) {
            this.write_line(this.cur().id,1)
            this.idx += 1;
            return;
        }
        this.compile_base();
    }

    compile_base() {
        let line = this.cur();
        this.idx += 1; 

        if(line.id == Token.End) {
            this.write_line("}");
        } else {
            alert(`[Error] compiler error unknown token ${JSON.stringify(this.cur())}`)
            throw `[Error] compiler error unknown token ${JSON.stringify(this.cur())}`;
        }

    }



    trasnpile_to_js() {
        console.log("transpiling...");
    }
}

const blkz_compiler = new BlkzCompiler();
export default blkz_compiler;