import { Send } from "lucide-react";

export const ChatInput = ({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}) => {
  return (
    <div className="px-4 py-3 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Aa"
        />
        <button
          onClick={onSend}
          className="rounded-full p-2 text-blue-500 hover:bg-gray-100"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
