export default function WorkflowPage() {
  const withoutSteps = [
    { text: "You write a detailed prompt", wait: false },
    { text: "wait for response", wait: true },
    { text: "You read the full output", wait: false },
    { text: "You copy sections into your project", wait: false },
    { text: "wait for next response", wait: true },
    { text: "You fix what broke", wait: false },
    { text: "You re-read, re-copy, re-test", wait: false },
  ];

  const withSteps = [
    { text: "You describe the outcome you want", auto: false },
    { text: "agents fan out in parallel", auto: true },
    { text: "Research agent gathers context", auto: false },
    { text: "Planning agent drafts the approach", auto: false },
    { text: "auto — agents coordinate", auto: true },
    { text: "Builder agent writes the code", auto: false },
    { text: "You review a finished result", auto: false },
  ];

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      {/* ---- Header ---- */}
      <section className="mb-8">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          The shift
        </p>
        <h1 className="text-2xl font-extrabold leading-tight mb-1">
          Working with vs without agents
        </h1>
        <p className="max-w-[600px] text-sm leading-relaxed text-muted">
          The biggest change isn&apos;t speed — it&apos;s where your attention goes.
        </p>
      </section>

      {/* ---- Side-by-side comparison ---- */}
      <section className="mb-10">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Without agents */}
          <div className="bento-cell overflow-hidden !p-0 gradient-red">
            <div
              className="px-5 py-4"
              style={{ backgroundColor: "rgba(220,38,38,0.06)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-danger">
                Without agents
              </h2>
            </div>
            <div className="space-y-0 p-5">
              {withoutSteps.map((step, i) =>
                step.wait ? (
                  <div key={i} className="py-1.5 pl-5">
                    <p className="font-mono text-[11px] text-danger/60">
                      {step.text}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-danger" />
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {step.text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* With agents */}
          <div className="bento-cell overflow-hidden !p-0 gradient-green">
            <div
              className="px-5 py-4"
              style={{ backgroundColor: "rgba(22,163,74,0.06)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-success">
                With agents
              </h2>
            </div>
            <div className="space-y-0 p-5">
              {withSteps.map((step, i) =>
                step.auto ? (
                  <div key={i} className="py-1.5 pl-5">
                    <p className="font-mono text-[11px] text-success/70">
                      {step.text}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-success" />
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {step.text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- What actually changes ---- */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold">
          What actually changes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bento-cell gradient-red">
            <h3 className="mb-3 text-lg font-bold text-danger">
              Without agents
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Every task is sequential and blocking. You prompt, wait, read,
              copy, test, fix, and repeat — one thread at a time. Your
              attention is consumed by the mechanics of moving information
              between tools. The bottleneck is always you.
            </p>
          </div>
          <div className="bento-cell gradient-green">
            <h3 className="mb-3 text-lg font-bold text-success">
              With agents
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Work is decoupled and parallel. You describe intent once, agents
              decompose it into subtasks and execute simultaneously. Your
              attention shifts to reviewing outcomes and making decisions. The
              bottleneck becomes your clarity of thought.
            </p>
          </div>
        </div>
      </section>

      {/* ---- The role you play ---- */}
      <section>
        <h2 className="mb-4 text-lg font-bold">
          The role you play
        </h2>
        <div className="bento-cell sm:p-10 gradient-purple">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              Without agents, you are the{" "}
              <span className="font-semibold text-foreground">
                dispatcher
              </span>{" "}
              — routing every message, tracking every thread, doing the
              work of coordination by hand.
            </p>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              With agents, you become the{" "}
              <span className="font-semibold text-success">director</span>{" "}
              — setting the vision, defining quality, and making the calls
              that matter.
            </p>
            <div className="mx-auto my-8 h-px w-16 bg-border2" />
            <p className="text-base leading-relaxed text-muted">
              The shift isn&apos;t about doing less. It&apos;s about moving
              from <span className="text-foreground">checking</span> to{" "}
              <span className="text-success">deciding</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
