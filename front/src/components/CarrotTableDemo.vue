<template>
  <div class="space-y-4">
    <!-- Filters -->
    <div class="grid grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Пошук</label>
        <Input v-model="search" placeholder="Пошук товару..." />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Категорія</label>
        <Select v-model="categoryFilter" :modelValue="categoryFilter" @update:modelValue="categoryFilter = $event">
          <SelectItem value="">Всі</SelectItem>
          <SelectItem value="Овочі">Овочі</SelectItem>
          <SelectItem value="Фрукти">Фрукти</SelectItem>
          <SelectItem value="Крупи">Крупи</SelectItem>
          <SelectItem value="Молочне">Молочне</SelectItem>
        </Select>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Створено з</label>
        <input type="date" v-model="createdFrom" class="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">по</label>
        <input type="date" v-model="createdTo" class="w-full border rounded px-2 py-1" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="bg-muted">
            <TableHead v-for="header in headerGroup.headers" :key="header.id" class="px-2 py-2 cursor-pointer select-none" @click="header.column.getCanSort() && header.column.toggleSorting()">
              <span v-if="!header.isPlaceholder">
                {{ header.column.columnDef.header }}
                <span v-if="header.column.getIsSorted() === 'asc'">▲</span>
                <span v-if="header.column.getIsSorted() === 'desc'">▼</span>
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-gray-50">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-2 py-1">
              <template v-if="cell.column.id === 'status'">
                <span :class="getStatusColor(cell.getValue())" class="px-2 py-0.5 rounded text-xs font-medium">
                  {{ getStatusLabel(cell.getValue()) }}
                </span>
              </template>
              <template v-else-if="cell.column.id === 'actions'">
                <Button size="xs" class="bg-blue-500 hover:bg-blue-600 text-white">Редагувати</Button>
              </template>
              <template v-else>
                {{ cell.getValue() }}
              </template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-sm">Показати:</span>
        <Select v-model="pagination.pageSize" :modelValue="pagination.pageSize" @update:modelValue="pagination.pageSize = $event">
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </Select>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="xs" @click="table.previousPage()" :disabled="!table.getCanPreviousPage()">Prev</Button>
        <span class="text-sm">{{ table.getState().pagination.pageIndex + 1 }} / {{ table.getPageCount() }}</span>
        <Button variant="outline" size="xs" @click="table.nextPage()" :disabled="!table.getCanNextPage()">Next</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Select, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'

interface Item {
  id: number
  name: string
  category: string
  price: number
  stock: number
  created_at: string
  updated_at: string
  status: 'active' | 'low' | 'none' | 'archived'
}

function generateData(count = 10000): Item[] {
  const names = ['Морква', 'Яблуко', 'Картопля', 'Банан', 'Гречка', 'Молоко', 'Сир', 'Апельсин', 'Огірок', 'Рис', 'Сметана', 'Груша', 'Перець', 'Манго', 'Пшоно']
  const categories = ['Овочі', 'Фрукти', 'Крупи', 'Молочне']

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const category = categories[i % categories.length]
    const price = Math.floor(Math.random() * 1000) / 10
    const stock = Math.floor(Math.random() * 200)
    const created_at = new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
    const updated_at = new Date(2023, 6 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
    let status: Item['status'] = 'active'
    if (stock === 0) status = 'none'
    else if (stock < 10) status = 'low'

    return { id: i + 1, name, category, price, stock, created_at, updated_at, status }
  })
}

const rawData = ref<Item[]>(generateData())
const search = ref('')
const categoryFilter = ref('')
const createdFrom = ref('')
const createdTo = ref('')

const filteredData = computed(() => {
  return rawData.value.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = categoryFilter.value ? item.category === categoryFilter.value : true
    const created = new Date(item.created_at)
    const from = createdFrom.value ? new Date(createdFrom.value) : null
    const to = createdTo.value ? new Date(createdTo.value) : null
    const matchesDate = (!from || created >= from) && (!to || created <= to)
    return matchesSearch && matchesCategory && matchesDate
  })
})

const sorting = ref<SortingState>([])
const pagination = ref({ pageIndex: 0, pageSize: '20' })
const columns: ColumnDef<Item>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Назва' },
  { accessorKey: 'category', header: 'Категорія' },
  { accessorKey: 'price', header: 'Ціна' },
  { accessorKey: 'stock', header: 'Залишок' },
  { accessorKey: 'created_at', header: 'Створено' },
  { accessorKey: 'updated_at', header: 'Оновлено' },
  { accessorKey: 'status', header: 'Статус' },
  { id: 'actions', header: 'Дії' },
]

const table = useVueTable({
  data: filteredData,
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

function getStatusLabel(status: string): string {
  return status === 'active' ? 'В наявності' : status === 'low' ? 'Мало' : status === 'none' ? 'Немає' : 'Архів'
}

function getStatusColor(status: string): string {
  return status === 'active'
    ? 'bg-green-100 text-green-800'
    : status === 'low'
    ? 'bg-yellow-100 text-yellow-800'
    : status === 'none'
    ? 'bg-red-100 text-red-800'
    : 'bg-gray-200 text-gray-700'
}
</script>
