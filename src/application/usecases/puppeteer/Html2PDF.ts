import { IPuppeteerProvider } from "@application/provider/IPuppeteerProvider";
import path from "path";
import { v4 as uuid } from 'uuid';

export class PuppeteerHtml2PDFService {
  constructor(private readonly puppeteerProvider: IPuppeteerProvider) { }

  async execute(): Promise<string | null> {
    try {
      const filePath = path.resolve(__dirname, '../../..', `./tmp/arquivo_test${uuid()}.pdf`);
      const pdfCreated = await this.puppeteerProvider.html2PDF('<p>Funcionou!</p>', filePath, '1234');
      if (pdfCreated) {
        return filePath;
      }
      
      return null;
    } catch (err) {
      console.log(err)
      return null;
    }
  }
}
