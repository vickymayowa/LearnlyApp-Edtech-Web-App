<template>
  <div className="loading-div">
    <div className="loader"></div>
  </div>
</template>
<style>
.loading-div {
  position: absolute;
  height: 100% !important;
  width: 100% !important;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.24);
}
/*/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: l1 1s infinite;
}

@keyframes l1 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
