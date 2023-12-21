<main bind:this={main_ref}> 
    <svg>
        {#each canvas_connections as conn}
            <line x1="{conn.x1 - canvas_rect.x}" y1="{conn.y1 - canvas_rect.y}" x2="{conn.x2 - canvas_rect.x}" y2="{conn.y2 - canvas_rect.y}" stroke-width="3" stroke="green" />
        {/each}
    </svg>


    {#each canvas_blks as blk}
        <Blk x={blk.x} y={blk.y} title={blk.title} id={blk.id} type={blk.type} />
    {/each}

    {#if canvas_is_blk_selected} 
        <Blk x={mouse_x} y={mouse_y} title={get(cur_blk).title} id={get(cur_blk).id} type={get(cur_blk).type} />
    {/if}
</main>


<script>
    //comps
    import Blk from "./blocks/blk.svelte";

    // state
    import {is_block_selected , blks, cur_blk , connections , curr_conn , output_conn , input_conn} from "$lib/index.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let main_ref = undefined;
    let mouse_x = 0 , mouse_y = 0;

    let canvas_blks = [];
    blks.subscribe((val) => {canvas_blks = val;});

    let canvas_connections = [];
    connections.subscribe((val) => {canvas_connections = val;});


    let canvas_rect = {x : 0 ,y : 0 ,w : 0 ,h : 0};



    onMount(() => {
        document.addEventListener("mousemove",(event) => {
            let rect = main_ref.getBoundingClientRect();
            canvas_rect = {x : rect.x ,y : rect.y ,w : rect.width ,h : rect.height};


            mouse_x = event.pageX - rect.x;
            mouse_y = event.pageY - rect.y;
        });

        main_ref.addEventListener("mousedown",(event) => {
            if(!canvas_is_blk_selected) return;
            
            is_block_selected.set(false);
            
            blks.update((val) => [...val,
                {
                    ...get(cur_blk),
                    x : mouse_x,
                    y : mouse_y,
                }
            ]);
            console.log(get(blks));
        });        
    });

    let canvas_is_blk_selected = false;
    is_block_selected.subscribe((val) => {
        canvas_is_blk_selected = val;
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