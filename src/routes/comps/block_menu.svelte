<main>
    <section id="menu-btns">
        <BlkBtn callback={on_select_blk} disabled={is_start_blk_placed}  id={Token.Start} title="Start"    type="start_blk" />
        <BlkBtn callback={on_select_blk} disabled={is_update_blk_placed}  id={Token.Update} title="Update"  type="start_blk" />
        <BlkBtn callback={on_select_blk}  id="log" title={Token.Log}      type="middle_blk" />
        <BlkBtn callback={on_select_blk}  id="end" title={Token.End}        type="end_blk" />
    </section>
    <section>
        <button on:click={() => engine.on_compile()} >Compile</button>
        <button disabled={!have_compiled_code} on:click={() => blkz_compiler.trasnpile_to_js()} >Transpile To JS</button>

        <div id="menu-windows">
            <button disabled>1</button>
            <button>2</button>
            <button>3</button>
        </div>
    </section>
</main>

<script>
    // comps
    import BlkBtn from "./blk_btn.svelte";

    // state 
    import engine from "$lib/engine.js";
    import blkz_compiler from "$lib/compiler.js";
    import Token from "$lib/tokens.js";


    let is_start_blk_placed = false;
    let is_update_blk_placed = false;
    engine.is_start_blk_placed.subscribe(val => is_start_blk_placed = val);
    engine.is_update_blk_placed.subscribe(val => is_update_blk_placed = val);


    let have_compiled_code = false;
    blkz_compiler.have_compiled_code.subscribe(val => have_compiled_code = val);

    function on_select_blk(type,title,id) {
        engine.on_select_blk(type,title,id);

    }

</script>

<style>
    main {
        max-width: 20%;
        border: black 1px solid;
        padding: 20px;
        

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
    }

    button {
        align-self: center;
        width: 100px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;        
        gap: 10px;
    }

    #menu-windows {
        height: 50px;
        display: flex;
    }
</style>