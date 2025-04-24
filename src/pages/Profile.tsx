import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Camera, Bell, Shield, Key, Moon, Sun, Check, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await updateProfile({ name: profileData.name });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={currentUser?.profileImage || "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white p-1.5 rounded-full transition-colors duration-200">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {currentUser?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <nav className="p-2">
              <ul className="space-y-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg ${
                        activeTab === tab.id 
                          ? 'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } transition-colors duration-200`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-2 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="mr-3">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'account' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1.5 bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {successMessage && (
                  <div className="mb-4 p-3 bg-success-50 dark:bg-success-900/30 text-success-800 dark:text-success-200 rounded-lg flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    {successMessage}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`pl-10 input w-full ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        className="pl-10 input w-full bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Email address cannot be changed
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <X className="h-4 w-4 mr-2" />
                          <span>Cancel</span>
                        </div>
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        <div className="flex items-center">
                          {isSaving ? (
                            <div className="dot-flashing"></div>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Security Settings
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            className="pl-10 input w-full"
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            className="pl-10 input w-full"
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            className="pl-10 input w-full"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notification Preferences
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Portfolio updates and summaries',
                        'Price alerts on watched investments',
                        'New feature announcements',
                        'Security alerts',
                        'Newsletter and market insights',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      In-App Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Real-time investment alerts',
                        'AI assistant insights',
                        'Important account updates',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Appearance Settings
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`relative flex flex-col items-center p-4 rounded-lg border-2 ${
                          theme === 'light' 
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="w-full h-32 mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="p-3">
                            <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-5/6 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Light Mode</span>
                        {theme === 'light' && (
                          <div className="absolute top-3 right-3 h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`relative flex flex-col items-center p-4 rounded-lg border-2 ${
                          theme === 'dark' 
                            ? 'border-primary-600 bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="w-full h-32 mb-4 bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                          <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="p-3">
                            <div className="h-3 w-3/4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-1/2 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-5/6 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</span>
                        {theme === 'dark' && (
                          <div className="absolute top-3 right-3 h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Color Accent
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Choose your preferred accent color for buttons and interactive elements.
                    </p>
                    <div className="flex space-x-4">
                      {[
                        { name: 'Blue', color: '#0ea5e9', selected: true },
                        { name: 'Green', color: '#10b981' },
                        { name: 'Purple', color: '#8b5cf6' },
                        { name: 'Orange', color: '#f59e0b' },
                        { name: 'Red', color: '#ef4444' },
                      ].map((colorOption) => (
                        <button
                          key={colorOption.name}
                          className={`w-8 h-8 rounded-full focus:outline-none ${
                            colorOption.selected ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          aria-label={`Select ${colorOption.name} theme`}
                        >
                          {colorOption.selected && (
                            <Check className="h-4 w-4 text-white mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;