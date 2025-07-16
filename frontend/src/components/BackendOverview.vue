<template>
  <section class="max-w-4xl mx-auto px-6 py-12 font-sans text-gray-800 dark:text-gray-100 space-y-10">
    <div>
      <h1 class="text-3xl font-bold mb-4">🔧 Backend — Морква 2.0</h1>
    </div>

    <!-- Архітектура -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🧠 Архітектура</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Фреймворк:</b> Laravel </li>
        <li><b>Призначення:</b> API-only backend (жодного Blade, SSR чи Inertia)</li>
        <li><b>Організація:</b> монорепо: <code>backend/</code> + <code>frontend/</code> + dev контейнер</li>
        <li><b>Фронтенд:</b> окрема PWA на Vue 3</li>
        <li><b>API-first:</b> весь UI працює через REST API</li>
      </ul>
    </div>

    <!-- База даних -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🗃 База даних</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>PostgreSQL:</b> UUID як primary key, оптимізована під SKU-логіку</li>
        <li><b>Redis:</b> кеш, черги, Horizon</li>
      </ul>
    </div>

    <!-- Черги -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🚦 Черги та задачі</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Laravel Queues:</b> обробка синхронізацій, імпортів, експорту</li>
        <li><b>Horizon:</b> моніторинг черг</li>
        <li><b>Scheduler:</b> cron-задачі</li>
      </ul>
    </div>

    <!-- Основні модулі -->
    <div>
      <h2 class="text-xl font-semibold mb-3">⚙️ Основні модулі</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>SKU Engine:</b> дедуплікація, псевдоніми, зіставлення</li>
        <li><b>Inventory:</b> залишки, рух, локації складу</li>
        <li><b>Orders:</b> статуси, етапи, джерела замовлень</li>
        <li><b>Pricing Engine:</b> wholesale / retail / marketplace</li>
        <li><b>Channels:</b> Etsy / Woo / Faire / eBay / Walmart</li>
        <li><b>Label Creator:</b> PDF-генерація етикеток</li>
        <li><b>SKU Microservice:</b> FastAPI-сервіс для SKU-логіки</li>
      </ul>
    </div>

    <!-- Безпека -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🔐 Безпека</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Laravel Sanctum:</b> token-based auth</li>
        <li><b>Role-based доступ:</b> admin / staff / etc.</li>
        <li><b>Middleware-фільтри:</b> контроль доступу</li>
        <li><b>Rate limiting + аудит:</b> захист та логування</li>
      </ul>
    </div>

    <!-- Інфраструктура -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🚀 Інфраструктура</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Dev-середовище:</b> DDEV (nginx + php + postgres + redis)</li>
        <li><b>Конфігурація:</b> .env для середовищ (dev, staging, prod)</li>
      </ul>
    </div>

    <!-- Документація -->
    <div>
      <h2 class="text-xl font-semibold mb-3">📚 Документація API</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Swagger (Laravel Spectator):</b> автоматична генерація OpenAPI-специфікації</li>
        <li><b>Postman/Insomnia:</b> підтримка готових колекцій</li>
        <li><b>JSON:API-формат:</b> уніфіковані відповіді, чітка структура</li>
      </ul>
    </div>

    <!-- Тестування -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🧪 Тестування</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>PHPUnit + Laravel Factories:</b> юніт- і інтеграційні тести</li>
        <li><b>Feature-тести:</b> критичні бізнес-кейси</li>
        <li><b>Покриття:</b> ключові модулі протестовані</li>
      </ul>
    </div>

    <!-- Модульність -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🧩 Модульність</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Розділені сервіси:</b> SKU-логіка винесена у FastAPI</li>
        <li><b>Контейнерна архітектура:</b> DDEV дозволяє швидкий старт</li>
        <li><b>Власні Laravel-пакети:</b> планується для масштабування</li>
      </ul>
    </div>

    <!-- Моніторинг -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🔍 Моніторинг і логи</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Telescope (локально):</b> дебаг та профілювання</li>
        <li><b>Лог-канали:</b> поділені на категорії (наприклад, platforms.log)</li>
        <li><b>Sentry/Logtail:</b> планується централізоване логування</li>
      </ul>
    </div>

    <!-- Локалізація -->
    <div>
      <h2 class="text-xl font-semibold mb-3">🌐 Локалізація та мультимовність</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><b>Канали з підтримкою мов:</b> eBay, Faire, Etsy</li>
        <li><b>Локалізація полів:</b> назви, опис, SEO-мета</li>
        <li><b>i18n-фронт:</b> підтримка API через Vue i18n</li>
      </ul>
    </div>
  </section>
</template>
