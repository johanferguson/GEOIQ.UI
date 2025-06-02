'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  HeartIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Company, CompanyUpdateData } from '@/types/company-brands';

interface CompanyDetailsFormProps {
  company: Company | null;
  onSave: (companyData: CompanyUpdateData) => Promise<Company | null>;
}

const formVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const fieldVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } }
};

type EditingField = 'name' | 'description' | 'coreKPIs' | 'missionStatement' | null;

// FieldRow component for consistent styling
const FieldRow = React.memo(({ 
  icon: Icon, 
  label, 
  field, 
  value, 
  placeholder,
  isTextarea = false,
  isEditing,
  editValue,
  isLoading,
  onStartEdit,
  onSaveField,
  onCancelEdit,
  onEditValueChange
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  field: EditingField;
  value: string;
  placeholder: string;
  isTextarea?: boolean;
  isEditing: boolean;
  editValue: string;
  isLoading: boolean;
  onStartEdit: (field: EditingField) => void;
  onSaveField: (field: EditingField) => void;
  onCancelEdit: () => void;
  onEditValueChange: (value: string) => void;
}) => {
  return (
    <div className="geoiq-card p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Field Name with Icon and Edit Button */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#39009920' }}>
            <Icon className="w-4 h-4 text-[#390099]" />
          </div>
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <span className="text-sm font-medium font-roboto" style={{ color: '#9E0059' }}>
              {label}
            </span>
            {!isEditing && (
              <button
                onClick={() => onStartEdit(field)}
                className="p-1 text-gray-400 hover:text-[#390099] hover:bg-gray-50 rounded transition-colors duration-200 flex-shrink-0"
              >
                <PencilIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Field Value or Edit Input */}
        <div className="min-w-0">
          {!isEditing ? (
            <div className="text-sm text-gray-900 font-roboto break-words">
              {value ? (
                <span className="leading-relaxed">{value}</span>
              ) : (
                <span className="text-gray-400 italic">Not set</span>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {isTextarea ? (
                <textarea
                  value={editValue}
                  onChange={(e) => onEditValueChange(e.target.value)}
                  placeholder={placeholder}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#390099] focus:ring-1 focus:ring-[#390099]/20 outline-none transition-all duration-200 font-roboto resize-none"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => onEditValueChange(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#390099] focus:ring-1 focus:ring-[#390099]/20 outline-none transition-all duration-200 font-roboto"
                  autoFocus
                />
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSaveField(field)}
                  disabled={isLoading || !editValue.trim()}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-[#390099] text-white rounded text-xs font-medium disabled:opacity-50 transition-all duration-200 hover:bg-[#390099]/90"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <CheckIcon className="w-3 h-3" />
                  )}
                  <span>Save</span>
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800 rounded text-xs font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

FieldRow.displayName = 'FieldRow';

export default function CompanyDetailsForm({ company, onSave }: CompanyDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coreKPIs: [] as string[],
    missionStatement: ''
  });
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [editValue, setEditValue] = useState('');
  const [editKPIs, setEditKPIs] = useState<string[]>([]);
  const [newKPI, setNewKPI] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        description: company.description || '',
        coreKPIs: company.coreKPIs || [],
        missionStatement: company.missionStatement || ''
      });
    }
  }, [company]);

  const startEdit = useCallback((field: EditingField) => {
    setEditingField(field);
    if (field === 'coreKPIs') {
      setEditKPIs([...formData.coreKPIs]);
      setNewKPI('');
    } else {
      setEditValue(formData[field as keyof typeof formData] as string);
    }
  }, [formData]);

  const cancelEdit = useCallback(() => {
    setEditingField(null);
    setEditValue('');
    setEditKPIs([]);
    setNewKPI('');
  }, []);

  const saveField = useCallback(async (field: EditingField) => {
    if (!field) return;
    
    setIsLoading(true);
    try {
      let updatedData: CompanyUpdateData;
      if (field === 'coreKPIs') {
        updatedData = { coreKPIs: editKPIs };
      } else {
        updatedData = { [field]: editValue };
      }
      
      const result = await onSave(updatedData);
      if (result) {
        setFormData(prev => ({
          ...prev,
          ...updatedData
        }));
        setEditingField(null);
        setEditValue('');
        setEditKPIs([]);
        setNewKPI('');
      }
    } catch (error) {
      console.error('Error saving field:', error);
    } finally {
      setIsLoading(false);
    }
  }, [editValue, editKPIs, onSave]);

  const handleEditValueChange = useCallback((value: string) => {
    setEditValue(value);
  }, []);

  const addKPI = useCallback(() => {
    if (newKPI.trim() && !editKPIs.includes(newKPI.trim())) {
      setEditKPIs(prev => [...prev, newKPI.trim()]);
      setNewKPI('');
    }
  }, [newKPI, editKPIs]);

  const removeKPI = useCallback((index: number) => {
    setEditKPIs(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <motion.div
      variants={formVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Company Name */}
      <motion.div variants={fieldVariants}>
        <FieldRow
          icon={BuildingOfficeIcon}
          label="Company Name"
          field="name"
          value={formData.name}
          placeholder="Enter your company name"
          isEditing={editingField === 'name'}
          editValue={editValue}
          isLoading={isLoading}
          onStartEdit={startEdit}
          onSaveField={saveField}
          onCancelEdit={cancelEdit}
          onEditValueChange={handleEditValueChange}
        />
      </motion.div>

      {/* Company Description */}
      <motion.div variants={fieldVariants}>
        <FieldRow
          icon={DocumentTextIcon}
          label="Company Description"
          field="description"
          value={formData.description}
          placeholder="Describe your company's business, services, and target market"
          isTextarea={true}
          isEditing={editingField === 'description'}
          editValue={editValue}
          isLoading={isLoading}
          onStartEdit={startEdit}
          onSaveField={saveField}
          onCancelEdit={cancelEdit}
          onEditValueChange={handleEditValueChange}
        />
      </motion.div>

      {/* Core KPIs */}
      <motion.div variants={fieldVariants}>
        <div className="geoiq-card p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Field Name with Icon and Edit Button */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#39009920' }}>
                <ChartBarIcon className="w-4 h-4 text-[#390099]" />
              </div>
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span className="text-sm font-medium font-roboto" style={{ color: '#9E0059' }}>
                  Core KPIs
                </span>
                {editingField !== 'coreKPIs' && (
                  <button
                    onClick={() => startEdit('coreKPIs')}
                    className="p-1 text-gray-400 hover:text-[#390099] hover:bg-gray-50 rounded transition-colors duration-200 flex-shrink-0"
                  >
                    <PencilIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - KPIs List or Edit Interface */}
            <div className="min-w-0">
              {editingField !== 'coreKPIs' ? (
                <div className="space-y-2">
                  {formData.coreKPIs.length > 0 ? (
                    formData.coreKPIs.map((kpi, index) => (
                      <div key={`kpi-view-${index}`} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#390099' }}></div>
                        <span className="text-sm text-gray-900 font-roboto leading-relaxed break-words">{kpi}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400 italic font-roboto">No KPIs defined yet</span>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Add KPI Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newKPI}
                      onChange={(e) => setNewKPI(e.target.value)}
                      placeholder="e.g., Monthly Recurring Revenue (MRR)"
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#390099] focus:ring-1 focus:ring-[#390099]/20 outline-none transition-all duration-200 font-roboto"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKPI())}
                    />
                    <button
                      onClick={addKPI}
                      disabled={!newKPI.trim()}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 transition-all duration-200 hover:bg-gray-200"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* KPIs List */}
                  {editKPIs.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {editKPIs.map((kpi, index) => (
                        <div
                          key={`kpi-edit-${index}`}
                          className="flex items-center justify-between p-2 bg-gray-50 border border-gray-100 rounded-lg"
                        >
                          <span className="text-sm text-gray-900 font-roboto flex-1 min-w-0 break-words pr-2">{kpi}</span>
                          <button
                            onClick={() => removeKPI(index)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
                          >
                            <XMarkIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Save/Cancel KPIs */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => saveField('coreKPIs')}
                      disabled={isLoading}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-[#390099] text-white rounded text-xs font-medium disabled:opacity-50 transition-all duration-200 hover:bg-[#390099]/90"
                    >
                      {isLoading ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <CheckIcon className="w-3 h-3" />
                      )}
                      <span>Save KPIs</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 text-gray-600 hover:text-gray-800 rounded text-xs font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div variants={fieldVariants}>
        <FieldRow
          icon={HeartIcon}
          label="Mission Statement"
          field="missionStatement"
          value={formData.missionStatement}
          placeholder="Describe your company's mission, vision, and core values"
          isTextarea={true}
          isEditing={editingField === 'missionStatement'}
          editValue={editValue}
          isLoading={isLoading}
          onStartEdit={startEdit}
          onSaveField={saveField}
          onCancelEdit={cancelEdit}
          onEditValueChange={handleEditValueChange}
        />
      </motion.div>
    </motion.div>
  );
} 