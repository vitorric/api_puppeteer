import { PuppeteerHtml2PDFService } from "@application/usecases/puppeteer";
import { puppeteerProvider } from "@infra/provider/PuppeteerProvider";

const html2PDF: PuppeteerHtml2PDFService = new PuppeteerHtml2PDFService(
  puppeteerProvider
);

export const PuppeteerFactory = {
  html2PDF,
};
