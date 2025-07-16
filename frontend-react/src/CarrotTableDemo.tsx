import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState
} from '@tanstack/react-table'
import { useDebounce } from 'use-debounce'
import { cn } from './lib/utils'
import { useEffect, useState, useMemo } from 'react'

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

function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' | 'default' }
) {
  const { className, variant = 'default', ...rest } = props
  const variants: Record<'outline' | 'default', string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  }
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2',
        variants[variant],
        className
      )}
    />
  )
}

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
const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy'] as const

function randomDate() {
  const d = new Date(Date.now() - Math.floor(Math.random() * 10000000000))
  return d.toISOString().slice(0, 10)
}

function generateData(count = 10000): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 500),
    stock: Math.floor(Math.random() * 200),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }))
}

export default function CarrotTableDemo({ className = '' }: { className?: string }) {
  const [data] = useState(() => generateData())
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)
  const [statusFilter, setStatusFilter] = useState('')

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'price', header: 'Price' },
      { accessorKey: 'stock', header: 'Stock' },
      { accessorKey: 'createdAt', header: 'Created' },
      { accessorKey: 'updatedAt', header: 'Updated' },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'actions', header: 'Actions' }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter: debouncedSearch
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })



  useEffect(() => {
    const statusColumn = table.getColumn('status')
    if (statusColumn) {
      statusColumn.setFilterValue(statusFilter === 'all' ? undefined : statusFilter)
    }
  }, [statusFilter, table])


  return (
    <div className={cn('space-y-4 p-6', className)}>
      <div className="flex flex-wrap gap-4">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search item..."
          className="w-full sm:w-1/3"
        />
        <Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/3"
        >
          <option value="all">All statuses</option>
          <option value="active">In stock</option>
          <option value="archived">None</option>
          <option value="draft">Low</option>
        </Select>
      </div>

      <div className="overflow-auto max-h-[700px] rounded-md border">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="sticky top-0 bg-background z-10">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap select-none cursor-pointer"
                    onClick={() => header.column.getCanSort() && header.column.toggleSorting()}
                  >
                    {!header.isPlaceholder && (
                      <span>
                        {header.column.columnDef.header as string}
                        {header.column.getIsSorted() === 'asc' && '▲'}
                        {header.column.getIsSorted() === 'desc' && '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-muted transition-all">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="whitespace-nowrap">
                    {cell.column.id === 'status' ? (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-sm',
                          cell.getValue() === 'active' && 'bg-green-100 text-green-700',
                          cell.getValue() === 'archived' && 'bg-red-100 text-red-700',
                          cell.getValue() === 'draft' && 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {cell.getValue() === 'active'
                          ? 'In stock'
                          : cell.getValue() === 'archived'
                          ? 'None'
                          : 'Low'}
                      </span>
                    ) : cell.column.id === 'actions' ? (
                      <Button variant="default" className="h-7 px-2 text-xs">
                        Edit
                      </Button>
                    ) : (
                      String(cell.getValue() as string)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

