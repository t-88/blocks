<main>
    <div>
        <h2>block sim</h2>
        <canvas bind:this={canvas} height="500">

        </canvas>
        <button on:click={on_run}>Run</button>
    </div>
    <Console />
</main>

<script>
    import Console from "./console.svelte"
    import engine from "$lib/engine.js";
    import { onMount } from "svelte";

    function on_run() {
        engine.on_run();
    }


    let canvas  = undefined;
    let ctx = undefined;
    onMount(() => {
        ctx = canvas.getContext("2d");
        ctx.fillRect(0,0,canvas.width,canvas.height);
    });
</script>

<style>
    main {

        width: 40%;
        border: black 1px solid;
        

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    button {
        width: 60px;
        height: 60px;
    }
</style>