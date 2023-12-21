<main style={style}>
    <h3>{title}</h3> 

    {#if type == "start_blk"}
        <div on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
    {:else if type == "middle_blk"}
        <div on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
        <div on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
        {:else if type == "end_blk"}
        <div on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
    {:else}
        <h2 class="[Error] Unreachable state"></h2>
    {/if}

</main>



<script>
    import {curr_conn , output_conn , input_conn,connections} from "$lib/index.js";
    import { get } from "svelte/store";

    export let title = "Start";
    export let id = "start";
    export let type = "start_blk";

    export let x;
    export let y;


    $: style = `
        left : ${x}px;
        top : ${y}px;
    `;


    function on_pin_select(pe,type){
        let rect = pe.target.getBoundingClientRect();

        if(get(curr_conn) == "") {
            curr_conn.set(type);

            if(type == "input") {
                input_conn.set({
                    x :    rect.x + parseInt(rect.width) / 2,
                    y :    rect.y + parseInt(rect.height) / 2,
                })
            } else if (type == "output") {
                output_conn.set({
                    x :    rect.x + parseInt(rect.width) / 2,
                    y :    rect.y + parseInt(rect.height) / 2,
                })
                curr_conn.set(type);
            } else {
                throw "[Error] unkown pin type";
            }

            return;

        }

        curr_conn.set("");

        if(get(curr_conn) == type) {
            alert("invalid connection");
            return;  
        }

        if(type == "input") {
            input_conn.set({
                x :    rect.x + parseInt(rect.width) / 2,
                y :    rect.y + parseInt(rect.height) / 2,
            })
        } else if (type == "output") {
            output_conn.set({
                x :    rect.x + parseInt(rect.width) / 2,
                y :    rect.y + parseInt(rect.height) / 2,
            })
            curr_conn.set(type);
        } else {
            throw "[Error] unkown pin type";
        }

        connections.update((val) => [...val,{
            x1 : get(input_conn).x,
            y1 : get(input_conn).y,
            x2 : get(output_conn).x,
            y2 : get(output_conn).y,
        }]);

        console.log(get(connections));

    }
</script>


<style>
    main {
        position: absolute;
        width: 200px;
        height: 80px;
        border-radius: 10px;
        background-color: blue;

        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        font-size: 25px;
        cursor: pointer;
    }

    .connector_next {
        bottom: -10px;
    }
    .connector_prev {
        top: -10px;
    }    
    .connector {
        position: absolute;
        width:  20px;
        height: 20px;
        background-color: black;

        border-radius: 100%;
    }
    .connector:hover {
        background-color: blueviolet;
    }
</style>