import {
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowUp,
  Bold,
  Building,
  Calendar,
  CheckCircle,
  Command,
  EyeOff,
  FilePlus,
  FileText,
  FlaskConical,
  Italic,
  List,
  ListOrdered,
  Menu,
  MessageCircle,
  MonitorCheck,
  MonitorOff,
  MoreHorizontal,
  Plus,
  Redo,
  Settings,
  Trash2,
  Undo,
  User,
  Users,
  UserCheck,
  UserPlus,
  UserX,
  X,
  XCircle,
  LucideProps,
} from 'lucide-react';

export const Icons = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  bold: Bold,
  building: Building,
  calendar: Calendar,
  close: X,
  closed: XCircle,
  dotsHorizontal: MoreHorizontal,
  eyeOff: EyeOff,
  filePlus: FilePlus,
  fileText: FileText,
  flask: FlaskConical,
  italic: Italic,
  logo: Command,
  menu: Menu,
  message: MessageCircle,
  offline: MonitorOff,
  ol: ListOrdered,
  online: MonitorCheck,
  open: CheckCircle,
  plus: Plus,
  redo: Redo,
  settings: Settings,
  sort: ArrowDownUp,
  trash: Trash2,
  ul: List,
  undo: Undo,
  user: User,
  users: Users,
  userCheck: UserCheck,
  userPlus: UserPlus,
  userX: UserX,
  spinner: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
