import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@radix-ui/react-dialog'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@radix-ui/react-tabs'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@radix-ui/react-accordion'
import { Slider, SliderTrack, SliderRange, SliderThumb } from '@radix-ui/react-slider'
import { Switch } from '@radix-ui/react-switch'
import { Progress } from '@radix-ui/react-progress'
import { Toaster, toast } from 'sonner'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import Chart from 'chart.js/auto'
import { Icon } from '@iconify/react'
import { cn } from './lib/utils'
import CarrotTableDemo from './CarrotTableDemo'
import BackendOverview from './BackendOverview'
import { z } from 'zod'

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.className
      )}
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.className
      )}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.className
      )}
    />
  )
}

function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" {...props} className={cn('h-4 w-4 rounded border border-input', className)} />
}

function Button(
  {
    className,
    variant = 'default',
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'destructive' | 'ghost'
  }
) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  }
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2',
        variants[variant],
        className
      )}
    />
  )
}

function Alert({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="mb-1 font-medium leading-none">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

interface Person {
  id: number
  name: string
  status: string
}

export default function DemoPage() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const [form, setForm] = useState({ name: '', email: '', agree: false, status: '' })
  const [errors, setErrors] = useState<{ name?: string[]; email?: string[] }>({})
  const [open, setOpen] = useState(false)
  const [tableData] = useState<Person[]>([
    { id: 1, name: 'Bohdan', status: 'Active' },
    { id: 2, name: 'Yura', status: 'Drinking beer' },
    { id: 3, name: 'Anton', status: 'At the beach' },
    { id: 4, name: 'She', status: 'Working' }
  ])

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'status', header: 'Status' }
    ],
    []
  )

  const table = useReactTable({ data: tableData, columns, getCoreRowModel: getCoreRowModel() })

  const schema = z.object({ name: z.string().min(1, 'Enter a name'), email: z.string().email('Invalid email') })

  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const [sliderValue, setSliderValue] = useState([50])
  const [switchOn, setSwitchOn] = useState(false)
  const [progress, setProgress] = useState(30)
  const [selectedDate, setSelectedDate] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2

  const filteredData = useMemo(
    () => tableData.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search, tableData]
  )
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = useMemo(
    () => filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredData, currentPage]
  )

  const paginatedTable = useReactTable({ data: paginatedData, columns, getCoreRowModel: getCoreRowModel() })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  useEffect(() => {
    if (chartRef.current) {
      // Знищити попередній графік, якщо існує
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      // Створити новий
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            {
              label: 'Sales',
              data: [12, 19, 3, 5],
              backgroundColor: 'rgb(96,165,250)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }

    // Знищити графік при unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [])

  function toggleMode() {
    setMode(m => (m === 'dark' ? 'light' : 'dark'))
  }

  function submit() {
    const result = schema.safeParse({ name: form.name, email: form.email })
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      toast('The form has errors!')
      return
    }
    setErrors({})
    toast('Form submitted! But that does not mean much.')
  }

  function nextPage() {
    setCurrentPage(p => (p < totalPages ? p + 1 : p))
  }
  function prevPage() {
    setCurrentPage(p => (p > 1 ? p - 1 : p))
  }

  return (
    <div className={mode}>
      <div className="min-h-screen bg-background p-8">
        <Button
          className="absolute right-0 top-4 md:top-8"
          variant="outline"
          onClick={toggleMode}
        >
          <Icon
            icon="radix-icons:moon"
            className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0"
          />
          <Icon
            icon="radix-icons:sun"
            className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <main className="space-y-8 md:mt-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Morkovka 2.0 — Same shit on React</h1>
            <p className="text-center text-muted-foreground">What can we do here besides nuts?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <section id="forms" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Forms: easy as can be</h2>
              <Input placeholder="Just input" />
              <Textarea placeholder="You can type here" />
              <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="one">Option 1</option>
                <option value="two">Option 2</option>
              </Select>
              <div className="group flex items-center space-x-2">
                <Checkbox
                  checked={form.agree}
                  onChange={e => setForm({ ...form, agree: e.target.checked })}
                  className="transition-transform group-hover:scale-110"
                />
                <span>I agree this is a joke</span>
              </div>
            </section>

            <section id="buttons" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Buttons to press (or not?)</h2>
              <div className="flex gap-2">
                <Button>Default</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </section>

            <section id="alerts" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Toasts, modals and other goodies</h2>
              <Alert title="So what now?">A small alert example.</Alert>
              <Button onClick={() => toast('You just clicked. So what?')}>Show toast</Button>
            </section>

            <section id="modal" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Simple modal</h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Open modal</Button>
                </DialogTrigger>
                <DialogContent className="bg-background p-6 rounded-lg border border-border">
                  <DialogTitle>Hello!</DialogTitle>
                  <DialogDescription>You opened the modal. Well done!</DialogDescription>
                </DialogContent>
              </Dialog>
            </section>

            <section id="table" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Small table</h2>
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                      {hg.headers.map(header => (
                        <th key={header.id}>
                          {!header.isPlaceholder && String(header.column.columnDef.header)}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="py-2">
                          {String(cell.getValue() as string)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <caption className="caption-bottom">Fake data only</caption>
              </table>
            </section>

            <section id="validation" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Form with validation (don't cry, it's gentle)</h2>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
              {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
              <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
              {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
              <Button onClick={submit}>Submit</Button>
            </section>

            <section id="charts" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Charts</h2>
              <div className="h-48">
                <canvas ref={chartRef} className="h-full w-full" />
              </div>
            </section>

            <section id="pagination-table" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Table with pagination</h2>
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
              <table className="w-full text-sm">
                <thead>
                  {paginatedTable.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                      {hg.headers.map(header => (
                        <th key={header.id}>
                          {!header.isPlaceholder && String(header.column.columnDef.header)}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {paginatedTable.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="py-2">
                          {String(cell.getValue() as string)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={prevPage} disabled={currentPage === 1} className="text-xs">
                  Previous
                </Button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages} className="text-xs">
                  Next
                </Button>
              </div>
            </section>

            <section id="slider" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Slider</h2>
              <Slider value={sliderValue} onValueChange={setSliderValue} className="relative flex w-full touch-none select-none items-center">
                <SliderTrack className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                  <SliderRange className="absolute h-full bg-primary" />
                </SliderTrack>
                <SliderThumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow" />
              </Slider>
              <div>Value: {sliderValue[0]}</div>
            </section>

            <section id="tabs" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Tabs</h2>
              <Tabs defaultValue="one" className="space-y-4">
                <TabsList className="flex space-x-2">
                  <TabsTrigger value="one" className="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    One
                  </TabsTrigger>
                  <TabsTrigger value="two" className="px-3 py-1 rounded-md bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Two
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="one">First content</TabsContent>
                <TabsContent value="two">Second content</TabsContent>
              </Tabs>
            </section>

            <section id="search" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Search</h2>
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter a name..." />
              <ul className="list-disc pl-4">
                {filteredData.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </section>

            <section id="accordion" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Accordion</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <h3>
                    <AccordionTrigger className="flex w-full items-center justify-between py-2">
                      <span>Item 1</span>
                      <span className="inline-block transition-transform data-[state=open]:rotate-180">
                        <Icon icon="radix-icons:chevron-down" />
                      </span>
                    </AccordionTrigger>
                  </h3>
                  <AccordionContent className="pt-2">Some text 1.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <h3>
                    <AccordionTrigger className="flex w-full items-center justify-between py-2">
                      <span>Item 2</span>
                      <span className="inline-block transition-transform data-[state=open]:rotate-180">
                        <Icon icon="radix-icons:chevron-down" />
                      </span>
                    </AccordionTrigger>
                  </h3>
                  <AccordionContent className="pt-2">Some more text 2.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section id="switch" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Switch</h2>
              <Switch
                checked={switchOn}
                onCheckedChange={setSwitchOn}
                className="relative inline-flex h-6 w-11 items-center rounded-full border border-input data-[state=checked]:bg-primary"
              >
                <span className="sr-only">Toggle</span>
                <span
                  className={cn(
                    'inline-block h-4 w-4 translate-x-1 rounded-full bg-background shadow transition',
                    switchOn && 'translate-x-6'
                  )}
                />
              </Switch>
              <p>State: {switchOn ? 'On' : 'Off'}</p>
            </section>

            <section id="loader" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Loading</h2>
              <div className="flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            </section>

            <section id="progress" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Progress</h2>
              <Progress value={progress} max={100} className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full w-full flex-1 bg-primary transition-all"
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress>
              <Button onClick={() => setProgress(v => Math.min(100, v + 10))} className="text-xs">
                Add 10%
              </Button>
            </section>

            <section id="date" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Date</h2>
              <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
              <p>Selected date: {selectedDate}</p>
            </section>

            <section id="breadcrumbs" className="rounded-xl bg-muted p-6 shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-primary">Breadcrumbs</h2>
              <nav className="text-sm text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Home
                    </a>
                    <span className="mx-1">/</span>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Section
                    </a>
                    <span className="mx-1">/</span>
                  </li>
                  <li>Current page</li>
                </ol>
              </nav>
            </section>
          </div>

          <section className="prose mx-auto py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary">Wow, a table!</h1>
              <p className="text-center text-muted-foreground">filters, searches and has 10k rows</p>
            </div>
            <CarrotTableDemo className="mt-6" />
          </section>

        </main>

        <Toaster position="top-right" />
      </div>
    </div>
  )
}
