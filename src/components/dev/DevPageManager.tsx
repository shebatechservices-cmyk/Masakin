'use client';

import React, { useState } from 'react';
import { FileText, ToggleLeft, ToggleRight, Plus, Trash2, RotateCcw, AlertCircle } from 'lucide-react';
import { usePageControl } from '@/context/PageControlContext';

export default function DevPageManager() {
  const { pages, togglePage, addCustomPage, deletePage, resetPagesToDefault } = usePageControl();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPath, setNewPath] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPath.trim() || !newName.trim()) {
      setErrorMsg('ইউআরএল এবং পেজের নাম আবশ্যক।');
      return;
    }

    const success = addCustomPage({
      path: newPath,
      name: newName,
      description: newDesc || 'কাস্টম ওয়েব পেজ'
    });

    if (success) {
      setNewPath('');
      setNewName('');
      setNewDesc('');
      setShowAddForm(false);
    } else {
      setErrorMsg('এই ইউআরএল পাথটি ইতোমধ্যে বিদ্যমান।');
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
        <span className="font-bold text-zinc-400">
          ওয়েব পেজ তালিকা ({pages.length} টি):
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন পেজ</span>
          </button>
          <button
            type="button"
            onClick={resetPagesToDefault}
            className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg cursor-pointer transition"
            title="ডিফল্ট পেজ রিসেট"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddPage} className="p-3.5 bg-zinc-900 border border-zinc-700 rounded-2xl space-y-2.5">
          <span className="font-bold text-white block">নতুন পেজ রেজিস্টার করুন:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="পাথ (e.g. /notice)"
              className="px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
            />
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="পেজের নাম (e.g. জরুরি নোটিশ)"
              className="px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="বিবরণ (ঐচ্ছিক)"
            className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
          />
          {errorMsg && <p className="text-rose-400 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errorMsg}</p>}
          <div className="flex items-center gap-2">
            <button type="submit" className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold">যোগ করুন</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-lg">বাতিল</button>
          </div>
        </form>
      )}

      {/* Pages List */}
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {pages.map((p) => (
          <div
            key={p.id}
            className={`p-3 rounded-2xl border transition flex items-center justify-between ${
              p.isEnabled ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-950/80 border-rose-950/60 opacity-80'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <FileText className={`w-3.5 h-3.5 ${p.isEnabled ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span className="font-bold text-white">{p.name}</span>
                <span className="font-mono text-[10px] text-zinc-400">{p.path}</span>
              </div>
              <p className="text-[10px] text-zinc-500">{p.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => togglePage(p.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                  p.isEnabled ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                }`}
              >
                {p.isEnabled ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-rose-400" />}
                <span>{p.isEnabled ? 'সক্রিয়' : 'বন্ধ'}</span>
              </button>

              {p.isCustom && (
                <button
                  type="button"
                  onClick={() => deletePage(p.id)}
                  className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer"
                  title="পেজ মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
