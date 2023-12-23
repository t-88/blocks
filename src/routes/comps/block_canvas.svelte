<main bind:this={main_ref}>

    <svg>
        {#each Object.entries(canvas_connections) as conn}
            <line 
                  x1="{conn[1].wire.pos1.x - canvas_rect.x}" 
                  y1="{conn[1].wire.pos1.y - canvas_rect.y}" 
                  x2="{conn[1].wire.pos2.x - canvas_rect.x}" 
                  y2="{conn[1].wire.pos2.y - canvas_rect.y}" 
                  stroke-width="3" stroke="green" 
            />
        {/each}
    </svg>


    {#each canvas_blks as blk, index}
        <svelte:component this={blk.elem} index={index} x={get(blk.pos).x} y={get(blk.pos).y} title={blk.title} id={blk.id} type={blk.type} />
    {/each}

    {#if canvas_is_blk_selected} 
        <Blk index={-1} x={mouse_x} y={mouse_y} title={get(cur_blk).title} id={get(cur_blk).id} type={get(cur_blk).type} />
    {/if}
</main>


<script>
    //comps
    import Blk from "./blocks/blk.svelte";

    // state
    import {is_block_selected , cur_blk} from "$lib/index.js";
    
    import { onMount } from "svelte";
    import { get } from "svelte/store";


    import BlkObj from "$lib/blk.js";
    import engine from "$lib/engine.js";


    let main_ref = undefined;
    let mouse_x = 0 , mouse_y = 0;

    let canvas_blks = [];
    engine.blks.subscribe((val) => {
        canvas_blks = val;
    });

    let canvas_connections = {};
    engine.wires.subscribe((val) => {canvas_connections = val;});


    let canvas_rect = {x : 0 ,y : 0 ,w : 0 ,h : 0};

    let canvas_is_blk_selected = false;
    is_block_selected.subscribe((val) => {
        canvas_is_blk_selected = val;
    });

    onMount(() => {
        document.addEventListener("mousemove",(event) => {
            let rect = main_ref.getBoundingClientRect();
            canvas_rect = {x : rect.x ,y : rect.y ,w : rect.width ,h : rect.height};


            mouse_x = event.pageX - rect.x;
            mouse_y = event.pageY - rect.y;
        });

        main_ref.addEventListener("mousedown",(event) => {
            if(!canvas_is_blk_selected) return;
            
            
            engine.blks.update((val) => [...val,
                new BlkObj(mouse_x,mouse_y,get(cur_blk).type,get(cur_blk).title,get(cur_blk).id),
            ]);

            is_block_selected.set(false);
        });        
    });



</script>


<style>
    main {
        width: 80%;
        border: black 1px solid;    
        position: relative;
        overflow: hidden;
    }

    svg  {
        position: absolute;
        top: 0;
        left: 0;
        overflow: visible;
        width: 100%;
        height: 100%;
    }
</style>