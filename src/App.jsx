import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import RequestForm from './components/RequestForm'

function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen p-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">النظام الموحد لإدارة الأنشطة والخدمات والتطوع</h1>
            <p className="text-blue-200 mt-1">منصة داخلية موحدة تدعم الفروع وتقدم لوحات مؤشرات وتقارير لحوكمة أعلى</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <Dashboard key={refresh} />
          </section>
          <aside className="lg:col-span-1 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">تسجيل طلب برنامج جديد</h3>
            <RequestForm onCreated={()=>setRefresh(v=>v+1)} />
            <p className="text-slate-400 text-xs mt-3">سيتم إرسال الطلب للمراجعة وفق الصلاحيات والإجراءات المعتمدة.</p>
          </aside>
        </main>

        <footer className="mt-10 text-center text-slate-400 text-xs">
          © النظام الموحد - النسخة التجريبية
        </footer>
      </div>
    </div>
  )
}

export default App
