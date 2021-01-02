const coinEl = document.getElementById("coin");
let direction = "left";

// runs once because animationiteration fires after iteration is done, not when it starts
updateCoinAnimationDirection();
coinEl.addEventListener("animationiteration", () => {
  updateCoinAnimationDirection();
});

function updateCoinAnimationDirection() {
  setTimeout(() => {
    if (direction === "left") {
      direction = "right";
    } else {
      direction = "left";
    }

    coinEl.style.animationPlayState = "paused";

    // Normal Procedure in Non-Webkit browsers
    // updateAnimationByCSSKeyFrameRule(direction);

    // Failed-Workaround 1
    updateAnimationByRefreshStyleEl(direction);

    // Failed-Workaround 2
    // coinEl.style.animation = "none";
    // document.body.clientHeight // force reflow to set style
    // coinEl.style.animation = "myJump 4000ms  infinite";
    setTimeout(() => {
      coinEl.style.animationPlayState = "running";
    }, 1000);
  }, 3400);
}

const myJumpContent = (direction) => {
  return `
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
      left: ${direction === "left" ? "75px" : "-75px"};
    }
  }
                 
`;
};

const updateAnimationByRefreshStyleEl = (direction) => {
  const oldStyle = document.getElementById("animation-style");
  const stylesheet = document.createElement("style");

  oldStyle.parentElement.removeChild(oldStyle);
  stylesheet.id = "animation-style";
  stylesheet.innerHTML = myJumpContent(direction);
  document.head.appendChild(stylesheet);
};

const updateAnimationByCSSKeyFrameRule = (direction) => {
  const rules = findKeyframesRule("myJump");
  rules.deleteRule("100%");
  rules.appendRule(`
  100% {
    opacity: 0;
    top: -150px;
    left: ${direction === "left" ? "75px" : "-75px"};
  }`);
};

const findKeyframesRule = (rule) => {
  //get object of our rule
  var ss = document.styleSheets; // get array of stylesheets
  for (var i = 0; i < ss.length; ++i) {
    // loop thru stylesheets
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      // loop thru rules
      if (ss[i].cssRules[j].name == rule) {
        //if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE)  //***update WEBKIT***
        return ss[i].cssRules[j];
      }
    }
  }
  console.log("%cRules not found for " + rule, "background-color:red;"); // rule not found
  return null;
};
