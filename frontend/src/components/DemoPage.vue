<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectItem } from '@/components/ui/select'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'

const dark = ref(false)
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}

const form = ref({ name: '', status: '' })
const rows = ref([
  { id: 1, name: 'Item one', status: 'Active' },
  { id: 2, name: 'Item two', status: 'Inactive' },
])
</script>

<template>
  <div class="space-y-8 p-8 bg-background text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Demo Page</h1>
      <Button @click="toggleTheme">Toggle Theme</Button>
    </header>

    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>This is a demo alert.</AlertDescription>
    </Alert>

    <form class="space-y-4" @submit.prevent>
      <div class="grid gap-2">
        <label class="text-sm font-medium" for="name">Name</label>
        <Input id="name" v-model="form.name" placeholder="Your name" />
      </div>
      <div class="grid gap-2">
        <label class="text-sm font-medium" for="status">Status</label>
        <Select v-model="form.status">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </Select>
      </div>
      <Button type="submit">Submit</Button>
    </form>

    <div>
      <Dialog>
        <template #trigger>
          <Button>Open Dialog</Button>
        </template>
        <template #title>Example Dialog</template>
        <template #description>Simple dialog with shadcn-vue.</template>
        <p class="py-2">Here goes the dialog content.</p>
      </Dialog>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in rows" :key="row.id">
          <TableCell>{{ row.id }}</TableCell>
          <TableCell>{{ row.name }}</TableCell>
          <TableCell>{{ row.status }}</TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>Demo data</TableCaption>
    </Table>
  </div>
</template>

