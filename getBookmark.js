const pdfLib = require('pdfjs-dist')
const fs = require('fs')


var loadingTask = pdfLib.getDocument("./data/sample_pdf.pdf");
var bookMark = "Sample File"


const getBookmark = async(docAddress,targetBookmark) => {
    const pdf = await pdfLib.getDocument(docAddress).promise;
    const outline = await pdf.getOutline();
    //console.log(outline)
    if (outline) {
        for (let i = 0; i < outline.length; i++) {
            //console.log(outline[i].title)
            var ref = ''
            if (outline[i].title == targetBookmark) {
                const dest = outline[i].dest;
                if (typeof dest =='string') {
                    const bookmarkDestination = await pdf.getDestination(dest);
                    ref = bookmarkDestination[0];
                } else {
                    ref = dest[0];
                }
                const bookmarkPageId = await pdf.getPageIndex(ref);
                console.log('bookmark found on page '+ bookmarkPageId)
                return bookmarkPageId
            }
        }
    }
}

getBookmark("./data/sample_pdf.pdf",bookMark).then((result)=> {
    console.log(result)
}).catch((e)=> {
    console.log(e)
})
/*
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded')
    // Get the tree outline
    pdf.getOutline().then(function(outline) {
        if (outline) {
            //find bookmark
            outline = outline.filter( (item) => {
                return item.title == bookMark
            });
            console.log(outline.length+ ' bookmark found')
            for (let i = 0; i < outline.length; i++) {
                //console.log(outline[i].title)
                //get bookmark destination
                const dest = outline[i].dest;
                if (typeof dest =='string') {
                    pdf.getDestination(dest).then(function(dest) {
                        const ref = dest[0];
                        // And the page id
                        pdf.getPageIndex(ref).then(function(id) {
                            console.log('bookmark found on page '+id)
                        });
                    })
                } else {
                    ref = dest[0];
                    pdf.getPageIndex(ref).then(function(id) {
                        console.log('bookmark found on page '+id)
                    });
                }
            }
        }
     
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
*/