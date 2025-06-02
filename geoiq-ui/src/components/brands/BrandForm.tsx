'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  SparklesIcon, 
  DocumentTextIcon, 
  LightBulbIcon,
  PlusIcon,
  CheckIcon,
  SwatchIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Brand, BrandCreateData, BrandUpdateData } from '@/types/company-brands';

interface BrandFormProps {
  brand?: Brand | null;
  onSave: (brandData: BrandCreateData | BrandUpdateData) => Promise<void>;
  onCancel: () => void;
}

const formVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const fieldVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } }
};

type EditingField = 'name' | 'description' | 'color' | 'benefits' | null;

// FieldRow component matching CompanyDetailsForm style
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

export default function BrandForm({ brand, onSave, onCancel }: BrandFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    benefits: string[];
    color: string;
    status: 'active' | 'inactive' | 'draft';
  }>({
    name: '',
    description: '',
    benefits: [] as string[],
    color: '#8B5CF6',
    status: 'active'
  });
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [editValue, setEditValue] = useState('');
  const [editBenefits, setEditBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!brand;

  // Memoize brand colors
  const brandColors = useMemo(() => [
    '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6',
    '#8B5A2B', '#6366F1', '#84CC16', '#F97316', '#06B6D4', '#A855F7'
  ], []);

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || '',
        description: brand.description || '',
        benefits: brand.benefits || [],
        color: brand.color || '#8B5CF6',
        status: brand.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        benefits: [],
        color: '#8B5CF6',
        status: 'active'
      });
    }
  }, [brand]);

  const startEdit = useCallback((field: EditingField) => {
    setEditingField(field);
    if (field === 'benefits') {
      setEditBenefits([...formData.benefits]);
      setNewBenefit('');
    } else if (field === 'color') {
      setEditValue(formData.color);
    } else {
      setEditValue(formData[field as keyof typeof formData] as string);
    }
  }, [formData]);

  const cancelEdit = useCallback(() => {
    setEditingField(null);
    setEditValue('');
    setEditBenefits([]);
    setNewBenefit('');
  }, []);

  const saveField = useCallback(async (field: EditingField) => {
    if (!field) return;
    
    setIsLoading(true);
    try {
      let updatedData;
      if (field === 'benefits') {
        updatedData = { ...formData, benefits: editBenefits };
      } else {
        updatedData = { ...formData, [field]: editValue };
      }
      
      setFormData(updatedData);
      setEditingField(null);
      setEditValue('');
      setEditBenefits([]);
      setNewBenefit('');
    } catch (error) {
      console.error('Error saving field:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, editValue, editBenefits]);

  const handleEditValueChange = useCallback((value: string) => {
    setEditValue(value);
  }, []);

  const addBenefit = useCallback(() => {
    if (newBenefit.trim() && !editBenefits.includes(newBenefit.trim())) {
      setEditBenefits(prev => [...prev, newBenefit.trim()]);
      setNewBenefit('');
    }
  }, [newBenefit, editBenefits]);

  const removeBenefit = useCallback((index: number) => {
    setEditBenefits(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleFinalSave = useCallback(async () => {
    setIsLoading(true);
    try {
      // Create the appropriate data object based on whether we're editing or creating
      const saveData = isEditing 
        ? formData as BrandUpdateData
        : formData as BrandCreateData;
      
      await onSave(saveData);
    } catch (error) {
      console.error('Error saving brand:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSave, isEditing]);

  const isFormValid = formData.name.trim() && formData.description.trim();

  return (
    <motion.div
      variants={formVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Brand Name */}
      <motion.div variants={fieldVariants}>
        <FieldRow
          icon={SparklesIcon}
          label="Brand Name"
          field="name"
          value={formData.name}
          placeholder="Enter your brand name"
          isEditing={editingField === 'name'}
          editValue={editValue}
          isLoading={isLoading}
          onStartEdit={startEdit}
          onSaveField={saveField}
          onCancelEdit={cancelEdit}
          onEditValueChange={handleEditValueChange}
        />
      </motion.div>

      {/* Brand Description */}
      <motion.div variants={fieldVariants}>
        <FieldRow
          icon={DocumentTextIcon}
          label="Brand Description"
          field="description"
          value={formData.description}
          placeholder="Describe your brand's personality, target audience, and unique value proposition"
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

      {/* Brand Color */}
      <motion.div variants={fieldVariants}>
        <div className="geoiq-card p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Field Name with Icon and Edit Button */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#39009920' }}>
                <SwatchIcon className="w-4 h-4 text-[#390099]" />
              </div>
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span className="text-sm font-medium font-roboto" style={{ color: '#9E0059' }}>
                  Brand Color
                </span>
                {editingField !== 'color' && (
                  <button
                    onClick={() => startEdit('color')}
                    className="p-1 text-gray-400 hover:text-[#390099] hover:bg-gray-50 rounded transition-colors duration-200 flex-shrink-0"
                  >
                    <PencilIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Color Display or Edit Interface */}
            <div className="min-w-0">
              {editingField !== 'color' ? (
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: formData.color }}
                  ></div>
                  <span className="text-sm text-gray-900 font-roboto">{formData.color}</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-2">
                    {brandColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setEditValue(color)}
                        className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                          editValue === color 
                            ? 'ring-2 ring-[#390099] scale-105' 
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => saveField('color')}
                      disabled={isLoading}
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

      {/* Benefits */}
      <motion.div variants={fieldVariants}>
        <div className="geoiq-card p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Field Name with Icon and Edit Button */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#39009920' }}>
                <LightBulbIcon className="w-4 h-4 text-[#390099]" />
              </div>
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span className="text-sm font-medium font-roboto" style={{ color: '#9E0059' }}>
                  Key Benefits
                </span>
                {editingField !== 'benefits' && (
                  <button
                    onClick={() => startEdit('benefits')}
                    className="p-1 text-gray-400 hover:text-[#390099] hover:bg-gray-50 rounded transition-colors duration-200 flex-shrink-0"
                  >
                    <PencilIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Benefits List or Edit Interface */}
            <div className="min-w-0">
              {editingField !== 'benefits' ? (
                <div className="space-y-2">
                  {formData.benefits.length > 0 ? (
                    formData.benefits.map((benefit, index) => (
                      <div key={`benefit-view-${index}`} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#390099' }}></div>
                        <span className="text-sm text-gray-900 font-roboto leading-relaxed break-words">{benefit}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400 italic font-roboto">No benefits added yet</span>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Add Benefit Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="e.g., Increases productivity by 40%"
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#390099] focus:ring-1 focus:ring-[#390099]/20 outline-none transition-all duration-200 font-roboto"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    />
                    <button
                      onClick={addBenefit}
                      disabled={!newBenefit.trim()}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 transition-all duration-200 hover:bg-gray-200"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Benefits List */}
                  {editBenefits.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {editBenefits.map((benefit, index) => (
                        <div
                          key={`benefit-edit-${index}`}
                          className="flex items-center justify-between p-2 bg-gray-50 border border-gray-100 rounded-lg"
                        >
                          <span className="text-sm text-gray-900 font-roboto flex-1 min-w-0 break-words pr-2">{benefit}</span>
                          <button
                            onClick={() => removeBenefit(index)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
                          >
                            <XMarkIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Save/Cancel Benefits */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => saveField('benefits')}
                      disabled={isLoading}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-[#390099] text-white rounded text-xs font-medium disabled:opacity-50 transition-all duration-200 hover:bg-[#390099]/90"
                    >
                      {isLoading ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <CheckIcon className="w-3 h-3" />
                      )}
                      <span>Save Benefits</span>
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

      {/* Final Save/Cancel Buttons */}
      <motion.div variants={fieldVariants} className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-roboto"
        >
          Cancel
        </button>
        <button
          onClick={handleFinalSave}
          disabled={!isFormValid || isLoading}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 font-roboto ${
            isFormValid
              ? 'bg-[#390099] text-white hover:bg-[#390099]/90 shadow-sm'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>{isEditing ? 'Update Brand' : 'Create Brand'}</span>
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
} 