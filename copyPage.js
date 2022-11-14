const  {PDFDocument}  = require('pdf-lib')
const fs = require('fs')
//const pdfDocument = require('pdf-lib')

async function copyPages(begin,end) {
    const url = "./data/sample_pdf.pdf"
    const pdfByte = fs.readFileSync(url)
    const pdfDoc = await PDFDocument.load(pdfByte)


    const pdfNew = await PDFDocument.create();
    console.log(begin,end)
    for (let i = begin;i <= end;  i++ ) {
        console.log(i)
        const [pageToCopy] = await pdfNew.copyPages(pdfDoc,[i])
        pdfNew.addPage(pageToCopy)
    }

    const pdfNewBytes = await pdfNew.save()

    fs.writeFileSync('./data/result2.pdf',pdfNewBytes)
}

copyPages(1,5)