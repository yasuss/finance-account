import React from "react";
import { default as InlineSvg } from "react-inlinesvg";

// polyfill for ie 11
import "shared/ui/nodeChildrenPolyfill";

const SVG = React.memo(InlineSvg);

export default SVG;
