function processFile(filename) {

    if file does not exist throw an error or warning and return
  
  
  
    results = {
  
      filename: filename,
  
      total: 0,
  
      subFiles: []
  
    }
  
  
  
    open the file
  
    for each line in file {
  
      if line is number {
  
        results.total += 1
  
      } else {
  
        subFileResults = processFile(line) // as we assume it's a filename
  
        (depending on what you do if the file doesn't exist, you might need to check that subFileResults is actually valid)
  
        results.total += subFileResults.total
  
        results.subFiles.push(subFileResults)
  
      }
  
    }
  
    return results
  
  }
  
  
  
  Then in your main function, just call processFile() with the initial filename.  This will give you a structure of results, so to display it you need something like this:
  
  
  
  function formatResults(results) {
  
    print(results.filename + ' - ' + results.total)   // that's a bit old school, you could do `${results.filename} - ${results.total}` depending on the version of JS you're using
  
    for each item in results.subFiles {
  
      formatResults(results.subFiles)
  
    }
  
  }
  
  
  
  then just call formatResults() with the structure returned by the initial processFile call.