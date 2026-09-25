import axe, { type RunOptions, type AxeResults } from 'axe-core';

/** Rules that need real paint/layout; skip in Vitest/happy-dom. */
const AXE_OPTIONS: RunOptions = {
  rules: {
    'color-contrast': { enabled: false },
    'link-in-text-block': { enabled: false },
  },
};

/**
 * Runs axe against a connected subtree (supports open shadow roots).
 */
export async function expectNoAxeViolations(
  target: Element | Document,
  options: RunOptions = {},
): Promise<AxeResults> {
  const context: Element | Document =
    target instanceof Document ? target : target.isConnected ? target : document.body;

  if (target instanceof Element && !target.isConnected) {
    document.body.appendChild(target);
  }

  const results = await axe.run(context, {
    ...AXE_OPTIONS,
    ...options,
    rules: { ...AXE_OPTIONS.rules, ...options.rules },
  });

  if (results.violations.length) {
    const detail = results.violations
      .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.map((n) => n.html).join(' | ')}`)
      .join('\n');
    throw new Error(`axe violations:\n${detail}`);
  }
  return results;
}
