<div class="ribbon {$$props.class}">
  <div>
    <span class="text-ellipsis">
      <slot />
    </span>
  </div>
</div>

<style>
  .ribbon {
    position: absolute;
    left: -0.3125em; /* -5px */
    top: -0.3125em; /* -5px */
    z-index: 1;
    overflow: hidden;
    width: 4.6875em; /* 75px */
    height: 4.6875em; /* 75px */
    text-align: right;
  }
  .ribbon div {
    font-size: 1em;
    font-weight: bold;
    color: currentColor;
    position: absolute;
    top: 1.1875em; /* 19px */
    left: -1.3125em; /* -21px */
    height: 1.25em; /* 20px */
    transform: rotate(-45deg);
    width: 6.25em; /* 100px */
    display: flex;
    justify-content: center;
    align-items: center;
    background: #79a70a;
    background: linear-gradient(#b6bac9 0%, #808080 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  }
  .ribbon div::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 100%;
    z-index: -1;
    border-left: 0.1875em solid #808080; /* 3px */
    border-right: 0.1875em solid transparent; /* 3px */
    border-bottom: 0.1875em solid transparent; /* 3px */
    border-top: 0.1875em solid #808080; /* 3px */
  }
  .ribbon div::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 100%;
    z-index: -1;
    border-left: 0.1875em solid transparent; /* 3px */
    border-right: 0.1875em solid #808080; /* 3px */
    border-bottom: 0.1875em solid transparent; /* 3px */
    border-top: 0.1875em solid #808080; /* 3px */
  }
  .ribbon span {
    font-size: 0.5em; /* 8px */
  }
</style>
