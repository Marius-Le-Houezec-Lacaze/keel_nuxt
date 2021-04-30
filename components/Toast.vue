<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="top-0 flex items-end justify-center min-h-screen absolute">
    <div
      class="pop-in fixed bottom-2 p-1 right-2 h-20 w-64 border-b-4 border-green-400 bg-green-100 flex justify-start"
    >
      <CheckCircle />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    window.setInterval(() => {
      this.isVisible = false;
    }, 5000);
  },
};
</script>

<style>
@-webkit-keyframes pop-in {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes pop-in {
  0% {
    opacity: 0;
    -moz-transform: scale(0.5);
  }
  100% {
    opacity: 1;
    -moz-transform: scale(1);
  }
}
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@-webkit-keyframes pop-out {
  100% {
    opacity: 0;
    -webkit-transform: scale(0.5);
  }
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes pop-out {
  100% {
    opacity: 0;
    -moz-transform: scale(0.5);
  }
  0% {
    opacity: 1;
    -moz-transform: scale(1);
  }
}
@keyframes pop-out {
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  0% {
    opacity: 1;
    transform: scale(1);
  }
}

.pop-in {
  -webkit-animation: pop-in 0.5s;
  -moz-animation: pop-in 0.5s;
  -ms-animation: pop-in 0.5s;
}

.pop-out {
  -webkit-animation: pop-out 0.5s;
  -moz-animation: pop-out 0.5s;
  -ms-animation: pop-out 0.5s;
}
</style>
