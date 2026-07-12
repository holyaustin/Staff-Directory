'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Staff Directory',
    siteDescription: 'Akanu Ibiam Federal Polytechnic Staff Directory',
    itemsPerPage: 12,
    enableSearch: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Configure system settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-poly-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Description
            </label>
            <textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-poly-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Items Per Page
            </label>
            <select
              value={settings.itemsPerPage}
              onChange={(e) => setSettings({ ...settings, itemsPerPage: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-poly-blue"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.enableSearch}
              onChange={(e) => setSettings({ ...settings, enableSearch: e.target.checked })}
              className="w-4 h-4 text-poly-blue focus:ring-poly-blue"
            />
            <label className="text-sm text-gray-700">Enable Search</label>
          </div>

          <button
            type="submit"
            className="bg-poly-blue text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}