<script>
    import { readable } from 'svelte/store';
    import { tweened } from 'svelte/motion';
    import { onMount } from 'svelte';

    let timer = 15 * 60; // seconds

    let mstime; // Will be initialized properly inside onMount
    let start;
    let animationFrame;

    const updateTime = set => {
        const next = () => {
            set(new Date().getTime());
            animationFrame = requestAnimationFrame(next);
        };
        next();
        return () => cancelAnimationFrame(animationFrame);
    };

    onMount(() => {
        start = new Date().getTime();
        mstime = readable(new Date().getTime(), updateTime);
    });

    $: time = Math.floor(($mstime - start) / 1000);
    $: toWait = timer - time > 0 ? timer - time : 0;
    $: minutes = Math.floor(toWait / 60);
    $: seconds = toWait - minutes * 60;

    const progress = tweened(0, { duration: 1000 });
    $: {
        $progress = 1 - (toWait / timer);
    }
</script>

<section class="app p-4 rounded-md overflow-hidden">
	<svg class="rounded-bl-lg" viewBox="0 0 10 10" style="background: hsl({120 * (1-$progress)}deg, 50%, {100 - 50 * $progress}%)" preserveAspectRatio="none">
		<rect
			y={10 * $progress}
			width=10
			height={10 * (1-$progress)}
			fill="hsl({120 * (1-$progress)}deg, 50%, 50%)"
		/>
	</svg>
	<div class="timer-value">
		<span>{minutes}mins</span>
		<small>{seconds}s</small>
	</div>
</section>

<style>
	svg {
		position: absolute;
		left: 0;right: 0;
		width: 100%;
		height: 100%;
	}
  :global(body) {
    color: #333;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  .app {
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    /* height: 100vh; */
  }
  .timer {
    display: flex;
    background-color: rgb(106, 186, 255);
    height: 100%;
    width: 100%;
  }
  .timer-value {
    /* position: absolute; */
    display: flex;
    mix-blend-mode: difference;
    color: #333;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 28px;
    font-size: 32px;
    height: 100%;
    width: 100%;
  }
  .timer-value small {
    font-size: 18px;
  }
</style>