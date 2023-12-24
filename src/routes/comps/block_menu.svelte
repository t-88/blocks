<main>
    <BlkBtn callback={on_select_blk} disabled={is_start_blk_placed}  id="start" title="Start"    type="start_blk" />
    <BlkBtn callback={on_select_blk} disabled={is_update_blk_placed}  id="update" title="Update"  type="start_blk" />
    <BlkBtn callback={on_select_blk}  id="log" title="Log()"      type="middle_blk" />
    <BlkBtn callback={on_select_blk}  id="end" title="End"        type="end_blk" />
</main>

<script>
    // comps
    import BlkBtn from "./blk_btn.svelte";

    // state 
    import engine from "$lib/engine.js";
    import { get } from "svelte/store";


    let is_start_blk_placed = false;
    let is_update_blk_placed = false;
    engine.start_blk.subscribe(val => is_start_blk_placed = val);
    engine.update_blk.subscribe(val => is_update_blk_placed = val);

    function on_select_blk(type,title,id) {
        engine.on_select_blk(type,title,id);
    }

</script>

<style>
    main {
        width: 20%;
        border: black 1px solid;
        padding: 20px;
        

        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>