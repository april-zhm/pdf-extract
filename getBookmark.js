const pdfLib = require('pdfjs-dist')
const  {PDFDocument}  = require('pdf-lib')
const fs = require('fs')

const getBookmark = async(fileURL,targetBookmark) => {
    //read pdf file and get outline
    const pdf = await pdfLib.getDocument(fileURL).promise;
    const outline = await pdf.getOutline();
    //console.log(outline)
    if (outline) {
        for (let i = 0; i < outline.length; i++) {
            //console.log(outline[i].title)
            if (outline[i].title == targetBookmark) {
                const beginDest = outline[i].dest;
                const beginPage = await getPage(pdf,beginDest)
                const endDest = outline[i+1].dest
                const endPage = await getPage(pdf,endDest) -1
                return {beginPage,endPage}
            }
        }
    }
}

const getPage = async(pdf,destination) => {
    var ref = ''
    if (typeof destination =='string') {
        const bookmarkDestination = await pdf.getDestination(destination);
        ref = bookmarkDestination[0];
    } else if (typeof destination =='object') {
        ref = destination[0];
    }
    const bookmarkPageId = await pdf.getPageIndex(ref);
    console.log('bookmark found on page '+ bookmarkPageId)
    return bookmarkPageId
}

const copyPages = async (fileURL,beginPage,endPage) => {
    const pdfByte = fs.readFileSync(fileURL)
    const pdfDoc = await PDFDocument.load(pdfByte)
    const pdfNew = await PDFDocument.create();
    console.log(beginPage,endPage)
    for (let i = beginPage;i <= endPage;  i++ ) {
        console.log(i)
        const [pageToCopy] = await pdfNew.copyPages(pdfDoc,[i])
        pdfNew.addPage(pageToCopy)
    }

    const pdfNewBytes = await pdfNew.save()

    fs.writeFileSync('./data/result.pdf',pdfNewBytes)
}
var bookMark = "Sample File"

var fileURL = "./data/sample_pdf.pdf"

getBookmark(fileURL,bookMark).then(({beginPage,endPage})=> {
    copyPages(fileURL,beginPage,endPage)
}).catch((e)=> {
    console.log(e)
})