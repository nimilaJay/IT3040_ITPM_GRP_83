// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import $ from "jquery";
// eslint-disable-next-line no-multi-assign
global.$ = global.jQuery = $;
