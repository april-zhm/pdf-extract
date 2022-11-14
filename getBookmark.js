const pdfLib = require('pdfjs-dist')
const pdfDoc = require('pdfkit');
const pdfDocument = require('pdf-lib');
const fs = require('fs')


var loadingTask = pdfLib.getDocument("./data/sample_pdf.pdf");
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded')
        
    // Get the tree outline
    pdf.getOutline().then(function(outline) {
        if (outline) {
            //console.log(outline)
            let pairs = [];
            for (let i = 0; i < outline.length; i++) {
                //console.log(outline[i].title)
                const dest = outline[i].dest;
                //console.log(dest[0].num)
                
                
                if (outline[i].title == 'Section 7: Application Deployment'){
                    console.log("this is the one")
                }
                pdf.getPageIndex(dest[0]).then(function(id) {
                    // page number = index + 1
                    pairs.push({ title: outline[i].title, pageNumber:  parseInt(id) + 1 });
                    //console.log(outline[i].title);
                    // console.log(id+1)
                    console.log(pairs)
                    pdf.getPage(id).then( (page)=>{
                        console.log('page loaded')
                        
                        
                    } )
                });
            }
            console.log(pairs)
        }
     
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
