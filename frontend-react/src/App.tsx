import DemoPage from './DemoPage'
import Sidebar from './Sidebar'

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <DemoPage />
      </div>
    </div>
  )
}
