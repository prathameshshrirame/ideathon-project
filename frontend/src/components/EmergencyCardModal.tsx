import React, { useState } from 'react';
import { Phone, Users, ShieldAlert, Plus, Trash2, CheckCircle2, PhoneCall, FileText } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
}

const DEFAULT_CONTACTS: Contact[] = [
  { id: '1', name: 'Local Emergency Dispatch', relation: 'First Responder', phone: '911', isPrimary: true },
  { id: '2', name: 'Poison Control Hotline', relation: 'Medical Toxicology', phone: '1-800-222-1222', isPrimary: true },
  { id: '3', name: 'Emergency Family Contact', relation: 'Next of Kin', phone: '555-019-2834', isPrimary: false },
];

export const EmergencyCardModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('crisismate_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONTACTS;
      }
    }
    return DEFAULT_CONTACTS;
  });

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Medical profile summary
  const [bloodGroup, setBloodGroup] = useState(() => localStorage.getItem('crisismate_blood') || 'O+');
  const [allergies, setAllergies] = useState(() => localStorage.getItem('crisismate_allergies') || 'Penicillin, Peanuts');
  const [conditions, setConditions] = useState(() => localStorage.getItem('crisismate_conditions') || 'Asthma');

  const saveContacts = (updated: Contact[]) => {
    setContacts(updated);
    localStorage.setItem('crisismate_contacts', JSON.stringify(updated));
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name: newName,
      relation: newRelation || 'Contact',
      phone: newPhone,
      isPrimary: false,
    };
    const updated = [...contacts, newContact];
    saveContacts(updated);
    setNewName('');
    setNewRelation('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    saveContacts(updated);
  };

  const handleSaveMedical = () => {
    localStorage.setItem('crisismate_blood', bloodGroup);
    localStorage.setItem('crisismate_allergies', allergies);
    localStorage.setItem('crisismate_conditions', conditions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Emergency Medical & Contact Card (ICE)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                In-Case-of-Emergency quick responder reference
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Rapid Medical Profile Info */}
        <div className="space-y-3 bg-red-50/50 p-4 rounded-xl border border-red-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              Critical Medical Profile
            </span>
            <span className="text-[10px] text-red-600 font-bold bg-white px-2 py-0.5 rounded-full border border-red-200">
              Paramedic Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Blood Type
              </label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                onBlur={handleSaveMedical}
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-black text-slate-900"
                placeholder="O+, A-, etc."
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Severe Allergies
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                onBlur={handleSaveMedical}
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                placeholder="Penicillin, etc."
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Medical Conditions
              </label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                onBlur={handleSaveMedical}
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                placeholder="Asthma, Diabetes"
              />
            </div>
          </div>
        </div>

        {/* Speed-Dial Contact List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-600" />
              Priority Emergency Contacts
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add Contact'}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddContact} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Relation (e.g. Spouse)"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
              >
                Save Contact
              </button>
            </form>
          )}

          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{contact.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                      {contact.relation}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600 font-semibold">{contact.phone}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </a>

                  {contact.id !== '1' && contact.id !== '2' && (
                    <button
                      type="button"
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete contact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
