// fix: Resolve memory leak in data processing
// This file demonstrates a fix commit
// Fixes resolve bugs and trigger a patch version bump

const processData = (data) => {
  // Fixed: Added proper cleanup to prevent memory leak
  const processedData = data.map(item => {
    const result = {
      id: item.id,
      value: item.value * 2
    };
    
    // Clean up temporary variables
    delete item.temp;
    
    return result;
  });
  
  return processedData;
};

module.exports = { processData };
