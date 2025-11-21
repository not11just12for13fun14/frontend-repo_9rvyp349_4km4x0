import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="text-slate-300 text-sm">{title}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
      {subtitle && <div className="text-slate-400 text-xs mt-1">{subtitle}</div>}
    </div>
  );
}

function RequestRow({ r }) {
  return (
    <tr className="border-b border-slate-700/60">
      <td className="py-2 px-3">{r.branch_code}</td>
      <td className="py-2 px-3">{r.program_title}</td>
      <td className="py-2 px-3 capitalize">{r.program_type?.replace("_"," ")}</td>
      <td className="py-2 px-3">
        <span className={`px-2 py-1 rounded text-xs ${r.status === 'approved' ? 'bg-green-500/20 text-green-300' : r.status === 'rejected' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{r.status}</span>
      </td>
    </tr>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ branches: 0, requests: 0, events: 0 });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [b, pr, ev] = await Promise.all([
          fetch(`${API_BASE}/branches`).then(r=>r.json()),
          fetch(`${API_BASE}/program-requests`).then(r=>r.json()),
          fetch(`${API_BASE}/events`).then(r=>r.json())
        ]);
        setStats({ branches: b.length, requests: pr.length, events: ev.length });
        setRequests(pr.slice(0, 8));
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-semibold">لوحة التحكم الموحدة</h2>
        <p className="text-slate-300 mt-1 text-sm">نظرة عامة على الأنشطة والطلبات عبر جميع الفروع</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="عدد الفروع" value={stats.branches} />
        <StatCard title="طلبات البرامج" value={stats.requests} />
        <StatCard title="الفعاليات المجدولة" value={stats.events} />
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700 text-white font-medium">أحدث طلبات البرامج</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-200 text-sm">
            <thead className="bg-slate-800/70">
              <tr>
                <th className="py-2 px-3">الفرع</th>
                <th className="py-2 px-3">العنوان</th>
                <th className="py-2 px-3">النوع</th>
                <th className="py-2 px-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, idx) => <RequestRow key={idx} r={r} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
