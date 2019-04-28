/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\"use stric\";\r\n\r\nconst canvas = document.querySelector(\"canvas\");\r\ncanvas.width = 800;\r\ncanvas.height = 600;\r\n\r\nlet c = canvas.getContext(\"2d\");\r\n\r\nlet width = canvas.width;\r\nlet height = canvas.height;\r\nlet originX = canvas.width / 2;\r\nlet originY = canvas.height / 2;\r\n\r\nfunction drawBackground() {\r\n  for (let i = 0; i < 680; i++) {\r\n    c.strokeStyle = \"rgba(0,0,0,0.3)\";\r\n    if (i % 300 == 0) {\r\n      c.strokeStyle = \"rgba(0, 0, 0, 0.8)\";\r\n    }\r\n    if (i % 20 == 0) {\r\n      c.beginPath();\r\n      c.moveTo(0, i);\r\n      c.lineTo(width, i);\r\n      c.stroke();\r\n      c.closePath();\r\n    }\r\n  }\r\n\r\n  for (let a = 0; a < 800; a++) {\r\n    c.strokeStyle = \"rgba(0,0,0,0.3)\";\r\n    if (a % 400 == 0) {\r\n      c.strokeStyle = \"rgba(0, 0, 0, 0.8)\";\r\n    }\r\n    if (a % 20 == 0) {\r\n      c.beginPath();\r\n      c.moveTo(a, 0);\r\n      c.lineTo(a, height);\r\n      c.stroke();\r\n      c.closePath();\r\n    }\r\n  }\r\n}\r\n\r\ndrawBackground();\r\n\r\nc.strokeStyle = \"rgba(0, 0, 0, 0.9)\";\r\n\r\nc.beginPath();\r\nfor (let i = -100; i < 100; i++) {\r\n  draw(i, i * i);\r\n}\r\n\r\nfunction draw(x, y) {\r\n  let calculatedX = originX + x;\r\n  let calculatedY = originY + -y / 20;\r\n\r\n  c.lineTo(calculatedX, calculatedY);\r\n}\r\nc.stroke();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });