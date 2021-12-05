/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://cards/./src/style.scss?");

/***/ }),

/***/ "./node_modules/vanilla-tilt/lib/vanilla-tilt.js":
/*!*******************************************************!*\
  !*** ./node_modules/vanilla-tilt/lib/vanilla-tilt.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("\n\nvar classCallCheck = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\n/**\n * Created by Sergiu Șandor (micku7zu) on 1/27/2017.\n * Original idea: https://github.com/gijsroge/tilt.js\n * MIT License.\n * Version 1.7.2\n */\n\nvar VanillaTilt = function () {\n  function VanillaTilt(element) {\n    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    classCallCheck(this, VanillaTilt);\n\n    if (!(element instanceof Node)) {\n      throw \"Can't initialize VanillaTilt because \" + element + \" is not a Node.\";\n    }\n\n    this.width = null;\n    this.height = null;\n    this.clientWidth = null;\n    this.clientHeight = null;\n    this.left = null;\n    this.top = null;\n\n    // for Gyroscope sampling\n    this.gammazero = null;\n    this.betazero = null;\n    this.lastgammazero = null;\n    this.lastbetazero = null;\n\n    this.transitionTimeout = null;\n    this.updateCall = null;\n    this.event = null;\n\n    this.updateBind = this.update.bind(this);\n    this.resetBind = this.reset.bind(this);\n\n    this.element = element;\n    this.settings = this.extendSettings(settings);\n\n    this.reverse = this.settings.reverse ? -1 : 1;\n    this.glare = VanillaTilt.isSettingTrue(this.settings.glare);\n    this.glarePrerender = VanillaTilt.isSettingTrue(this.settings[\"glare-prerender\"]);\n    this.fullPageListening = VanillaTilt.isSettingTrue(this.settings[\"full-page-listening\"]);\n    this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);\n    this.gyroscopeSamples = this.settings.gyroscopeSamples;\n\n    this.elementListener = this.getElementListener();\n\n    if (this.glare) {\n      this.prepareGlare();\n    }\n\n    if (this.fullPageListening) {\n      this.updateClientSize();\n    }\n\n    this.addEventListeners();\n    this.reset();\n    this.updateInitialPosition();\n  }\n\n  VanillaTilt.isSettingTrue = function isSettingTrue(setting) {\n    return setting === \"\" || setting === true || setting === 1;\n  };\n\n  /**\n   * Method returns element what will be listen mouse events\n   * @return {Node}\n   */\n\n\n  VanillaTilt.prototype.getElementListener = function getElementListener() {\n    if (this.fullPageListening) {\n      return window.document;\n    }\n\n    if (typeof this.settings[\"mouse-event-element\"] === \"string\") {\n      var mouseEventElement = document.querySelector(this.settings[\"mouse-event-element\"]);\n\n      if (mouseEventElement) {\n        return mouseEventElement;\n      }\n    }\n\n    if (this.settings[\"mouse-event-element\"] instanceof Node) {\n      return this.settings[\"mouse-event-element\"];\n    }\n\n    return this.element;\n  };\n\n  /**\n   * Method set listen methods for this.elementListener\n   * @return {Node}\n   */\n\n\n  VanillaTilt.prototype.addEventListeners = function addEventListeners() {\n    this.onMouseEnterBind = this.onMouseEnter.bind(this);\n    this.onMouseMoveBind = this.onMouseMove.bind(this);\n    this.onMouseLeaveBind = this.onMouseLeave.bind(this);\n    this.onWindowResizeBind = this.onWindowResize.bind(this);\n    this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);\n\n    this.elementListener.addEventListener(\"mouseenter\", this.onMouseEnterBind);\n    this.elementListener.addEventListener(\"mouseleave\", this.onMouseLeaveBind);\n    this.elementListener.addEventListener(\"mousemove\", this.onMouseMoveBind);\n\n    if (this.glare || this.fullPageListening) {\n      window.addEventListener(\"resize\", this.onWindowResizeBind);\n    }\n\n    if (this.gyroscope) {\n      window.addEventListener(\"deviceorientation\", this.onDeviceOrientationBind);\n    }\n  };\n\n  /**\n   * Method remove event listeners from current this.elementListener\n   */\n\n\n  VanillaTilt.prototype.removeEventListeners = function removeEventListeners() {\n    this.elementListener.removeEventListener(\"mouseenter\", this.onMouseEnterBind);\n    this.elementListener.removeEventListener(\"mouseleave\", this.onMouseLeaveBind);\n    this.elementListener.removeEventListener(\"mousemove\", this.onMouseMoveBind);\n\n    if (this.gyroscope) {\n      window.removeEventListener(\"deviceorientation\", this.onDeviceOrientationBind);\n    }\n\n    if (this.glare || this.fullPageListening) {\n      window.removeEventListener(\"resize\", this.onWindowResizeBind);\n    }\n  };\n\n  VanillaTilt.prototype.destroy = function destroy() {\n    clearTimeout(this.transitionTimeout);\n    if (this.updateCall !== null) {\n      cancelAnimationFrame(this.updateCall);\n    }\n\n    this.reset();\n\n    this.removeEventListeners();\n    this.element.vanillaTilt = null;\n    delete this.element.vanillaTilt;\n\n    this.element = null;\n  };\n\n  VanillaTilt.prototype.onDeviceOrientation = function onDeviceOrientation(event) {\n    if (event.gamma === null || event.beta === null) {\n      return;\n    }\n\n    this.updateElementPosition();\n\n    if (this.gyroscopeSamples > 0) {\n      this.lastgammazero = this.gammazero;\n      this.lastbetazero = this.betazero;\n\n      if (this.gammazero === null) {\n        this.gammazero = event.gamma;\n        this.betazero = event.beta;\n      } else {\n        this.gammazero = (event.gamma + this.lastgammazero) / 2;\n        this.betazero = (event.beta + this.lastbetazero) / 2;\n      }\n\n      this.gyroscopeSamples -= 1;\n    }\n\n    var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;\n    var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;\n\n    var degreesPerPixelX = totalAngleX / this.width;\n    var degreesPerPixelY = totalAngleY / this.height;\n\n    var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);\n    var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);\n\n    var posX = angleX / degreesPerPixelX;\n    var posY = angleY / degreesPerPixelY;\n\n    if (this.updateCall !== null) {\n      cancelAnimationFrame(this.updateCall);\n    }\n\n    this.event = {\n      clientX: posX + this.left,\n      clientY: posY + this.top\n    };\n\n    this.updateCall = requestAnimationFrame(this.updateBind);\n  };\n\n  VanillaTilt.prototype.onMouseEnter = function onMouseEnter() {\n    this.updateElementPosition();\n    this.element.style.willChange = \"transform\";\n    this.setTransition();\n  };\n\n  VanillaTilt.prototype.onMouseMove = function onMouseMove(event) {\n    if (this.updateCall !== null) {\n      cancelAnimationFrame(this.updateCall);\n    }\n\n    this.event = event;\n    this.updateCall = requestAnimationFrame(this.updateBind);\n  };\n\n  VanillaTilt.prototype.onMouseLeave = function onMouseLeave() {\n    this.setTransition();\n\n    if (this.settings.reset) {\n      requestAnimationFrame(this.resetBind);\n    }\n  };\n\n  VanillaTilt.prototype.reset = function reset() {\n    this.event = {\n      clientX: this.left + this.width / 2,\n      clientY: this.top + this.height / 2\n    };\n\n    if (this.element && this.element.style) {\n      this.element.style.transform = \"perspective(\" + this.settings.perspective + \"px) \" + \"rotateX(0deg) \" + \"rotateY(0deg) \" + \"scale3d(1, 1, 1)\";\n    }\n\n    this.resetGlare();\n  };\n\n  VanillaTilt.prototype.resetGlare = function resetGlare() {\n    if (this.glare) {\n      this.glareElement.style.transform = \"rotate(180deg) translate(-50%, -50%)\";\n      this.glareElement.style.opacity = \"0\";\n    }\n  };\n\n  VanillaTilt.prototype.updateInitialPosition = function updateInitialPosition() {\n    if (this.settings.startX === 0 && this.settings.startY === 0) {\n      return;\n    }\n\n    this.onMouseEnter();\n\n    if (this.fullPageListening) {\n      this.event = {\n        clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,\n        clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight\n      };\n    } else {\n      this.event = {\n        clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,\n        clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height\n      };\n    }\n\n    var backupScale = this.settings.scale;\n    this.settings.scale = 1;\n    this.update();\n    this.settings.scale = backupScale;\n    this.resetGlare();\n  };\n\n  VanillaTilt.prototype.getValues = function getValues() {\n    var x = void 0,\n        y = void 0;\n\n    if (this.fullPageListening) {\n      x = this.event.clientX / this.clientWidth;\n      y = this.event.clientY / this.clientHeight;\n    } else {\n      x = (this.event.clientX - this.left) / this.width;\n      y = (this.event.clientY - this.top) / this.height;\n    }\n\n    x = Math.min(Math.max(x, 0), 1);\n    y = Math.min(Math.max(y, 0), 1);\n\n    var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);\n    var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);\n    var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);\n\n    return {\n      tiltX: tiltX,\n      tiltY: tiltY,\n      percentageX: x * 100,\n      percentageY: y * 100,\n      angle: angle\n    };\n  };\n\n  VanillaTilt.prototype.updateElementPosition = function updateElementPosition() {\n    var rect = this.element.getBoundingClientRect();\n\n    this.width = this.element.offsetWidth;\n    this.height = this.element.offsetHeight;\n    this.left = rect.left;\n    this.top = rect.top;\n  };\n\n  VanillaTilt.prototype.update = function update() {\n    var values = this.getValues();\n\n    this.element.style.transform = \"perspective(\" + this.settings.perspective + \"px) \" + \"rotateX(\" + (this.settings.axis === \"x\" ? 0 : values.tiltY) + \"deg) \" + \"rotateY(\" + (this.settings.axis === \"y\" ? 0 : values.tiltX) + \"deg) \" + \"scale3d(\" + this.settings.scale + \", \" + this.settings.scale + \", \" + this.settings.scale + \")\";\n\n    if (this.glare) {\n      this.glareElement.style.transform = \"rotate(\" + values.angle + \"deg) translate(-50%, -50%)\";\n      this.glareElement.style.opacity = \"\" + values.percentageY * this.settings[\"max-glare\"] / 100;\n    }\n\n    this.element.dispatchEvent(new CustomEvent(\"tiltChange\", {\n      \"detail\": values\n    }));\n\n    this.updateCall = null;\n  };\n\n  /**\n   * Appends the glare element (if glarePrerender equals false)\n   * and sets the default style\n   */\n\n\n  VanillaTilt.prototype.prepareGlare = function prepareGlare() {\n    // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.\n    if (!this.glarePrerender) {\n      // Create glare element\n      var jsTiltGlare = document.createElement(\"div\");\n      jsTiltGlare.classList.add(\"js-tilt-glare\");\n\n      var jsTiltGlareInner = document.createElement(\"div\");\n      jsTiltGlareInner.classList.add(\"js-tilt-glare-inner\");\n\n      jsTiltGlare.appendChild(jsTiltGlareInner);\n      this.element.appendChild(jsTiltGlare);\n    }\n\n    this.glareElementWrapper = this.element.querySelector(\".js-tilt-glare\");\n    this.glareElement = this.element.querySelector(\".js-tilt-glare-inner\");\n\n    if (this.glarePrerender) {\n      return;\n    }\n\n    Object.assign(this.glareElementWrapper.style, {\n      \"position\": \"absolute\",\n      \"top\": \"0\",\n      \"left\": \"0\",\n      \"width\": \"100%\",\n      \"height\": \"100%\",\n      \"overflow\": \"hidden\",\n      \"pointer-events\": \"none\"\n    });\n\n    Object.assign(this.glareElement.style, {\n      \"position\": \"absolute\",\n      \"top\": \"50%\",\n      \"left\": \"50%\",\n      \"pointer-events\": \"none\",\n      \"background-image\": \"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)\",\n      \"transform\": \"rotate(180deg) translate(-50%, -50%)\",\n      \"transform-origin\": \"0% 0%\",\n      \"opacity\": \"0\"\n    });\n\n    this.updateGlareSize();\n  };\n\n  VanillaTilt.prototype.updateGlareSize = function updateGlareSize() {\n    if (this.glare) {\n      var glareSize = (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight) * 2;\n\n      Object.assign(this.glareElement.style, {\n        \"width\": glareSize + \"px\",\n        \"height\": glareSize + \"px\"\n      });\n    }\n  };\n\n  VanillaTilt.prototype.updateClientSize = function updateClientSize() {\n    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;\n\n    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;\n  };\n\n  VanillaTilt.prototype.onWindowResize = function onWindowResize() {\n    this.updateGlareSize();\n    this.updateClientSize();\n  };\n\n  VanillaTilt.prototype.setTransition = function setTransition() {\n    var _this = this;\n\n    clearTimeout(this.transitionTimeout);\n    this.element.style.transition = this.settings.speed + \"ms \" + this.settings.easing;\n    if (this.glare) this.glareElement.style.transition = \"opacity \" + this.settings.speed + \"ms \" + this.settings.easing;\n\n    this.transitionTimeout = setTimeout(function () {\n      _this.element.style.transition = \"\";\n      if (_this.glare) {\n        _this.glareElement.style.transition = \"\";\n      }\n    }, this.settings.speed);\n  };\n\n  /**\n   * Method return patched settings of instance\n   * @param {boolean} settings.reverse - reverse the tilt direction\n   * @param {number} settings.max - max tilt rotation (degrees)\n   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0\n   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0\n   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets\n   * @param {string} settings.easing - Easing on enter/exit\n   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..\n   * @param {number} settings.speed - Speed of the enter/exit transition\n   * @param {boolean} settings.transition - Set a transition on enter/exit\n   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y\n   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y\n   * @param {number} settings.max-glare - the maximum \"glare\" opacity (1 = 100%, 0.5 = 50%)\n   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise\n   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element\n   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events\n   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit\n   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events\n   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..\n   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.\n   */\n\n\n  VanillaTilt.prototype.extendSettings = function extendSettings(settings) {\n    var defaultSettings = {\n      reverse: false,\n      max: 15,\n      startX: 0,\n      startY: 0,\n      perspective: 1000,\n      easing: \"cubic-bezier(.03,.98,.52,.99)\",\n      scale: 1,\n      speed: 300,\n      transition: true,\n      axis: null,\n      glare: false,\n      \"max-glare\": 1,\n      \"glare-prerender\": false,\n      \"full-page-listening\": false,\n      \"mouse-event-element\": null,\n      reset: true,\n      gyroscope: true,\n      gyroscopeMinAngleX: -45,\n      gyroscopeMaxAngleX: 45,\n      gyroscopeMinAngleY: -45,\n      gyroscopeMaxAngleY: 45,\n      gyroscopeSamples: 10\n    };\n\n    var newSettings = {};\n    for (var property in defaultSettings) {\n      if (property in settings) {\n        newSettings[property] = settings[property];\n      } else if (this.element.hasAttribute(\"data-tilt-\" + property)) {\n        var attribute = this.element.getAttribute(\"data-tilt-\" + property);\n        try {\n          newSettings[property] = JSON.parse(attribute);\n        } catch (e) {\n          newSettings[property] = attribute;\n        }\n      } else {\n        newSettings[property] = defaultSettings[property];\n      }\n    }\n\n    return newSettings;\n  };\n\n  VanillaTilt.init = function init(elements, settings) {\n    if (elements instanceof Node) {\n      elements = [elements];\n    }\n\n    if (elements instanceof NodeList) {\n      elements = [].slice.call(elements);\n    }\n\n    if (!(elements instanceof Array)) {\n      return;\n    }\n\n    elements.forEach(function (element) {\n      if (!(\"vanillaTilt\" in element)) {\n        element.vanillaTilt = new VanillaTilt(element, settings);\n      }\n    });\n  };\n\n  return VanillaTilt;\n}();\n\nif (typeof document !== \"undefined\") {\n  /* expose the class to window */\n  window.VanillaTilt = VanillaTilt;\n\n  /**\n   * Auto load\n   */\n  VanillaTilt.init(document.querySelectorAll(\"[data-tilt]\"));\n}\n\nmodule.exports = VanillaTilt;\n\n\n//# sourceURL=webpack://cards/./node_modules/vanilla-tilt/lib/vanilla-tilt.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/style.scss */ \"./src/style.scss\");\n/* harmony import */ var vanilla_tilt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vanilla-tilt */ \"./node_modules/vanilla-tilt/lib/vanilla-tilt.js\");\n/* harmony import */ var vanilla_tilt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vanilla_tilt__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst card = document.querySelectorAll('.card');\r\nvanilla_tilt__WEBPACK_IMPORTED_MODULE_1___default().init(card, {\r\n    max: 10,\r\n    reverse: true,\r\n    glare: true,\r\n    \"max-glare\": 0.3,\r\n    \"glare-prerender\": false,\r\n});\n\n//# sourceURL=webpack://cards/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;