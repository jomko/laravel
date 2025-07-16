import { cn } from './lib/utils'

export default function BackendOverview({ className = '' }: { className?: string }) {
  return (
    <section className={cn('max-w-4xl mx-auto px-6 py-12 font-sans text-gray-800 dark:text-gray-100 space-y-10', className)}>
      <div>
        <h1 className="text-3xl font-bold mb-4">🔧 Backend </h1>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🧠 Architecture</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Framework:</b> Laravel</li>
          <li><b>Purpose:</b> API-only backend</li>
          <li><b>Structure:</b> monorepo with <code>backend/</code> and <code>frontend/</code> plus dev container</li>
          <li><b>Frontend:</b> separate Vue 3 PWA</li>
          <li><b>API-first:</b> all UI via REST</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🗃 Database</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>PostgreSQL:</b> UUID primary keys tuned for SKU logic</li>
          <li><b>Redis:</b> cache, queues, Horizon</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🚦 Queues and jobs</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Laravel Queues:</b> handle syncs, imports and exports</li>
          <li><b>Horizon:</b> queue monitoring</li>
          <li><b>Scheduler:</b> cron jobs</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">⚙️ Key modules</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>SKU Engine:</b> deduplication, aliases, mapping</li>
          <li><b>Inventory:</b> stock, movement, locations</li>
          <li><b>Orders:</b> statuses, stages, sources</li>
          <li><b>Pricing Engine:</b> wholesale / retail / marketplace</li>
          <li><b>Channels:</b> Etsy / Woo / Faire / eBay / Walmart</li>
          <li><b>Label Creator:</b> PDF labels</li>
          <li><b>SKU Microservice:</b> FastAPI service for SKU logic</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🔐 Security</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Laravel Sanctum:</b> token-based auth</li>
          <li><b>Role-based access:</b> admin / staff / etc.</li>
          <li><b>Middleware filters:</b> access control</li>
          <li><b>Rate limiting + audit:</b> protection and logging</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🚀 Infrastructure</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Dev environment:</b> DDEV (nginx + php + postgres + redis)</li>
          <li><b>Config:</b> .env for dev, staging and prod</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">📚 API Documentation</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Swagger (Laravel Spectator):</b> auto-generates OpenAPI spec</li>
          <li><b>Postman/Insomnia:</b> ready collections</li>
          <li><b>JSON:API format:</b> consistent responses</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🧪 Testing</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>PHPUnit + Laravel Factories:</b> unit and integration tests</li>
          <li><b>Feature tests:</b> key business cases</li>
          <li><b>Coverage:</b> core modules tested</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🧩 Modularity</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Split services:</b> SKU logic in FastAPI</li>
          <li><b>Container architecture:</b> DDEV for quick start</li>
          <li><b>Custom Laravel packages:</b> planned for scale</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🔍 Monitoring & logs</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Telescope (local):</b> debug and profiling</li>
          <li><b>Log channels:</b> category based</li>
          <li><b>Sentry/Logtail:</b> planned centralized logging</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">🌐 Localization</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Channels with languages:</b> eBay, Faire, Etsy</li>
          <li><b>Field localization:</b> names, description, SEO meta</li>
          <li><b>i18n frontend:</b> API support via Vue i18n</li>
        </ul>
      </div>
    </section>
  )
}
