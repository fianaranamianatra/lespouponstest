import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './components/auth/AuthGuard';
import { RoleBasedRoute } from './components/auth/RoleBasedRoute';
import { LoginPage } from './pages/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { TeachersFirebase } from './pages/TeachersFirebase';
import { ClassesFirebase } from './pages/ClassesFirebase';
import { SubjectsFirebase } from './pages/SubjectsFirebase';
import { StudentsFirebase } from './pages/StudentsFirebase';
import { GradesFirebase } from './pages/GradesFirebase';
import { CommunicationFirebase } from './pages/CommunicationFirebase';
import { ImportStudents } from './pages/ImportStudents';
import { Bulletins } from './pages/Bulletins';
import { ReportsFirebase } from './pages/ReportsFirebase';
import { EcolageFirebase } from './pages/EcolageFirebase';
import { ScheduleFirebase } from './pages/ScheduleFirebase';
import { FinancialStatusFirebase } from './pages/FinancialStatusFirebase';
import { OrganizationalChartFirebase } from './pages/OrganizationalChartFirebase';
import { UserManagement } from './pages/UserManagement';
import { UserProfile } from './pages/UserProfile';
import { AdvancedFinancialManagement } from './pages/AdvancedFinancialManagement';
import { PayrollManagement } from './pages/PayrollManagement';
import { FinancialSettingsFirebase } from './pages/FinancialSettingsFirebase';
import { FinancialAnalyticsPage } from './pages/FinancialAnalytics';
import { AccessDenied } from './pages/AccessDenied';
import { USER_ROLES } from './lib/roles';

export type Page = 'dashboard' | 'students' | 'teachers' | 'classes' | 'subjects' | 'grades' | 'bulletins' | 'communication' | 'reports' | 'ecolage' | 'schedule' | 'financial' | 'organization' | 'import' | 'advanced_finances' | 'financial_settings' | 'payroll' | 'financial_analytics';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY, USER_ROLES.TEACHER]}>
            <StudentsFirebase />
          </RoleBasedRoute>
        );
      case 'import':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]}>
            <ImportStudents />
          </RoleBasedRoute>
        );
      case 'teachers':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR]}>
            <TeachersFirebase />
          </RoleBasedRoute>
        );
      case 'classes':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]}>
            <ClassesFirebase />
          </RoleBasedRoute>
        );
      case 'subjects':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR]}>
            <SubjectsFirebase />
          </RoleBasedRoute>
        );
      case 'grades':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.TEACHER]}>
            <GradesFirebase />
          </RoleBasedRoute>
        );
      case 'bulletins':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.TEACHER, USER_ROLES.SECRETARY]}>
            <Bulletins />
          </RoleBasedRoute>
        );
      case 'communication':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY, USER_ROLES.TEACHER, USER_ROLES.PARENT]}>
            <CommunicationFirebase />
          </RoleBasedRoute>
        );
      case 'reports':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.TEACHER]}>
            <ReportsFirebase />
          </RoleBasedRoute>
        );
      case 'ecolage':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY, USER_ROLES.ACCOUNTANT]}>
            <EcolageFirebase />
          </RoleBasedRoute>
        );
      case 'schedule':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY, USER_ROLES.TEACHER]}>
            <ScheduleFirebase />
          </RoleBasedRoute>
        );
      case 'financial':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.ACCOUNTANT]}>
            <FinancialStatusFirebase />
          </RoleBasedRoute>
        );
      case 'organization':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR]}>
            <OrganizationalChartFirebase />
          </RoleBasedRoute>
        );
      case 'advanced_finances':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.ACCOUNTANT]}>
            <AdvancedFinancialManagement />
          </RoleBasedRoute>
        );
      case 'payroll':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.ACCOUNTANT]}>
            <PayrollManagement />
          </RoleBasedRoute>
        );
      case 'financial_settings':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR]}>
            <FinancialSettingsFirebase />
          </RoleBasedRoute>
        );
      case 'financial_analytics':
        return (
          <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.DIRECTOR, USER_ROLES.ACCOUNTANT]}>
            <FinancialAnalyticsPage />
          </RoleBasedRoute>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/profile" element={
          <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex">
              <Sidebar 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <main className="p-6">
                  <UserProfile />
                </main>
              </div>
            </div>
          </AuthGuard>
        } />
        <Route path="/users" element={
          <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex">
              <Sidebar 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <main className="p-6">
                  <RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <UserManagement />
                  </RoleBasedRoute>
                </main>
              </div>
            </div>
          </AuthGuard>
        } />
        <Route path="/" element={
          <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex">
              <Sidebar 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <main className="p-6">
                  {renderPage()}
                </main>
              </div>
            </div>
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}

export default App;