<script setup lang="ts">
import { ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

interface Item {
  id: number
  name: string
  price: number
}

const data = ref<Item[]>([
  { id: 1, name: 'Морква', price: 10 },
  { id: 2, name: 'Буряк', price: 15 },
  { id: 3, name: 'Капуста', price: 8 },
])

const columns: ColumnDef<Item>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Назва' },
  { accessorKey: 'price', header: 'Ціна' },
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  data,
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
          @click="header.column.getCanSort() && header.column.toggleSorting()"
          class="cursor-pointer select-none"
        >
          <template v-if="!header.isPlaceholder">
            {{ header.column.columnDef.header }}
            <span v-if="header.column.getIsSorted() === 'asc'">▲</span>
            <span v-if="header.column.getIsSorted() === 'desc'">▼</span>
          </template>
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
  </Table>
</template>
