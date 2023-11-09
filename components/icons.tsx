import {
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowUp,
  Command,
  EyeOff,
  FileText,
  FlaskConical,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Trash2,
  User,
  Users,
  UserCheck,
  UserPlus,
  UserX,
  X,
  LucideProps,
} from 'lucide-react';

export const Icons = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  close: X,
  dotsHorizontal: MoreHorizontal,
  eyeOff: EyeOff,
  fileText: FileText,
  flask: FlaskConical,
  logo: Command,
  menu: Menu,
  message: MessageCircle,
  settings: Settings,
  sort: ArrowDownUp,
  trash: Trash2,
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
