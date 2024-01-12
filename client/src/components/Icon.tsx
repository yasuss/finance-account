import React from "react";
import { default as InlineSvg } from "react-inlinesvg";

// полифил для работы ie 11
import "./nodeChildrenPolyfill";

const SVG = React.memo(InlineSvg);

export default SVG;
