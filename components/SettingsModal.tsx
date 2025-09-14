import React, { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
import { CloseIcon, TranslateIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { isAutoTranslateOn, toggleAutoTranslate, targetLanguage } = useContext(TranslationContext);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-100">
            Settings
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
            <span className="sr-only">Close settings</span>
          </button>
        </div>

        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-3">
                    <TranslateIcon className="w-6 h-6 text-cyan-400"/>
                    <div>
                        <h3 className="font-semibold text-slate-200">Auto-translate Streams</h3>
                        <p className="text-sm text-slate-400">Translate content to {targetLanguage}.</p>
                    </div>
                </div>
                <button
                    onClick={toggleAutoTranslate}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                    isAutoTranslateOn ? 'bg-cyan-500' : 'bg-slate-600'
                    }`}
                    role="switch"
                    aria-checked={isAutoTranslateOn}
                >
                    <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isAutoTranslateOn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                    />
                </button>
            </div>
        </div>

        <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold transition-colors"
            >
              Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
