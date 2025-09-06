import { produce } from "immer";
import cloneDeep from "lodash.clonedeep";
import * as asciichart from "asciichart";
import { performance } from "perf_hooks";

type User = { id: number; name: string; age: number };
type State = { users: User[] };

const state: State = {
	users: Array.from({ length: 20000 }, (_, i) => ({ id: i, name: `User ${i}`, age: 20 }))
};
const userIdToUpdate = 12345;
const results: Record<string, number> = {};

function measure(label: string, fn: () => void, iterations = 1000) {
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		fn();
	}
	const end = performance.now();
	const total = end - start;
	const msPerUpdate = total / iterations;
	results[label] = msPerUpdate;
	console.log(
		`${label}: ${msPerUpdate.toFixed(6)} ms per update (${iterations} iterations, total ${total.toFixed(2)} ms)`
	);
}

// cloneDeep benchmark
measure("cloneDeep", () => {
	const newState = cloneDeep(state);
	newState.users[userIdToUpdate].age++;
});

// immer benchmark
measure("immer", () => {
	const newState = produce(state, (draft) => {
		draft.users[userIdToUpdate].age++;
	});
});

// Draw ASCII chart
console.log("\nBenchmark Results (lower is better):");
console.log("Library".padEnd(15) + "ms/update".padEnd(15) + "Bar");
const libraries = Object.keys(results);
const msValues = Object.values(results);
const maxMs = Math.max(...msValues);
const barWidth = 50;
const palette = [asciichart.blue, asciichart.green, asciichart.red, asciichart.yellow];

libraries.forEach((lib, idx) => {
	const ms = results[lib];
	const len = Math.round((ms / maxMs) * barWidth); // longer bar for higher ms
	const color = palette[idx % palette.length];
	const bar = asciichart.colored("█".repeat(len), color);
	console.log(lib.padEnd(15) + ms.toFixed(6).padEnd(15) + bar);
});

const bestLib = libraries.reduce((a, b) => (results[a] < results[b] ? a : b));
console.log(`\nBetter performance: ${bestLib} (${results[bestLib].toFixed(6)} ms/update)`);
