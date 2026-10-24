'use client';

import React, { useState, useEffect } from 'react';
import { Keyboard, Key, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { DevShortcutConfig, DEFAULT_DEV_SHORTCUT } from '@/types/dev';

export default function DevShortcutSettings() {
  const [config, setConfig] = useState<DevShortcutConfig>(DEFAULT_DEV_SHORTCUT);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masakin_dev_shortcut_config');
      if (saved) setConfig(JSON.parse(saved));
    } catch {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('masakin_dev_shortcut_config', JSON.stringify(config));
      setStatusMsg('নতুন শর্টকাট কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg('সংরক্ষণ ব্যর্থ হয়েছে।');
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_DEV_SHORTCUT);
    try {
      localStorage.setItem('masakin_dev_shortcut_config', JSON.stringify(DEFAULT_DEV_SHORTCUT));
      setStatusMsg('ডিফল্ট শর্টকাটে (Ctrl + Shift + D) রিসেট করা হয়েছে!');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {}
  };

  const keyOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

  return (
    <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-400">
          <Keyboard className="w-4 h-4" />
          <span className="font-bold">বর্তমান সক্রিয় শর্টকাট:</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-white">
          {config.ctrlKey && <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">Ctrl/Cmd</kbd>}
          {config.shiftKey && <span>+</span>}
          {config.shiftKey && <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">Shift</kbd>}
          {config.altKey && <span>+</span>}
          {config.altKey && <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">Alt</kbd>}
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
            {config.key.toUpperCase()}
          </kbd>
        </div>
      </div>

      {/* Modifier Keys & Letter Selector */}
      <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
        <span className="font-bold text-zinc-300 block">শর্টকাট কী নির্বাচন করুন:</span>
        <div className="flex flex-wrap items-center gap-4 text-zinc-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={config.ctrlKey}
              onChange={(e) => setConfig({ ...config, ctrlKey: e.target.checked })}
              className="accent-rose-500 rounded"
            />
            <span>Ctrl / Cmd</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={config.shiftKey}
              onChange={(e) => setConfig({ ...config, shiftKey: e.target.checked })}
              className="accent-rose-500 rounded"
            />
            <span>Shift</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={config.altKey}
              onChange={(e) => setConfig({ ...config, altKey: e.target.checked })}
              className="accent-rose-500 rounded"
            />
            <span>Alt</span>
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-zinc-400">অক্ষর (Letter):</span>
            <select
              value={config.key.toUpperCase()}
              onChange={(e) => setConfig({ ...config, key: e.target.value })}
              className="px-2 py-1 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-bold focus:border-rose-500 focus:outline-none"
            >
              {keyOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Master Key input */}
      <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2">
        <label className="block font-bold text-zinc-300 flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-rose-500" />
          <span>ডেভ মাস্টার আনলক কী (Master Secret Key):</span>
        </label>
        <input
          type="text"
          required
          value={config.masterKey}
          onChange={(e) => setConfig({ ...config, masterKey: e.target.value.trim() })}
          placeholder="e.g. dev123"
          className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-mono focus:border-rose-500 focus:outline-none"
        />
        <span className="text-[10px] text-zinc-500 block">
          কনসোল ওপেন হলে এই কি দিয়ে আনলক করতে হবে (ডিফল্ট: dev123)।
        </span>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>শর্টকাট আপডেট করুন</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-3.5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-xl transition cursor-pointer flex items-center gap-1"
          title="রিসেট"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ডিফল্ট</span>
        </button>
      </div>
    </form>
  );
}
