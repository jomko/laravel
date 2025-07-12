<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import { Toaster, toast } from '@/components/ui/sonner'
import { useVueTable, getCoreRowModel, type ColumnDef } from '@tanstack/vue-table'
import { z } from 'zod'
import 'vue-sonner/style.css'
import { useColorMode } from '@vueuse/core'
import Chart from 'chart.js/auto'
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  SwitchRoot,
  SwitchThumb,
  ProgressRoot,
  ProgressIndicator,
} from 'radix-vue'


interface Person {
  id: number
  name: string
  status: string
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: "Ім'я" },
  { accessorKey: 'status', header: 'Статус' },
]

const tableData = ref<Person[]>([
  { id: 1, name: 'Борис', status: 'Активний' },
  { id: 2, name: 'Ганна', status: 'Спить' },
  { id: 3, name: 'Микита', status: 'На морі' },
])

const table = useVueTable({
  data: tableData,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

const form = ref({ name: '', email: '', agree: false, status: '' })
const errors = ref<{ name?: string[]; email?: string[] }>({})

const schema = z.object({
  name: z.string().min(1, "Вкажіть ім'я"),
  email: z.string().email('Невірна пошта'),
})

function submit() {
  const result = schema.safeParse(form.value)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors
    toast('Форма має помилки, ай-яй-яй!')
    return
  }
  errors.value = {}
  toast('Форма відправлена! Але це ще нічого не означає.')
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  mobileNavOpen.value = false
}

const mobileNavOpen = ref(false)

const mode = useColorMode({ attribute: 'class', selector: 'html', initialValue: 'dark' })
function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

const chartRef = ref<HTMLCanvasElement | null>(null)
const sliderValue = ref([50])
const switchOn = ref(false)
const progress = ref(30)
const selectedDate = ref('')
const search = ref('')
const currentPage = ref(1)
const pageSize = 2

const filteredData = computed(() =>
  tableData.value.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredData.value.length / pageSize))
)
const paginatedData = computed(() =>
  filteredData.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
)
const paginatedTable = useVueTable({
  data: paginatedData,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Продажі',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgb(96,165,250)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
  }
})
</script>

