const mockDbConnect = {
  query: (text, params, callback) => {
    console.log('Mock DB Query:', text);
    console.log('Query parameters:', params);
    
    // If callback provided, execute it with mock results
    if (callback && typeof callback === 'function') {
      const mockResult = { rows: [] };
      callback(null, mockResult);
    }
    
    // Otherwise return a promise that resolves with mock data
    return Promise.resolve({ rows: [] });
  }
};

module.exports = mockDbConnect;
