import { PuppeteerFactory } from '@application/factories/PuppeteerFactory';

export default class ValidationController {
  async html2PDF(event: any): Promise<string | null> {
    return PuppeteerFactory.html2PDF.execute();
  }
}
