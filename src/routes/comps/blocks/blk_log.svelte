<main style={style}>
    <div>
        <h3>{title}</h3> 
        {#if $params.length == 0 }
            <button on:click={add_arg}> + </button>
        {/if}

        <!-- {#if index != -1}
            {#each $params as value}
                <input bind:this={value} type="text">
            {/each}
        {/if} -->
    </div>

    <div role="presentation" on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
    <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
    <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_right90we "></div>

</main>



<script>
    // state
    import engine from "$lib/engine.js";
    import { get, writable } from "svelte/store";

    export let index = 0;  

    export let title = "Start";

    export let x;
    export let y;

    let params = writable([]);

    $: style = `
        left : ${x}px;
        top : ${y}px;
    `;


    function on_pin_select(pe,type){
        let rect = pe.target.getBoundingClientRect();
        let pos = {
            x :    rect.x + parseInt(rect.width) / 2,
            y :    rect.y + parseInt(rect.height) / 2,   
        };
        engine.on_pin_selected(type,index,pos);
    }

    function add_arg() {

        // only one arg
        if(get(params).length != 0) return

        // a way to conenct blk params state to rendered blk
        // array are like points in js i think so i just create a element in params array 
        // and bind it to the input 
        get(engine.blks)[index].params.push(" ");
        params.set(get(engine.blks)[index].params);
    }
</script>


<style>
    main {
        position: absolute;
        width: 200px;
        min-height: 80px;
        border-radius: 10px;
        background-color: blue;

        display: grid;
        align-items: center;
        color: white;

        font-size: 25px;
        cursor: pointer;
        padding-left: 10px;
        padding-bottom: 10px;
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
        z-index: 2;
        justify-self: center;
    }
    .connector:hover {
        background-color: blueviolet;
    }


    h3 {
        display: inline;
        padding: 0;
        margin: 0;
    }
    input {
        display: inline;
    }

</style>