<main>
    <BlkBtn callback={on_select_blk}  id="start" title="Start"    type="start_blk" />
    <BlkBtn callback={on_select_blk}  id="update" title="Update"  type="start_blk" />
    <BlkBtn callback={on_select_blk}  id="log" title="Log()"      type="middle_blk" />
    <BlkBtn callback={on_select_blk}  id="end" title="End"        type="end_blk" />
</main>

<script>
    // comps
    import BlkBtn from "./blk_btn.svelte";

    // state 
    import {is_block_selected , cur_blk} from "$lib/index.js";


    function on_select_blk(type,title,id) {
        is_block_selected.set(true);
        cur_blk.set({
            id,
            title,
            type
        });
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