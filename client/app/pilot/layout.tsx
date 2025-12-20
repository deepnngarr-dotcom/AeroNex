// client/app/pilot/layout.tsx
import RoleGuard from '../../components/RoleGuard';

export default function PilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRole="pilot">
      {children}
    </RoleGuard>
  );
}