<template>
  <div :class="mode">
    <div class="min-h-screen bg-background p-8">
      <!-- theme toggle -->
      <Button
        class="absolute right-0 top-4 md:top-8"
        size="icon"
        variant="outline"
        @click="toggleMode"
      >
        <Icon
          icon="radix-icons:moon"
          class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <!-- desktop nav -->
      <div class="md:bottom-4 md:top-20 md:block">
        <nav class="space-y-2">
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('forms')">Форми</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('buttons')">Кнопки</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('alerts')">Попередження</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('modal')">Модалка</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('table')">Таблиця</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('validation')">Валідація</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('charts')">Графіки</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('pagination-table')">Пагінація</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('slider')">Слайдер</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('tabs')">Таби</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('search')">Пошук</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('accordion')">Акордеон</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('switch')">Перемикач</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('loader')">Лоадер</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('progress')">Прогрес</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('date')">Дата</Button>
          <Button variant="ghost" class="w-40 justify-start" @click="scrollToSection('breadcrumbs')">Хлібні крихти</Button>
        </nav>
      </div>

      <!-- Main content (grid layout) -->
      <main class="space-y-8 md:mt-24">
        <!-- Заголовок -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-primary">Морква 2.0 — Презентація інтерфейсу</h1>
          <p class="text-center text-muted-foreground">Що ми тут можемо, крім горішків?</p>
        </div>

        <!-- Grid for the content -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- Forms -->
          <section id="forms" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Форми: легше не буває</h2>
            <Input placeholder="Просто input" />
            <Textarea placeholder="А тут можна розписатися" />
            <Select v-model="form.status">
              <SelectItem value="one">Опція 1</SelectItem>
              <SelectItem value="two">Опція 2</SelectItem>
            </Select>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="form.agree" />
              <span>Погоджуюсь з тим, що це жарт</span>
            </div>
          </section>

          <!-- Buttons -->
          <section id="buttons" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Кнопки для натискання (або не треба?)</h2>
            <div class="flex gap-2">
              <Button>Default</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </section>

          <!-- Alerts & Toast -->
          <section id="alerts" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Тости, модалки й інші принади</h2>
            <Alert>
              <Icon icon="radix-icons:info-circled" class="h-4 w-4" />
              <div>
                <AlertTitle>Ну і що тепер?</AlertTitle>
                <AlertDescription>Невеличкий приклад алерту.</AlertDescription>
              </div>
            </Alert>
            <Button @click="toast('Ви щойно натиснули. І що?')">Викликати toast</Button>
          </section>

          <!-- Modal -->
          <section id="modal" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Модалка без зайвого пафосу</h2>
            <Dialog>
              <template #trigger>
                <Button>Відкрити модалку</Button>
              </template>
              <template #title>Привіт!</template>
              <template #description>Ти відкрив модалку. Молодець!</template>
            </Dialog>
          </section>

          <!-- Table -->
          <section id="table" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Табличка скромних розмірів</h2>
            <Table>
              <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                  <TableHead v-for="header in headerGroup.headers" :key="header.id">
                    <span v-if="!header.isPlaceholder">{{ header.column.columnDef.header }}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    {{ cell.getValue() }}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableCaption>Суто фейкові дані</TableCaption>
            </Table>
          </section>

          <!-- Validation -->
          <section id="validation" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Форма з валідацією (не плач, вона лагідна)</h2>
            <Input v-model="form.name" placeholder="Ім'я" />
            <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name[0] }}</p>
            <Input v-model="form.email" placeholder="Пошта" />
            <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</p>
            <Button @click="submit">Надіслати</Button>
          </section>

          <!-- Charts -->
          <section id="charts" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Графіки</h2>
            <div class="h-48">
              <canvas ref="chartRef" class="h-full w-full"></canvas>
            </div>
          </section>

          <!-- Paginated Table -->
          <section id="pagination-table" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Таблиця з пагінацією</h2>
            <Input v-model="search" placeholder="Пошук..." />
            <Table>
              <TableHeader>
                <TableRow v-for="headerGroup in paginatedTable.getHeaderGroups()" :key="headerGroup.id">
                  <TableHead v-for="header in headerGroup.headers" :key="header.id">
                    <span v-if="!header.isPlaceholder">{{ header.column.columnDef.header }}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in paginatedTable.getRowModel().rows" :key="row.id">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    {{ cell.getValue() }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="flex items-center justify-between">
              <Button variant="outline" size="xs" @click="prevPage" :disabled="currentPage===1">Назад</Button>
              <span>{{ currentPage }} / {{ totalPages }}</span>
              <Button variant="outline" size="xs" @click="nextPage" :disabled="currentPage===totalPages">Вперед</Button>
            </div>
          </section>

          <!-- Slider -->
          <section id="slider" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Слайдер</h2>
            <SliderRoot v-model="sliderValue" class="relative flex w-full touch-none select-none items-center">
              <SliderTrack class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderRange class="absolute h-full bg-primary" />
              </SliderTrack>
              <SliderThumb class="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow" />
            </SliderRoot>
            <div>Значення: {{ sliderValue[0] }}</div>
          </section>

          <!-- Tabs -->
          <section id="tabs" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Таби</h2>
            <TabsRoot default-value="one" class="space-y-4">
              <TabsList class="flex space-x-2">
                <TabsTrigger value="one" class="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Один</TabsTrigger>
                <TabsTrigger value="two" class="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Два</TabsTrigger>
              </TabsList>
              <TabsContent value="one">Перший контент</TabsContent>
              <TabsContent value="two">Другий контент</TabsContent>
            </TabsRoot>
          </section>

          <!-- Search -->
          <section id="search" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Пошук</h2>
            <Input v-model="search" placeholder="Введіть ім'я..." />
            <ul class="list-disc pl-4">
              <li v-for="item in filteredData" :key="item.id">{{ item.name }}</li>
            </ul>
          </section>

          <!-- Accordion -->
          <section id="accordion" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Акордеон</h2>
            <AccordionRoot type="single" collapsible>
              <AccordionItem value="item-1">
                <h3>
                  <AccordionTrigger class="flex w-full items-center justify-between py-2">
                    <span>Пункт 1</span>
                    <Icon icon="radix-icons:chevron-down" />
                  </AccordionTrigger>
                </h3>
                <AccordionContent class="pt-2">Трохи тексту 1.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <h3>
                  <AccordionTrigger class="flex w-full items-center justify-between py-2">
                    <span>Пункт 2</span>
                    <Icon icon="radix-icons:chevron-down" />
                  </AccordionTrigger>
                </h3>
                <AccordionContent class="pt-2">Ще трохи тексту 2.</AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </section>

          <!-- Switch -->
          <section id="switch" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Перемикач</h2>
            <SwitchRoot v-model:checked="switchOn" class="relative inline-flex h-6 w-11 items-center rounded-full border border-input data-[state=checked]:bg-primary">
              <SwitchThumb class="inline-block h-4 w-4 translate-x-1 rounded-full bg-background shadow transition data-[state=checked]:translate-x-6" />
            </SwitchRoot>
            <p>Стан: {{ switchOn ? 'On' : 'Off' }}</p>
          </section>

          <!-- Loader -->
          <section id="loader" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Завантаження</h2>
            <div class="flex justify-center">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </section>

          <!-- Progress -->
          <section id="progress" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Прогрес</h2>
            <ProgressRoot :model-value="progress" :max="100" class="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
              <ProgressIndicator class="h-full w-full flex-1 bg-primary transition-all" />
            </ProgressRoot>
            <Button size="xs" @click="progress = Math.min(100, progress + 10)">Додати 10%</Button>
          </section>

          <!-- Date -->
          <section id="date" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Дата</h2>
            <Input type="date" v-model="selectedDate" />
            <p>Обрана дата: {{ selectedDate }}</p>
          </section>

          <!-- Breadcrumbs -->
          <section id="breadcrumbs" class="rounded-xl bg-muted p-6 shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-primary">Хлібні крихти</h2>
            <nav class="text-sm text-muted-foreground">
              <ol class="flex flex-wrap items-center gap-1">
                <li><a href="#" class="text-primary hover:underline">Головна</a><span class="mx-1">/</span></li>
                <li><a href="#" class="text-primary hover:underline">Розділ</a><span class="mx-1">/</span></li>
                <li>Поточна сторінка</li>
              </ol>
            </nav>
          </section>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  </div>
</template>
