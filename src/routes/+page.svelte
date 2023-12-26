<main>
    <BlockMenu />
    <BlockCanvas />
    <BlockSim />
</main>

<script>
    import "./globals.css";

    import BlockMenu from "./comps/block_menu.svelte";
    import BlockCanvas from "./comps/block_canvas.svelte";
    import BlockSim from "./comps/block_sim.svelte";
</script>


<style>
    :global(html,body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    main {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>