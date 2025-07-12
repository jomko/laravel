<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Icon } from "@iconify/vue"
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'
import { Toaster, toast } from '@/components/ui/sonner'
import { useVueTable, getCoreRowModel, type ColumnDef } from '@tanstack/vue-table'
import { z } from 'zod'
import 'vue-sonner/style.css'

interface Person {
  id: number
  name: string
  status: string
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Ім\'я' },
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
</script>

<template>
  <div class="dark p-8 space-y-8">
    <h1 class="text-3xl font-bold text-center">Морква 2.0 — Презентація інтерфейсу</h1>
    <p class="text-center text-muted-foreground">Що ми тут можемо, крім горішків?</p>

    <!-- Forms -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Форми: легше не буває</h2>
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
    <section class="space-y-2">
      <h2 class="text-xl font-semibold">Кнопки для натискання</h2>
      <div class="flex gap-2">
        <Button>Default</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </section>

    <!-- Alert & Toast -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Алерти та тости</h2>
      <Alert>
        <Icon icon="radix-icons:info-circled" class="h-4 w-4" />
        <div>
          <AlertTitle>Ну і що тепер?</AlertTitle>
          <AlertDescription>Невеличкий приклад алерту.</AlertDescription>
        </div>
      </Alert>
      <Button @click="toast('Ви щойно натиснули. І що?')">Викликати toast</Button>
    </section>

    <!-- Dialog -->
    <section class="space-y-2">
      <h2 class="text-xl font-semibold">Модалка з гумором</h2>
      <Dialog>
        <template #trigger>
          <Button>Відкрити модалку</Button>
        </template>
        <template #title>Привіт!</template>
        <template #description>Ти відкрив модалку. Молодець!</template>
      </Dialog>
    </section>

    <!-- Table -->
    <section class="space-y-2">
      <h2 class="text-xl font-semibold">Табличка скромних розмірів</h2>
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <span v-if="!header.isPlaceholder">
                {{ header.column.columnDef.header }}
              </span>
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

    <!-- Form with Validation -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Форма з валідацією</h2>
      <Input v-model="form.name" placeholder="Ім'я" />
      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name[0] }}</p>
      <Input v-model="form.email" placeholder="Пошта" />
      <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</p>
      <Button @click="submit">Надіслати</Button>
    </section>

    <Toaster />
  </div>
</template>
