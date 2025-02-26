

## Descrição

Este é um projeto simples para a conversão de um HTML para PDF com senha, usando puppeteer.

## Dependências

[Puppeteer](https://ploi.io/documentation/server/how-to-install-puppeteer-on-ubuntu): instalações necessárias para rodar no ambiente linux;
[qPDF](https://qpdf.readthedocs.io/en/stable/overview.html): para adicionar senha ao PDF;

## Como rodar

Execute:
`npm install`

Depois:
`npm run dev`

## Como fazer o build

`npm run build`

Será criado uma pasta **`/dist`**, é esta que é usada para rodar a API.

## Como rodar no servidor

Atualmente é usado o [forever](https://www.npmjs.com/package/forever), com o seguinte comando: 
NODE_ENV=**AMBIENTE** forever start --spinSleepTime=2000 --uid "**NOME_PROJETO**" --append /var/www/**NOME_PROJETO**/dist/cluster.js  && forever list

Neste comando, a API é executada de forma clusterizada.

Caso tenha solução melhor, como o próprio **PM2**, não tem problema em trocar.

## Endpoints:

http://localhost:3333/health - Válida se a API esta de pé;
http://localhost:3333/validation/html2pdf - Cria um PDF com a senha **1234** e faz o download do mesmo.