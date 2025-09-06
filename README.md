# Benchmark: Immer vs Lodash.cloneDeep

We benchmarked state updates using immer and lodash.cloneDeep to see which one performs better for deep cloning and updating nested objects.

## Setup

Each benchmark updates one nested field (profile.bio) in the state.

Benchmarks were run in Node.js using the following tools:

#### Tools Used

- Benchmark.js → to measure operations per second (ops/sec)

- asciichart → to render simple charts in the terminal

- Immer → optimized immutable state updates (structural sharing)

- Lodash.cloneDeep → deep copy utility for objects

### How to Run Locally

1. Clone the repository:

```bash
git clone <repository-url>
cd immer-benchmark
```

2. Install dependencies and run the benchmark:

```bash
npm install
npm run dev

```

## Results

The results show that immer consistently outperforms lodash.cloneDeep across different state sizes.

### Summary of Results

```
cloneDeep: 39.040177 ms per update (1000 iterations, total 39040.18 ms)
immer: 26.505659 ms per update (1000 iterations, total 26505.66 ms)
```

```
Benchmark Results (lower is better):
Library        ms/update      Bar
cloneDeep      39.040177      ██████████████████████████████████████████████████
immer          26.505659      ██████████████████████████████████
```

Immer is about 1.47x faster than cloneDeep for this benchmark.

💡 Takeaways

Immer is highly optimized for immutable state updates, especially with large nested objects.

cloneDeep always performs a full deep copy, making it much slower for frequent updates.

For complex client-side state, prefer Immer (or a state library that uses it) instead of manual deep copies.
