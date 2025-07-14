<script setup lang="ts">
</script>

<template>
  <section class="prose max-w-3xl mx-auto py-12">
    <h1 class="text-center text-3xl font-bold mb-6">🔧 Опис бекенд-стеку Морква 2.0</h1>

    <h2 class="text-xl font-semibold mt-10">🧠 Архітектура</h2>
    <ul class="list-disc pl-6">
      <li>Фреймворк: Кастомний форк Laravel (jomko/laravel)</li>
      <li>Призначення: API-only backend (жодного Blade, SSR чи Inertia)</li>
      <li>Структура: Monorepo (backend/ + frontend/)</li>
      <li>PWA frontend повністю окремо на Vue 3</li>
      <li>API-first: Весь UI працює через REST API</li>
    </ul>

    <h2 class="text-xl font-semibold mt-10">🗃 База даних</h2>
    <ul class="list-disc pl-6">
      <li>PostgreSQL (UUID primary keys, оптимізована під складну SKU-логіку)</li>
      <li>Redis — для черг, кешування, Horizon</li>
    </ul>

    <h2 class="text-xl font-semibold mt-10">🚦 Черги та задачі</h2>
    <ul class="list-disc pl-6">
      <li>Laravel Queue Worker (черги обробляють синхронізацію з каналами, імпорти/експорти)</li>
      <li>Horizon для моніторингу</li>
      <li>Scheduler (cron jobs для регулярних задач)</li>
    </ul>

    <h2 class="text-xl font-semibold mt-10">⚙️ Ключові модулі</h2>
    <ul class="list-disc pl-6">
      <li>SKU Engine — окрема SKU-логіка (дедуплікація, псевдоніми, зіставлення)</li>
      <li>Inventory — залишки, рух, складські локації</li>
      <li>Orders — замовлення, статуси, етапи виконання</li>
      <li>Pricing Engine — wholesale/retail/marketplace ціни</li>
      <li>Channels — Etsy / Woo / Faire / eBay / Walmart</li>
      <li>Label Creator — PDF-генерація етикеток</li>
      <li>SKU Microservice — зовнішній Python FastAPI-сервіс</li>
    </ul>

    <h2 class="text-xl font-semibold mt-10">🔐 Безпека</h2>
    <ul class="list-disc pl-6">
      <li>Laravel Sanctum (token-based auth)</li>
      <li>Role-based Access (admin / staff / etc.)</li>
      <li>Власні middleware-фільтри</li>
      <li>Rate Limiting + аудит подій</li>
    </ul>

    <h2 class="text-xl font-semibold mt-10">🚀 Інфраструктура</h2>
    <ul class="list-disc pl-6">
      <li>Локальний дев: DDEV (nginx + php + postgres + redis у контейнерах)</li>
      <li>Середовище: .env для кожного інстансу (staging, prod, dev)</li>
    </ul>
  </section>
</template>
