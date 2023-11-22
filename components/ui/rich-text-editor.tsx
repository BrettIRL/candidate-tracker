import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Button } from './button';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';

interface RichTextEditorProps {
  initialValue?: string;
  readonly: boolean;
  onChange: (html: string) => void;
}

interface RichTextEditorToolbarProps {
  editor: Editor;
}

export function RichTextEditor({
  initialValue,
  readonly,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    editable: !readonly,
    editorProps: {
      attributes: {
        class:
          'min-h-[140px] max-h-[180px] w-full rounded-md rounded-tl-none rounded-tr-none border border-input bg-transparent px-3 py-2 border-t-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    content: initialValue || '',
  });

  return (
    <EditorContent editor={editor}>
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </EditorContent>
  );
}

export function RichTextEditorToolbar({ editor }: RichTextEditorToolbarProps) {
  return (
    <div className="flex flex-row items-center gap-1 rounded-t-md border border-input bg-transparent p-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.commands.undo()}
        disabled={!editor.can().undo()}
      >
        <Icons.undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.commands.redo()}
        disabled={!editor.can().redo()}
      >
        <Icons.redo className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Icons.bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.italic className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.ul className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.ol className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
