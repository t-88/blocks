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
    import engine from "$lib/engine.js";
    export let index;  

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
        let pos = {
            x :    rect.x + parseInt(rect.width) / 2,
            y :    rect.y + parseInt(rect.height) / 2,   
        };
        engine.on_pin_selected(type,index,pos);


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
        z-index: 2;
    }
    .connector:hover {
        background-color: blueviolet;
    }
</style>