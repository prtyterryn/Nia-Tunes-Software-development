import { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Mic2, 
  Radio, 
  Building2,
  ArrowRight,
  Music,
  CheckCircle2
} from 'lucide-react';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { CreatorType } from '@/types/creator';

interface CreatorAuthScreenProps {
  onAuthSuccess?: () => void;
}

export function CreatorAuthScreen({ onAuthSuccess }: CreatorAuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [creatorType, setCreatorType] = useState<CreatorType>('artist');
  
  const [formData, setFormData] = useState({
    name: '',
    artistName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, register, isLoading, error, clearError } = useCreatorAuthStore();

  const creatorTypes = [
    { id: 'artist' as CreatorType, label: 'Artist', icon: Mic2, description: 'Share your music with the world' },
    { id: 'podcaster' as CreatorType, label: 'Podcaster', icon: Radio, description: 'Create and share podcasts' },
    { id: 'label' as CreatorType, label: 'Record Label', icon: Building2, description: 'Manage multiple artists' },
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.artistName.trim()) newErrors.artistName = 'Artist/Podcast name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!isLogin && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateStep2()) return;
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register({
          name: formData.name,
          artistName: formData.artistName,
          email: formData.email,
          password: formData.password,
          creatorType,
        });
      }
      onAuthSuccess?.();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-nia-black flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-nia-red to-nia-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-glow">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">NiaTunes Creator</h1>
          <p className="text-nia-gray-400 text-sm">Share your talent with the world</p>
        </div>

        {/* Progress Steps */}
        {!isLogin && (
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-nia-red text-white' : 'bg-nia-gray-800 text-nia-gray-400'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-nia-red' : 'bg-nia-gray-800'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-nia-red text-white' : 'bg-nia-gray-800 text-nia-gray-400'
            }`}>
              2
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-nia-red/20 border border-nia-red/30 rounded-xl text-nia-red text-sm text-center">
              {error}
            </div>
          )}

          {/* Step 1: Account Type & Basic Info */}
          {step === 1 && !isLogin && (
            <>
              {/* Creator Type Selection */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">I am a...</label>
                <div className="grid grid-cols-3 gap-2">
                  {creatorTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setCreatorType(type.id)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        creatorType === type.id
                          ? 'border-nia-red bg-nia-red/10'
                          : 'border-nia-gray-800 bg-nia-gray-800/50 hover:border-nia-gray-700'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                        creatorType === type.id ? 'text-nia-red' : 'text-nia-gray-400'
                      }`} />
                      <span className={`text-xs font-medium ${
                        creatorType === type.id ? 'text-white' : 'text-nia-gray-400'
                      }`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-nia-gray-500 text-xs text-center">
                  {creatorTypes.find(t => t.id === creatorType)?.description}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Full Name"
                    className={`w-full input-field pl-12 ${errors.name ? 'border-nia-red' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-nia-red text-xs mt-1 ml-1">{errors.name}</p>}
              </div>

              {/* Artist/Podcast Name */}
              <div>
                <div className="relative">
                  <Mic2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                  <input
                    type="text"
                    value={formData.artistName}
                    onChange={(e) => handleInputChange('artistName', e.target.value)}
                    placeholder={creatorType === 'artist' ? 'Artist Name' : creatorType === 'podcaster' ? 'Podcast Name' : 'Label Name'}
                    className={`w-full input-field pl-12 ${errors.artistName ? 'border-nia-red' : ''}`}
                  />
                </div>
                {errors.artistName && <p className="text-nia-red text-xs mt-1 ml-1">{errors.artistName}</p>}
              </div>
            </>
          )}

          {/* Email (Step 1 for both, Step 2 for register) */}
          {(step === 1 || isLogin) && (
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email address"
                  className={`w-full input-field pl-12 ${errors.email ? 'border-nia-red' : ''}`}
                />
              </div>
              {errors.email && <p className="text-nia-red text-xs mt-1 ml-1">{errors.email}</p>}
            </div>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <>
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Password"
                    className={`w-full input-field pl-12 pr-12 ${errors.password ? 'border-nia-red' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-nia-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-nia-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-nia-red text-xs mt-1 ml-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm Password"
                      className={`w-full input-field pl-12 ${errors.confirmPassword ? 'border-nia-red' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-nia-red text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Terms Checkbox */}
              {!isLogin && (
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('agreeTerms', !formData.agreeTerms)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData.agreeTerms 
                        ? 'bg-nia-red border-nia-red' 
                        : 'border-nia-gray-600 hover:border-nia-gray-500'
                    }`}
                  >
                    {formData.agreeTerms && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <p className="text-nia-gray-400 text-xs">
                    I agree to the{' '}
                    <button type="button" className="text-nia-red hover:underline">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-nia-red hover:underline">Creator Agreement</button>
                  </p>
                </div>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {!isLogin && step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-nia-gray-700 rounded-full text-white font-medium hover:bg-nia-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            
            {!isLogin && step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-nia-gray-400 text-sm">
            {isLogin ? "Don't have a creator account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
                clearError();
                setErrors({});
              }}
              className="text-nia-red font-medium ml-1 hover:underline"
            >
              {isLogin ? 'Join as Creator' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Benefits */}
        {!isLogin && (
          <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-sm">
            {[
              'Upload unlimited songs',
              'Earn from streams',
              'Fan subscriptions',
              'Detailed analytics',
              'Direct payouts',
              'Chart rankings',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-nia-gray-400 text-xs">
                <CheckCircle2 className="w-4 h-4 text-nia-green flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorAuthScreen;
