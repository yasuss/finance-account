import { default as InlineSvg } from "react-inlinesvg";
import React from "react";

// полифил для работы ie 11
import "./nodeChildrenPolyfill";

const SVG = React.memo(InlineSvg);

export default SVG;
