<main style={style}>
    <div id="flexed">
        <div>
            <h3>{blk.title}</h3> 
            <select name="toknes">
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="prop">prop</option>
            </select>
        </div>
        <input type="text">
    </div>


    {#if blk.blk_type == BlkType.Output}
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
    {:else if blk.blk_type == BlkType.InputOutput}
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
    {:else if blk.blk_type == BlkType.InputOutputRight}
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"output")} class="connector connector_next"></div>
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"right")} class="connector connector_right"></div>
    {:else if blk.blk_type == BlkType.Input}
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_prev"></div>
    {:else if blk.blk_type == BlkType.Left}
        <div role="presentation" on:click={(pe) => on_pin_select(pe,"input")} class="connector connector_left"></div>
    {/if}


</main>



<script>
    import engine from "$lib/engine.js";
    import BlkType from "$lib/blk_type.js";

    export let blk;



    $: style = `
        left : ${blk.x}px;
        top :  ${blk.y}px;
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
        width: var(--blk-width);
        padding: 15px;        
        border-radius: 10px;
        background-color: blue;

        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        font-size: 25px;
        cursor: pointer;
    }

    .connector {
        position: absolute;
        width:  var(--connector-size);
        height: var(--connector-size);
        background-color: black;

        border-radius: 100%;
        z-index: 2;
        justify-self: center;
    }
    .connector:hover {
        background-color: blueviolet;
    }
    .connector_next {
        bottom: -10px;
    }
    .connector_prev {
        top: -10px;
    }    
    .connector_right {
        right: calc(var(--connector-size) / -2);
    }
    .connector_left {
        left: calc(var(--connector-size) / -2);
    }   
    
    #flexed {
        display: flex;
        flex-direction: column;
    }
</style>