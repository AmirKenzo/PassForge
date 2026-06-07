/** File export utilities — ready for Tauri native file dialogs. */

export type ExportFormat = 'txt' | 'csv' | 'json';

export interface ExportItem {
  value: string;
  label?: string;
  metadata?: Record<string, string | number | boolean>;
}

export function formatAsTxt(items: ExportItem[]): string {
  return items.map((item) => item.value).join('\n');
}

export function formatAsCsv(items: ExportItem[]): string {
  const hasMetadata = items.some((item) => item.metadata && Object.keys(item.metadata).length > 0);
  if (!hasMetadata) {
    return 'value\n' + items.map((item) => `"${item.value.replace(/"/g, '""')}"`).join('\n');
  }
  const keys = new Set<string>();
  items.forEach((item) => {
    if (item.metadata) Object.keys(item.metadata).forEach((k) => keys.add(k));
  });
  const metaKeys = Array.from(keys);
  const header = ['value', 'label', ...metaKeys].join(',');
  const rows = items.map((item) => {
    const cols = [
      `"${item.value.replace(/"/g, '""')}"`,
      item.label ? `"${item.label.replace(/"/g, '""')}"` : '',
      ...metaKeys.map((k) => {
        const v = item.metadata?.[k];
        return v !== undefined ? `"${String(v).replace(/"/g, '""')}"` : '';
      }),
    ];
    return cols.join(',');
  });
  return [header, ...rows].join('\n');
}

export function formatAsJson(items: ExportItem[]): string {
  return JSON.stringify(items, null, 2);
}

export function formatExport(items: ExportItem[], format: ExportFormat): string {
  switch (format) {
    case 'txt':
      return formatAsTxt(items);
    case 'csv':
      return formatAsCsv(items);
    case 'json':
      return formatAsJson(items);
  }
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportData(items: ExportItem[], format: ExportFormat, baseName = 'passforge-export'): void {
  const content = formatExport(items, format);
  const mimeTypes: Record<ExportFormat, string> = {
    txt: 'text/plain',
    csv: 'text/csv',
    json: 'application/json',
  };
  downloadFile(content, `${baseName}.${format}`, mimeTypes[format]);
}
