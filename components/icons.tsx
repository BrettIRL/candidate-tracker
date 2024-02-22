import {
  Accessibility,
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowUp,
  Bold,
  Building,
  Calendar,
  CarFront,
  Check,
  CheckCircle,
  CheckSquare,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsUpDown,
  CircleSlash,
  Clipboard,
  Cog,
  Command,
  EyeOff,
  FilePlus,
  FileQuestion,
  FileText,
  FlaskConical,
  FolderClosed,
  GraduationCap,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  MapPin,
  Menu,
  MessageCircle,
  MonitorCheck,
  MonitorOff,
  MoreHorizontal,
  Plus,
  Redo,
  Search,
  Settings,
  SlidersHorizontal,
  Trash2,
  Undo,
  User,
  Users,
  UserCheck,
  UserPlus,
  X,
  XCircle,
  LucideProps,
} from 'lucide-react';

export const Icons = {
  accessibility: Accessibility,
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  bold: Bold,
  building: Building,
  calendar: Calendar,
  car: CarFront,
  check: Check,
  checkSquare: CheckSquare,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsUpDown: ChevronsUpDown,
  clipboard: Clipboard,
  close: X,
  closed: XCircle,
  dotsHorizontal: MoreHorizontal,
  doubleLeft: ChevronsLeft,
  doubleRight: ChevronsRight,
  education: GraduationCap,
  eyeOff: EyeOff,
  filePlus: FilePlus,
  fileText: FileText,
  flask: FlaskConical,
  folderClosed: FolderClosed,
  gear: Cog,
  italic: Italic,
  logo: Command,
  menu: Menu,
  message: MessageCircle,
  multiselect: ListChecks,
  offline: MonitorOff,
  ol: ListOrdered,
  online: MonitorCheck,
  open: CheckCircle,
  pin: MapPin,
  plus: Plus,
  question: FileQuestion,
  redo: Redo,
  search: Search,
  settings: Settings,
  slash: CircleSlash,
  slidersHorizontal: SlidersHorizontal,
  sort: ArrowDownUp,
  trash: Trash2,
  ul: List,
  undo: Undo,
  user: User,
  users: Users,
  userCheck: UserCheck,
  userPlus: UserPlus,
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
