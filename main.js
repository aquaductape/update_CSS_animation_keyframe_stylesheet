const coinEl = document.getElementById("coin");

setTimeout(() => {
  coinEl.style.animationPlayState = "paused";
  // coinEl.style.animation = "none";
  updateStyleSheet();

  // coinEl.style.animation = "myJump 4000ms  infinite";
  setTimeout(() => {
    coinEl.style.animationPlayState = "running";
  }, 1000);
}, 3500);

const myJumpContent = () => `
    @keyframes myJump {
      0% {
        opacity: 0;
      }

      60% {
        opacity: 0;
      }

      65% {
        opacity: 1;
        left: 0;
        top: 0;
      }

      95% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        top: -150px;
        left: -75px;
      }
    }
                   
`;

const updateStyleSheet = () => {
  const oldStyle = document.getElementById("animation-style");
  const stylesheet = document.createElement("style");

  oldStyle.parentElement.removeChild(oldStyle);
  stylesheet.id = "animation-style";
  stylesheet.innerHTML = myJumpContent();
  document.head.appendChild(stylesheet);
};
