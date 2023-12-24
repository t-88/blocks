// compiler takes lines of code and converts them to a blkz langauge

import { writable } from "svelte/store";
import Token from "./tokens";


const function_no_args = [Token.Start,Token.Update];
const function_args = [Token.Log];



function js_open_function(func_name) {
    func_name = func_name.slice(0,func_name.length - 1);
    return `(api) => {\n`;
}
function js_close_function() {
    return "}\n";
}


function parse_log_function_args(line) {
    line = line.trim();
    let args = [];
    let idx = 0;
    let text = ""; 

    while(idx < line.length) {
        if(line[idx] == " ") {
            args.push(text);
            text = "";
        }
        if(line[idx] == '"') {
            idx += 1;
            while(idx < line.length && line[idx] != '"') {
                text += line[idx];
                idx += 1;
            }
            args.push(text);
            text = "";
        }

        idx += 1;
    }

    if(text != "") {
        args.push(text);
    }

    return args;
}

function js_log_function(logs) {
    let line = "";
    for (let i = 0; i < logs.length; i++) {
        if(logs[i]) {
            line += `api.log("${logs[i]}")\n` 
        }
    }
    return line; 
}

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
        this.idx = 0;
        this.lines = lines;
        this.code = "";
        
        while(!this.end()) {
            this.compile_function(lines);
        }

        this.have_compiled_code.set(true);
    }

    write_line(line,depth = 0,add_new_line = true) {
        this.code += "   ".repeat(depth) + line;
        if(add_new_line) this.code += "\n";
    }

    compile_function() {
        if(function_no_args.includes(this.cur().id)) {
            this.write_line(this.cur().id + ":")
            this.idx += 1;
            return;
        }
        if(function_args.includes(this.cur().id)) {
            let line = this.cur().id;
            if(Object.keys(this.cur()).includes("params"))  {
                line += " ";
                for (let i = 0; i < this.cur().params.length; i++) {
                    line += '"' + this.cur().params[i].value + '"';
                    if(i != this.cur().params.length - 1) {
                        line += " ";
                    }
                    
                }
            }

            this.write_line(line,1)

            this.idx += 1;
            return;
        }
        this.compile_base();
    }

    compile_base() {
        let line = this.cur();
        this.idx += 1; 

        if(line.id == Token.End) {
            this.write_line(".",0,false);
        } else {
            alert(`[Error] compiler error unknown token ${JSON.stringify(this.cur())}`)
            throw `[Error] compiler error unknown token ${JSON.stringify(this.cur())}`;
        }

    }


    write_to_transpiled(line,depth=0,new_line = true) {
        this.trasnpiled += "   ".repeat(depth) + line + new_line ? "\n": "";
    }
    trasnpile_to_js() {
        if(!this.code) return;

        this.lines = this.code.split("\n");
        this.idx = 0;
        this.trasnpiled = "";

        while(!this.end()) {
            let line = this.cur().trim().split(" ");
            
            // function ends with :
            if(line[0][line[0].length - 1] == ":") {
                this.trasnpiled += js_open_function(line[0]);
            } else if(line[0] == ".") {
                this.trasnpiled += js_close_function();
            } else if(line[0] == "log") {
                this.trasnpiled += js_log_function(parse_log_function_args(line.slice(1).join(" ")));
            } else {
                alert(`[Error] unknow line in js transpiler ${line}`);
                throw `[Error] unknow line in js transpiler ${line}`;
            }
            this.idx += 1;            
        }   


        return this.trasnpiled;
    }
}

const blkz_compiler = new BlkzCompiler();
export default blkz_compiler;