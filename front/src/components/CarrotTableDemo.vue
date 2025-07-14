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
import { useClipboard, useDebounceFn } from '@vueuse/core'

interface Item {
  id: number
  name: string
  price: number
  stock: number
  status: 'active' | 'archived' | 'draft'
}

function generateData(count = 1000): Item[] {
  const statuses = ['active', 'archived', 'draft'] as const
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) / 10,
    stock: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

const data = ref<Item[]>(generateData())

const columns: ColumnDef<Item>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'stock', header: 'Stock' },
  { accessorKey: 'status', header: 'Status' },
]

const sorting = ref<SortingState>([])
const pagination = ref({ pageIndex: 0, pageSize: 10 })

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
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === 'function' ? updater(pagination.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const search = ref('')
const debouncedSearch = ref('')
const statusFilter = ref('')
const updateSearch = useDebounceFn((val: string) => {
  debouncedSearch.value = val
}, 300)
watch(search, (val) => updateSearch(val))
watch(debouncedSearch, (val) => table.setGlobalFilter(val))
watch(statusFilter, (val) =>
  table.getColumn('status')?.setFilterValue(val || undefined)
)

const editingId = ref<number | null>(null)
const editingField = ref<string | null>(null)

const { copy } = useClipboard()
function copyCell(value: unknown) {
  copy(String(value))
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex gap-2">
      <Input v-model="search" placeholder="Search..." class="max-w-sm" />
      <Select v-model="statusFilter">
        <SelectItem :value="'active'">active</SelectItem>
        <SelectItem :value="'archived'">archived</SelectItem>
        <SelectItem :value="'draft'">draft</SelectItem>
      </Select>
    </div>

    <div class="max-h-[600px] overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="sticky top-0 bg-background"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              @click="header.column.getCanSort() && header.column.toggleSorting()"
              class="cursor-pointer select-none"
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
            class="group hover:bg-muted hover:scale-[1.01] transition-all"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              @click="copyCell(cell.getValue())"
              class="cursor-pointer group-hover:text-primary"
            >
              <template
                v-if="
                  editingId === row.original.id &&
                  editingField === cell.column.id &&
                  ['name', 'price', 'stock'].includes(cell.column.id)
                "
              >
                <Input
                  :type="cell.column.id === 'name' ? 'text' : 'number'"
                  v-model="(row.original as any)[cell.column.id]"
                  @blur="
                    editingId = null;
                    editingField = null;
                  "
                />
              </template>
              <template v-else>
                <span
                  @dblclick="
                    ['name', 'price', 'stock'].includes(cell.column.id)
                      ? (editingId = row.original.id, editingField = cell.column.id)
                      : null
                  "
                >
                  {{ cell.getValue() }}
                </span>
              </template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-between">
      <Button
        variant="outline"
        size="xs"
        @click="table.previousPage()"
        :disabled="!table.getCanPreviousPage()"
      >
        Prev
      </Button>
      <span>
        {{ table.getState().pagination.pageIndex + 1 }} / {{ table.getPageCount() }}
      </span>
      <Button
        variant="outline"
        size="xs"
        @click="table.nextPage()"
        :disabled="!table.getCanNextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
