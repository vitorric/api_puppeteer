import { IPuppeteerProvider, PDFVersion } from "@application/provider/IPuppeteerProvider";
import puppeteer, { Browser, PDFOptions } from "puppeteer";
import { promises as fs } from 'fs';
import { exec } from "child_process";

class PuppeteerProvider implements IPuppeteerProvider {
    private browser: Browser | null = null;
  
    constructor() {
      this.launchBrowser();
      process.on('SIGINT', async () => {
        console.log('Shutting down puppetter...');
        await this.closeBrowser();
        process.exit(0);
      });
    }
  
    public async html2PDF(
      html: string,
      filePath: string,
      password: string
    ): Promise<boolean> {
      if (!this.browser || !this.browser.connected) {
        await this.launchBrowser();
      }
  
      const page = await this.browser!.newPage();
  
      try {
        await page.setContent(html, {
          waitUntil: ['load', 'domcontentloaded', 'networkidle2'],
          timeout: 30000,
        });
  
        await page.setRequestInterception(true);
  
        page.on('request', (req) => {
          const blockResources = [
            'image',
            'media',
            'font',
            'stylesheet',
            'script',
          ];
          if (blockResources.includes(req.resourceType())) {
            req.abort();
          } else {
            req.continue();
          }
        });
  
        const optionsPDF: PDFOptions = {
          printBackground: true,
          preferCSSPageSize: true,
        };
  
        const pdfBuffer = await page.pdf(optionsPDF);
  
        await page.close();
  
        await fs.writeFile(filePath, pdfBuffer);
  
        await this.encryptPDF(
          filePath,
          password,
          "1.4"
        );
  
        return true;
      } catch (error) {
        console.error('Error generating PDF:', error);
        await page.close();
        return false;
      }
    }
  
    public async launchBrowser(): Promise<void> {
      if (this.browser && this.browser.connected) {
        return;
      }
  
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--disk-cache-size=0',
        ],
      });
    }
  
    private async encryptPDF(
      filePath: string,
      password: string,
      version?: PDFVersion
    ): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          const { encryption, forceVersion } =
            this.getWeakConfigVersionPDF(version);
          const qpdfCommand = `qpdf ${forceVersion} --encrypt ${password} ${password} ${encryption} -- ${filePath} --replace-input`;
          exec(qpdfCommand, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  
    private getWeakConfigVersionPDF(version?: PDFVersion): {
      encryption: string;
      forceVersion: string;
    } {
      if (version === '1.4') {
        return {
          encryption: '128',
          forceVersion: '--allow-weak-crypto --force-version=1.4',
        };
      }
  
      return {
        encryption: '256',
        forceVersion: '',
      };
    }
  
    public async closeBrowser(): Promise<void> {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }
    }
  }
  
  export const puppeteerProvider = new PuppeteerProvider();