<main>
    <h3>Console:</h3>
    <div>
        {#each Array.from(logs).reverse() as log}
            <h4>{log}</h4>
            <hr>
        {/each}
    </div>
</main>

<script>
    import engine from "$lib/engine.js";


    let logs = [];
    engine.logs.subscribe(val => logs = val);
</script>

<style>
    main  {
        width: 100%;
        height: 200px;
        border: black 1px solid;
        align-self: end;

        box-sizing: border-box;
        padding-left: 10px;
    }
    h3 {
        height: 10%;
    }

    div {
        height: 90%;
        width: 100%;
        overflow: scroll;

    }
</style>