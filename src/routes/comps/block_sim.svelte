<main>
    <div>
        <h2>block sim</h2>
        <button on:click={on_run}>Run</button>
    </div>
    <Console />
</main>

<script>
    import Console from "./console.svelte";
    import engine from "$lib/engine.js";

    function on_run() {
        engine.on_run();
    }
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