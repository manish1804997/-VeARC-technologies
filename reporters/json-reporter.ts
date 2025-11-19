import fs from 'fs';
import path from 'path';
import type { FullResult, Reporter } from '@playwright/test/reporter';

class JsonReporter implements Reporter {
  onEnd(result: FullResult) {
    // Cast to any for runtime-only properties that the FullResult type doesn't list
    const res: any = result;

    try {
      console.log('[JsonReporter TS] onEnd invoked');

      const results = Array.isArray(res.results) ? res.results : [];
      const out = {
        status: res.status ?? 'unknown',
        duration: res.duration ?? 0,
        // errors may not be part of the declared FullResult type — guard it
        errors: Array.isArray(res.errors) ? res.errors : [],
        collected: (res.config && Array.isArray(res.config.projects)) ? res.config.projects.length : 0,
        results: results.map((r: any) => ({
          title: r.title,
          status: r.status,
          errors: Array.isArray(r.errors) ? r.errors : [],
          duration: r.duration,
          location: r.location ?? null
        }))
      };

      const filePath = path.join(process.cwd(), 'playwright-results.json');
      fs.writeFileSync(filePath, JSON.stringify(out, null, 2));
      console.log('[JsonReporter TS] Report written to', filePath);
    } catch (err) {
      console.error('[JsonReporter TS] Failed to write report', err);
    }
  }
}

export default JsonReporter;
