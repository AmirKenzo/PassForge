import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { exportData, type ExportFormat, type ExportItem } from '@/utils/export';

interface ExportMenuProps {
  items: ExportItem[];
  baseName?: string;
}

export function ExportMenu({ items, baseName }: ExportMenuProps) {
  const handleExport = (format: ExportFormat) => {
    if (items.length === 0) return;
    exportData(items, format, baseName);
  };

  return (
    <Select onValueChange={(v) => handleExport(v as ExportFormat)}>
      <SelectTrigger className="w-[140px]" aria-label="Export format">
        <Download className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Export" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="txt">Export TXT</SelectItem>
        <SelectItem value="csv">Export CSV</SelectItem>
        <SelectItem value="json">Export JSON</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ExportButton({ items, baseName }: ExportMenuProps) {
  if (items.length === 0) {
    return (
      <Button variant="outline" disabled aria-label="Export disabled">
        <Download className="h-4 w-4" />
        Export
      </Button>
    );
  }
  return <ExportMenu items={items} baseName={baseName} />;
}
