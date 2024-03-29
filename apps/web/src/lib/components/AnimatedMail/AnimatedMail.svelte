<script lang="ts">
  export let variant: 'button' | 'static' = 'button';
  export let shadow = true;
</script>

<div
  class="letter-image {$$props.class}"
  on:click
  role={variant === 'button' ? 'button' : ''}
  aria-label="Mail"
>
  <div class="animated-mail">
    <div class="back-fold" />
    <div class="letter">
      <div class="letter-border" />
      <div class="letter-title" />
      <div class="letter-context" />
      <div class="letter-stamp">
        <div class="letter-stamp-inner" />
      </div>
    </div>
    <div class="top-fold" />
    <div class="body" />
    <div class="left-fold" />
  </div>
  {#if shadow}
    <div class="shadow" />
  {/if}
</div>

<style lang="postcss">
  .letter-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);

    &[role='button'] {
      cursor: pointer;
    }
  }

  .animated-mail {
    position: absolute;
    height: 150px;
    width: 200px;
    transition: 0.4s;

    & .body {
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 100px 200px;
      border-color: transparent transparent #e95f55 transparent;
      z-index: 2;
    }

    & .top-fold {
      position: absolute;
      top: 50px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 50px 100px 0 100px;
      transform-origin: 50% 0%;
      transition: transform 0.4s 0.4s, z-index 0.2s 0.4s;
      border-color: #cf4a43 transparent transparent transparent;
      z-index: 2;
    }

    & .back-fold {
      position: absolute;
      bottom: 0;
      width: 200px;
      height: 100px;
      background: #cf4a43;
      z-index: 0;
    }

    & .left-fold {
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 50px 0 50px 100px;
      border-color: transparent transparent transparent #e15349;
      z-index: 2;
    }

    & .letter {
      left: 20px;
      bottom: 0px;
      position: absolute;
      width: 160px;
      height: 60px;
      background: white;
      z-index: 1;
      overflow: hidden;
      transition: 0.4s 0.2s;

      & .letter-border {
        height: 10px;
        width: 100%;
        background: repeating-linear-gradient(
          -45deg,
          #cb5a5e,
          #cb5a5e 8px,
          transparent 8px,
          transparent 18px
        );
      }

      & .letter-title {
        margin-top: 10px;
        margin-left: 5px;
        height: 10px;
        width: 40%;
        background: #cb5a5e;
      }

      & .letter-context {
        margin-top: 10px;
        margin-left: 5px;
        height: 10px;
        width: 20%;
        background: #cb5a5e;
      }

      & .letter-stamp {
        margin-top: 30px;
        margin-left: 120px;
        border-radius: 100%;
        height: 30px;
        width: 30px;
        background: #cb5a5e;
        opacity: 0.3;
      }
    }
  }

  .shadow {
    position: absolute;
    top: 200px;
    left: 50%;
    width: 400px;
    height: 30px;
    transition: 0.4s;
    transform: translateX(-50%);

    border-radius: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  }

  .letter-image:hover {
    & .animated-mail {
      transform: translateY(50px);
    }

    & .animated-mail .top-fold {
      transition: transform 0.4s, z-index 0.2s;
      transform: rotateX(180deg);
      z-index: 0;
    }

    & .animated-mail .letter {
      height: 180px;
    }

    & .shadow {
      width: 250px;
    }
  }

  .letter-image.open {
    opacity: 0.25;

    & .animated-mail {
      transform: translateY(50px);
    }

    & .animated-mail .top-fold {
      transition: transform 0.4s, z-index 0.2s;
      transform: rotateX(180deg);
      z-index: 0;
    }

    & .animated-mail .letter {
      height: 180px;
    }

    & .shadow {
      width: 250px;
    }
  }

  .letter-image.closed {
    cursor: default;

    & .animated-mail {
      transform: none;
    }
    & .animated-mail .top-fold {
      transform: none;
    }
    & .animated-mail .letter {
      display: none;
    }
  }
</style>
