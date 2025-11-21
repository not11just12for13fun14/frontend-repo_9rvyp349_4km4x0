import { useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function RequestForm({ onCreated }) {
  const [form, setForm] = useState({
    branch_code: "RU-01",
    program_title: "",
    program_type: "student_activity",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/program-requests`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      await res.json();
      setForm({ ...form, program_title: "", description: "" });
      onCreated && onCreated();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-slate-300 text-sm mb-1">عنوان البرنامج</label>
        <input value={form.program_title} onChange={e=>setForm(f=>({...f, program_title:e.target.value}))}
          className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" required />
      </div>
      <div>
        <label className="block text-slate-300 text-sm mb-1">النوع</label>
        <select value={form.program_type} onChange={e=>setForm(f=>({...f, program_type:e.target.value}))}
          className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white">
          <option value="student_activity">نشاط طلابي</option>
          <option value="community_service">خدمة مجتمعية</option>
          <option value="volunteering">تطوع</option>
        </select>
      </div>
      <div>
        <label className="block text-slate-300 text-sm mb-1">الوصف</label>
        <textarea value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))}
          className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" rows={3} />
      </div>
      <div className="flex gap-2">
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded px-4 py-2">
          {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </div>
    </form>
  );
}
