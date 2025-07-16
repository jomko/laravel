import { useState } from 'react'
import { z } from 'zod'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { Toaster, toast } from 'sonner'
import { cn } from './lib/utils'

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.className)} />
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.className)} />
}

function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" {...props} className={cn('h-4 w-4 rounded border border-input', className)} />
}

function Button({ className, variant = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'destructive' | 'ghost' }) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  }
  return <button {...props} className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2', variants[variant], className)} />
}

function Alert({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="mb-1 font-medium leading-none">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

export default function DemoPage() {
  const [form, setForm] = useState({ name: '', agree: false, status: '' })
  const [open, setOpen] = useState(false)

  const schema = z.object({ name: z.string().min(1, 'Enter a name') })

  function submit() {
    const result = schema.safeParse({ name: form.name })
    if (!result.success) {
      toast.error(result.error.issues[0].message)
      return
    }
    toast.success('Form submitted!')
  }

  return (
    <div className="min-h-screen bg-background p-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary text-center">Morkovka React Demo</h1>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-muted p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-primary">Form</h2>
          <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="">Select...</option>
            <option value="one">Option 1</option>
            <option value="two">Option 2</option>
          </Select>
          <label className="flex items-center space-x-2">
            <Checkbox checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} />
            <span>I agree</span>
          </label>
          <Button onClick={submit}>Submit</Button>
        </div>

        <div className="space-y-4 bg-muted p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-primary">Alert & Dialog</h2>
          <Alert title="Heads up!">This is an alert component</Alert>
          <Button onClick={() => toast('Just a toast')}>Show toast</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent className="bg-background p-6 rounded-lg border border-border">
              <DialogTitle className="text-lg font-medium">Hello!</DialogTitle>
              <DialogDescription>This is a simple dialog.</DialogDescription>
              <Button className="mt-4" onClick={() => setOpen(false)}>Close</Button>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4 bg-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary">Table</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">ID</th>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Bohdan', status: 'Active' },
              { id: 2, name: 'Yura', status: 'Drinking beer' },
              { id: 3, name: 'Anton', status: 'At the beach' },
              { id: 4, name: 'She', status: 'Working' },
            ].map(row => (
              <tr key={row.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{row.id}</td>
                <td className="py-2">{row.name}</td>
                <td className="py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Toaster position="top-right" />
    </div>
  )
}
