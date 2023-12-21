<main>
    <BlockMenu />
    <BlockCanvas />
</main>

<script>
    import BlockMenu from "./comps/block_menu.svelte";
    import BlockCanvas from "./comps/block_canvas.svelte";
</script>


<style>
    :global(html,body) {
        margin: 0;
        width: 100%;
        height: 100%;
    }

    main {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>