import { PaperFormat } from 'puppeteer';

export type PDFVersion = '1.4';

export interface IPuppeteerProvider {
  html2PDF(html: string, filePath: string, password: string): Promise<boolean>;
  launchBrowser(): Promise<void>;
  closeBrowser(): Promise<void>;
}
