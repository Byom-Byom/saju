// Browser entry for the Legend Saju engine. Bundled into ../saju-engine.js by build-engine.mjs.
export { resolveAsync } from "../../엔진/src/engine/public-entry";
export { buildConsumerReading, buildMethodologyVerdicts } from "../../엔진/src/engine/consumer-reading";
export { buildNatalCardPayload, buildLuckTimelinePayload, buildCompatibilityCardPayload } from "../../엔진/src/mcp-render";
export { Lunar } from "lunar-typescript";
