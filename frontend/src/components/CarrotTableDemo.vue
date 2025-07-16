<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Select, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import { useDebounceFn } from '@vueuse/core'

interface Item {
  id: number
  name: string
  category: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived' | 'draft'
}

const statuses = ['active', 'archived', 'draft'] as const
const categories = ['Овочі', 'Фрукти', 'Крупи', 'Молочне'] as const

function randomDate() {
  const d = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
  return d.toISOString().slice(0, 10)
}

function generateData(count = 10000): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Товар ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 500),
    stock: Math.floor(Math.random() * 200),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

const data = ref<Item[]>(generateData())

const columns: ColumnDef<Item>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Назва' },
  { accessorKey: 'category', header: 'Категорія' },
  { accessorKey: 'price', header: 'Ціна' },
  { accessorKey: 'stock', header: 'Залишок' },
  { accessorKey: 'createdAt', header: 'Створено' },
  { accessorKey: 'updatedAt', header: 'Оновлено' },
  { accessorKey: 'status', header: 'Статус' },
  { accessorKey: 'actions', header: 'Дії' },
]

const sorting = ref<SortingState>([])
const pagination = ref({ pageIndex: 0, pageSize: 20 })

const table = useVueTable({
  data,
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
    get pagination() {
      return pagination.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onPaginationChange: (updater) => {
    pagination.value = typeof updater === 'function' ? updater(pagination.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const search = ref('')
const debouncedSearch = ref('')
const updateSearch = useDebounceFn((val: string) => {
  debouncedSearch.value = val
}, 300)
watch(search, (val) => updateSearch(val))
watch(debouncedSearch, (val) => table.setGlobalFilter(val))

const statusFilter = ref('')
watch(statusFilter, (val) =>
  table.getColumn('status')?.setFilterValue(val === 'all' ? undefined : val)
)
</script>

<template>
  <div class="space-y-4 p-6">
    <div class="flex flex-wrap gap-4">
      <Input v-model="search" placeholder="Пошук товару..." class="w-full sm:w-1/3" />
      <Select v-model="statusFilter" class="w-full sm:w-1/3">
        <SelectItem value="all">Всі статуси</SelectItem>
        <SelectItem value="active">В наявності</SelectItem>
        <SelectItem value="archived">Немає</SelectItem>
        <SelectItem value="draft">Мало</SelectItem>
      </Select>
    </div>

    <div class="overflow-auto max-h-[700px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="sticky top-0 bg-background z-10"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="whitespace-nowrap select-none cursor-pointer"
              @click="header.column.getCanSort() && header.column.toggleSorting()"
            >
              <span v-if="!header.isPlaceholder">
                {{ header.column.columnDef.header }}
                <span v-if="header.column.getIsSorted() === 'asc'">▲</span>
                <span v-if="header.column.getIsSorted() === 'desc'">▼</span>
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="hover:bg-muted transition-all"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="whitespace-nowrap"
            >
              <!-- Статус -->
              <template v-if="cell.column.id === 'status'">
                <span
                  :class="{
                    'bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm': cell.getValue() === 'active',
                    'bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm': cell.getValue() === 'archived',
                    'bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm': cell.getValue() === 'draft',
                  }"
                >
                  {{
                    cell.getValue() === 'active'
                      ? 'В наявності'
                      : cell.getValue() === 'archived'
                      ? 'Немає'
                      : 'Мало'
                  }}
                </span>
              </template>

              <!-- Дії -->
              <template v-else-if="cell.column.id === 'actions'">
                <Button size="sm" variant="default">Редагувати</Button>
              </template>

              <!-- Інше -->
              <template v-else>
                {{ cell.getValue() }}
              </template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-between pt-2">
      <Button
        variant="outline"
        size="sm"
        @click="table.previousPage()"
        :disabled="!table.getCanPreviousPage()"
      >
        Назад
      </Button>
      <span class="text-sm text-muted-foreground">
        {{ table.getState().pagination.pageIndex + 1 }} / {{ table.getPageCount() }}
      </span>
      <Button
        variant="outline"
        size="sm"
        @click="table.nextPage()"
        :disabled="!table.getCanNextPage()"
      >
        Вперед
      </Button>
    </div>
  </div>
</template>
