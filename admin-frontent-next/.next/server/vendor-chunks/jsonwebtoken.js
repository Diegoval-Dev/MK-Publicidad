/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jsonwebtoken";
exports.ids = ["vendor-chunks/jsonwebtoken"];
exports.modules = {

/***/ "(ssr)/./node_modules/jsonwebtoken/decode.js":
/*!*********************************************!*\
  !*** ./node_modules/jsonwebtoken/decode.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var jws = __webpack_require__(/*! jws */ \"(ssr)/./node_modules/jws/index.js\");\n\nmodule.exports = function (jwt, options) {\n  options = options || {};\n  var decoded = jws.decode(jwt, options);\n  if (!decoded) { return null; }\n  var payload = decoded.payload;\n\n  //try parse the payload\n  if(typeof payload === 'string') {\n    try {\n      var obj = JSON.parse(payload);\n      if(obj !== null && typeof obj === 'object') {\n        payload = obj;\n      }\n    } catch (e) { }\n  }\n\n  //return header if `complete` option is enabled.  header includes claims\n  //such as `kid` and `alg` used to select the key within a JWKS needed to\n  //verify the signature\n  if (options.complete === true) {\n    return {\n      header: decoded.header,\n      payload: payload,\n      signature: decoded.signature\n    };\n  }\n  return payload;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvanNvbndlYnRva2VuL2RlY29kZS5qcyIsIm1hcHBpbmdzIjoiQUFBQSxVQUFVLG1CQUFPLENBQUMsOENBQUs7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZG1pbi1mcm9udGVudC1uZXh0Ly4vbm9kZV9tb2R1bGVzL2pzb253ZWJ0b2tlbi9kZWNvZGUuanM/ZmIzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgandzID0gcmVxdWlyZSgnandzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGp3dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGRlY29kZWQgPSBqd3MuZGVjb2RlKGp3dCwgb3B0aW9ucyk7XG4gIGlmICghZGVjb2RlZCkgeyByZXR1cm4gbnVsbDsgfVxuICB2YXIgcGF5bG9hZCA9IGRlY29kZWQucGF5bG9hZDtcblxuICAvL3RyeSBwYXJzZSB0aGUgcGF5bG9hZFxuICBpZih0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICBpZihvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcGF5bG9hZCA9IG9iajtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIC8vcmV0dXJuIGhlYWRlciBpZiBgY29tcGxldGVgIG9wdGlvbiBpcyBlbmFibGVkLiAgaGVhZGVyIGluY2x1ZGVzIGNsYWltc1xuICAvL3N1Y2ggYXMgYGtpZGAgYW5kIGBhbGdgIHVzZWQgdG8gc2VsZWN0IHRoZSBrZXkgd2l0aGluIGEgSldLUyBuZWVkZWQgdG9cbiAgLy92ZXJpZnkgdGhlIHNpZ25hdHVyZVxuICBpZiAob3B0aW9ucy5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXI6IGRlY29kZWQuaGVhZGVyLFxuICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgIHNpZ25hdHVyZTogZGVjb2RlZC5zaWduYXR1cmVcbiAgICB9O1xuICB9XG4gIHJldHVybiBwYXlsb2FkO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/jsonwebtoken/decode.js\n");

/***/ })

};
;