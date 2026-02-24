// feat: Add test feature for release demonstration
// This is a test feature to trigger semantic-release

const testFeature = {
  name: 'test-feature',
  description: 'Demonstrates semantic-release functionality',
  version: '1.0.0',
  
  test: () => {
    console.log('Test feature is working!');
    return 'Feature successfully tested';
  }
};

module.exports = testFeature;
