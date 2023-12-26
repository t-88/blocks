<main style={style}>
    <h3>{blk.title}</h3> 
</main>



<script>
    export let blk;

    export let x;
    export let y;

    $: style = `
        left : ${x}px;
        top :  ${y}px;
    `;
</script>


<style>
    main {
        position: absolute;
        width : var(--blk-width);
        height: var(--blk-height);
        border-radius: 10px;
        background-color: blue;

        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        font-size: 25px;
        cursor: pointer;
    }
</style>