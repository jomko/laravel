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
import CarrotTableDemo from '@/components/CarrotTableDemo.vue'
import BackendOverview from '@/components/BackendOverview.vue'
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
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

const tableData = ref<Person[]>([
  { id: 1, name: 'Bohdan', status: 'Active' },
  { id: 2, name: 'Yura', status: 'Drinking beer' },
  { id: 3, name: 'Anton', status: 'At the beach' },
  { id: 4, name: 'She', status: 'Working' },
])

const table = useVueTable({
  data: tableData,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

const form = ref({ name: '', email: '', agree: false, status: '' })
const errors = ref<{ name?: string[]; email?: string[] }>({})

const schema = z.object({
  name: z.string().min(1, 'Enter a name'),
  email: z.string().email('Invalid email'),
})

function submit() {
  const result = schema.safeParse(form.value)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors
    toast('The form has errors!')
    return
  }
  errors.value = {}
  toast('Form submitted! But that does not mean much.')
}

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
            label: 'Sales',
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
          class="h-5 w-5 rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <!-- Main content (grid layout) -->
      <main class="space-y-8 md:mt-10">

        <!-- Заголовок -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-primary">Morkovka 2.0 — Interface Showcase</h1>
          <p class="text-center text-muted-foreground">What can we do here besides nuts?</p>
        </div>

        <!-- Grid for the content -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- Forms -->
          <section id="forms" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Forms: easy as can be</h2>
            <Input placeholder="Just input" />
            <Textarea placeholder="You can type here" />
            <Select v-model="form.status">
              <SelectItem value="one">Option 1</SelectItem>
              <SelectItem value="two">Option 2</SelectItem>
            </Select>
            <div class="group flex items-center space-x-2">
              <Checkbox v-model="form.agree" class="transition-transform group-hover:scale-110" />
              <span>I agree this is a joke</span>
            </div>
          </section>

          <!-- Buttons -->
          <section id="buttons" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Buttons to press (or not?)</h2>
            <div class="flex gap-2">
              <Button>Default</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </section>

          <!-- Alerts & Toast -->
          <section id="alerts" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Toasts, modals and other goodies</h2>
            <Alert>
              <Icon icon="radix-icons:info-circled" class="h-4 w-4" />
              <div>
                <AlertTitle>So what now?</AlertTitle>
                <AlertDescription>A small alert example.</AlertDescription>
              </div>
            </Alert>
            <Button @click="toast('You just clicked. So what?')">Show toast</Button>
          </section>

          <!-- Modal -->
          <section id="modal" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Simple modal</h2>
            <Dialog>
              <template #trigger>
                <Button>Open modal</Button>
              </template>
              <template #title>Hello!</template>
              <template #description>You opened the modal. Well done!</template>
            </Dialog>
          </section>

          <!-- Table -->
          <section id="table" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Small table</h2>
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
              <TableCaption>Fake data only</TableCaption>
            </Table>
          </section>

          <!-- Validation -->
          <section id="validation" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Form with validation (don't cry, it's gentle)</h2>
            <Input v-model="form.name" placeholder="Name" />
            <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name[0] }}</p>
            <Input v-model="form.email" placeholder="Email" />
            <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</p>
            <Button @click="submit">Submit</Button>
          </section>

          <!-- Charts -->
          <section id="charts" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Charts</h2>
            <div class="h-48">
              <canvas ref="chartRef" class="h-full w-full"></canvas>
            </div>
          </section>

          <!-- Paginated Table -->
          <section id="pagination-table" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Table with pagination</h2>
            <Input v-model="search" placeholder="Search..." />
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
              <Button variant="outline" size="xs" @click="prevPage" :disabled="currentPage===1">Previous</Button>
              <span>{{ currentPage }} / {{ totalPages }}</span>
              <Button variant="outline" size="xs" @click="nextPage" :disabled="currentPage===totalPages">Next</Button>
            </div>
          </section>

          <!-- Slider -->
          <section id="slider" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Slider</h2>
            <SliderRoot v-model="sliderValue" class="relative flex w-full touch-none select-none items-center">
              <SliderTrack class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderRange class="absolute h-full bg-primary" />
              </SliderTrack>
              <SliderThumb class="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow" />
            </SliderRoot>
            <div>Value: {{ sliderValue[0] }}</div>
          </section>

          <!-- Tabs -->
          <section id="tabs" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Tabs</h2>
            <TabsRoot default-value="one" class="space-y-4">
              <TabsList class="flex space-x-2">
                <TabsTrigger value="one" class="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">One</TabsTrigger>
                <TabsTrigger value="two" class="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Two</TabsTrigger>
              </TabsList>
              <TabsContent value="one">First content</TabsContent>
              <TabsContent value="two">Second content</TabsContent>
            </TabsRoot>
          </section>

          <!-- Search -->
          <section id="search" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Search</h2>
            <Input v-model="search" placeholder="Enter a name..." />
            <ul class="list-disc pl-4">
              <li v-for="item in filteredData" :key="item.id">{{ item.name }}</li>
            </ul>
          </section>

          <!-- Accordion -->
          <section id="accordion" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Accordion</h2>
            <AccordionRoot type="single" collapsible>
              <AccordionItem value="item-1">
                <h3>
                  <AccordionTrigger class="flex w-full items-center justify-between py-2 transition-transform">
                    <span>Item 1</span>
                    <span class="inline-block transition-transform data-[state=open]:rotate-180">
                      <Icon icon="radix-icons:chevron-down" />
                    </span>
                  </AccordionTrigger>
                </h3>
                <AccordionContent class="pt-2">Some text 1.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <h3>
                  <AccordionTrigger class="flex w-full items-center justify-between py-2 transition-transform">
                    <span>Item 2</span>
                    <span class="inline-block transition-transform data-[state=open]:rotate-180">
                      <Icon icon="radix-icons:chevron-down" />
                    </span>
                  </AccordionTrigger>
                </h3>
                <AccordionContent class="pt-2">Some more text 2.</AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </section>

          <!-- Switch -->

          <section id="switch" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Switch</h2>
            <SwitchRoot v-model:checked="switchOn" class="relative inline-flex h-6 w-11 items-center rounded-full border border-input data-[state=checked]:bg-primary">
              <SwitchThumb class="inline-block h-4 w-4 translate-x-1 rounded-full bg-background shadow transition data-[state=checked]:translate-x-6" />
            </SwitchRoot>
            <p>State: {{ switchOn ? 'On' : 'Off' }}</p>
          </section>

          <!-- Loader -->
          <section id="loader" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Loading</h2>
            <div class="flex justify-center">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </section>

          <!-- Progress -->
          <section id="progress" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Progress</h2>
            <ProgressRoot :model-value="progress" :max="100" class="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
              <ProgressIndicator class="h-full w-full flex-1 bg-primary transition-all" />
            </ProgressRoot>
            <Button size="xs" @click="progress = Math.min(100, progress + 10)">Add 10%</Button>
          </section>

          <!-- Date -->
          <section id="date" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Date</h2>
            <Input type="date" v-model="selectedDate" />
            <p>Selected date: {{ selectedDate }}</p>
          </section>

          <!-- Breadcrumbs -->
          <section id="breadcrumbs" class="rounded-xl bg-muted p-6 shadow-md transition-transform  space-y-4">
            <h2 class="text-xl font-semibold text-primary">Breadcrumbs</h2>
            <nav class="text-sm text-muted-foreground">
              <ol class="flex flex-wrap items-center gap-1">
                <li><a href="#" class="text-primary hover:underline">Home</a><span class="mx-1">/</span></li>
                <li><a href="#" class="text-primary hover:underline">Section</a><span class="mx-1">/</span></li>
                <li>Current page</li>
              </ol>
            </nav>
          </section>
        </div>

        <section class="prose mx-auto py-12">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-primary">Wow, a table!</h1>
            <p class="text-center text-muted-foreground">filters, searches and has 10k rows</p>
          </div>
          <CarrotTableDemo class="mt-6" />
        </section>
        

        <section>
          <div class="text-center under_hood">
            <h1 class="text-3xl font-bold text-primary">Under the Hood</h1>
          </div>

          <section class="prose max-w-3xl mx-auto py-12">

            <p class="mb-6">
              This project is a modern headless SPA admin panel for managing products, prices, warehouses and sales channels.
            </p>

            <h2 class="text-xl font-semibold mt-10">🌱 Foundation</h2>
            <p><a href="https://vuejs.org/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Vue 3</a> + <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">TypeScript</a> with <a href="https://vitejs.dev/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Vite</a> for fast hot reload.</p>

            <h2 class="text-xl font-semibold mt-10">📊 Data</h2>
            <p><a href="https://tanstack.com/query/latest/docs/vue/overview" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">@tanstack/vue-query</a> handles caching and optimistic updates via <code>useQuery()</code> and <code>useMutation()</code>.</p>

            <h2 class="text-xl font-semibold mt-10">📋 Tables</h2>
            <p><a href="https://tanstack.com/table/latest/docs/vue/overview" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">@tanstack/vue-table</a> powers sorting, filtering and pagination with virtualization in <code>CarrotTable.vue</code>.</p>

            <h2 class="text-xl font-semibold mt-10">✅ Forms</h2>
            <p><a href="https://tanstack.com/form/latest/docs/overview" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">@tanstack/form</a> with <a href="https://zod.dev/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Zod</a> for typed validation.</p>

            <h2 class="text-xl font-semibold mt-10">🧠 State</h2>
            <p><a href="https://pinia.vuejs.org/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Pinia</a> manages auth and global UI state. Other state lives in vue-query.</p>

            <h2 class="text-xl font-semibold mt-10">🎨 UI</h2>
            <p><a href="https://ui.shadcn.dev/docs/components/vue" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">shadcn-vue</a> components with <a href="https://tailwindcss.com/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Tailwind CSS</a>.</p>

            <h2 class="text-xl font-semibold mt-10">🧩 Components</h2>
            <p>CarrotKit provides CarrotTable.vue, CarrotForm.vue, CarrotDialog.vue, CarrotToast.vue and CarrotAgent.vue.</p>

            <h2 class="text-xl font-semibold mt-10">⚙️ Other</h2>
            <p>Uses <a href="https://router.vuejs.org/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">Vue Router</a>, <a href="https://vueuse.org/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">VueUse</a> utilities and planned <a href="https://vue-i18n.intlify.dev/" target="_blank" rel="noopener" class="underline text-blue-600 hover:text-blue-800">vue-i18n</a>.</p>

            <h2 class="text-xl font-semibold mt-10">📐 Philosophy</h2>
            <blockquote class="mt-4 italic border-l-4 border-orange-400 pl-4 text-gray-600">
              "Headless first. Type-safe. Composition always. UI = data-driven + atomic."
            </blockquote>

          </section>

        </section>

        <section class="prose mx-auto py-12">  
          <BackendOverview class="mt-6" />
        </section>

      </main>

      <Toaster position="top-right" />
    </div>
  </div>
</template>
