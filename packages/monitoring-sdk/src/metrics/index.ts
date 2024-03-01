/**
 * Lightweight in-process metrics registry compatible with Prometheus exposition.
 */

export type MetricLabels = Record<string, string>;

export class Counter {
  private value = 0;

  constructor(
    public readonly name: string,
    public readonly help: string,
    private readonly labels: MetricLabels = {},
  ) {}

  inc(by = 1): void {
    this.value += by;
  }

  get(): number {
    return this.value;
  }

  labelString(): string {
    const entries = Object.entries(this.labels);
    if (entries.length === 0) {
      return '';
    }
    return `{${entries.map(([k, v]) => `${k}="${v}"`).join(',')}}`;
  }
}

export class Histogram {
  private readonly buckets: Map<number, number>;
  private count = 0;
  private sum = 0;

  constructor(
    public readonly name: string,
    public readonly help: string,
    bucketBounds: number[] = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000],
    private readonly labels: MetricLabels = {},
  ) {
    this.buckets = new Map(bucketBounds.map((b) => [b, 0]));
  }

  observe(valueMs: number): void {
    this.count += 1;
    this.sum += valueMs;
    for (const bound of this.buckets.keys()) {
      if (valueMs <= bound) {
        this.buckets.set(bound, (this.buckets.get(bound) ?? 0) + 1);
      }
    }
  }

  expose(): string {
    const lines: string[] = [];
    const label = this.labelString();
    for (const [bound, count] of this.buckets.entries()) {
      lines.push(
        `${this.name}_bucket{le="${bound}"${label ? `,${label.slice(1, -1)}` : ''}} ${count}`,
      );
    }
    lines.push(`${this.name}_bucket{le="+Inf"${label ? `,${label.slice(1, -1)}` : ''}} ${this.count}`);
    lines.push(`${this.name}_sum${label} ${this.sum}`);
    lines.push(`${this.name}_count${label} ${this.count}`);
    return lines.join('\n');
  }

  private labelString(): string {
    const entries = Object.entries(this.labels);
    if (entries.length === 0) {
      return '';
    }
    return `{${entries.map(([k, v]) => `${k}="${v}"`).join(',')}}`;
  }
}

export class MetricsRegistry {
  private readonly counters = new Map<string, Counter>();
  private readonly histograms = new Map<string, Histogram>();

  counter(name: string, help: string, labels?: MetricLabels): Counter {
    const key = `${name}:${JSON.stringify(labels ?? {})}`;
    let counter = this.counters.get(key);
    if (!counter) {
      counter = new Counter(name, help, labels);
      this.counters.set(key, counter);
    }
    return counter;
  }

  histogram(name: string, help: string, labels?: MetricLabels): Histogram {
    const key = `${name}:${JSON.stringify(labels ?? {})}`;
    let histogram = this.histograms.get(key);
    if (!histogram) {
      histogram = new Histogram(name, help, undefined, labels);
      this.histograms.set(key, histogram);
    }
    return histogram;
  }

  exposePrometheus(): string {
    const lines: string[] = [];
    for (const counter of this.counters.values()) {
      lines.push(`# HELP ${counter.name} ${counter.help}`);
      lines.push(`# TYPE ${counter.name} counter`);
      lines.push(`${counter.name}${counter.labelString()} ${counter.get()}`);
    }
    for (const histogram of this.histograms.values()) {
      lines.push(`# HELP ${histogram.name} ${histogram.help}`);
      lines.push(`# TYPE ${histogram.name} histogram`);
      lines.push(histogram.expose());
    }
    return `${lines.join('\n')}\n`;
  }
}

export const globalMetrics = new MetricsRegistry();
