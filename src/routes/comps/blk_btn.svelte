<button disabled={disabled} on:click={() => {callback(type,title,id)}}> {title}  </button>



<script>
    export let title = "Start";
    export let id = "start";
    export let type = "start_blk"
    export let callback = "start_blk"

    export let disabled = false;

</script>


<style>
    button {
        width: 100%;
        height: 50px;
        
}
</style>