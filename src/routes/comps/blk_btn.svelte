<button disabled={disabled} 
        on:click={() => {engine.on_select_blk(id,title)}}
> 
        {title}  
</button>



<script>
    import { onMount } from "svelte";
    import engine from "$lib/engine.js";


    export let id;
    export let title = "";
    export let disabled = false;

    onMount(() => {
        if(title == "") title = id; 
    });

</script>


<style>
    button {
        width: 100%;
        height: 50px;
    }
</style>